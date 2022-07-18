<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Shipping;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function order(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'address' => 'required',
            'phone' => 'required',
        ], [
            'address.required' => "Vui lòng nhập địa chỉ.",
            'phone.required' => "Vui lòng nhập SĐT.",
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 400);
        }


        $shipping = new Shipping();
        $shipping->address = $request->address;
        $shipping->phone = $request->phone;
        $shipping->notes = $request->notes;
        $shipping->save();

        $products = json_decode($request->products);
        $total = 0;
        $order = new Order();
        $order->user_id = auth()->user()->_id;
        $order->shipping_id = $shipping->_id;
        $order->status = 0;
        foreach ($products as $product) {
            $total += $product->price * $product->qty;
        }
        $order->total = $total;
        $order->save();

        foreach ($products as $product) {
            $total += $product->price * $product->qty;
            $orderItem = new OrderItem();
            $orderItem->product_id = $product->_id;
            $orderItem->name = $product->name;
            $orderItem->order_id = $order->_id;
            $orderItem->price = $product->price;
            $orderItem->image = $product->image;
            $orderItem->qty = $product->qty;
            $orderItem->save();
        }
        return response([
            'message' => "Đơn hàng đã được tiếp nhận."
        ]);
    }
    public function adminGetOrders()
    {
        return response(['orders' => Order::all()]);
    }


    function adminGetOrderDetail($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response(['message' => "Không tìm thấy đơn hàng."], 404);
        }
        return response(['order' => $order]);
    }
    function adminSetOrderSuccess(Request $request)
    {
        $order = Order::find($request->id);
        $order->status = $order->status === 0 ? 1 : 0;
        $order->save();
        return response()->json([
            'order' => $order,
            'message' => 'Đơn hàng đã giao thành công.',
        ]);
    }

    // User 
    public function userGetOrders()
    {
        return response()->json([
            'orders' => Order::where('user_id', auth()->user()->_id)->get()
        ]);
    }
    public function userGetOrderDetail($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response(['message' => "Không tìm thấy đơn hàng."], 404);
        }
        return response(['order' => $order]);
    }
}
