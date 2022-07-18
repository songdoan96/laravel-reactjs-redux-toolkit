<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware(['isAdmin'])->except(['index', 'show', 'getReviews']);
    }

    public function index(Request $request)
    {
        $perPage = 8;
        $sort = $request->sort ?? "all";
        $filter = $request->filter;
        $products = Product::select('*');
        if ($filter !== "all" && $filter !== null) {
            $products = $products->where('category_id', $filter);
        }
        switch ($sort) {
            case 'price_asc':
                $products = $products->orderBy('price', 'asc');
                break;
            case 'price_desc':
                $products = $products->orderBy('price', 'desc');
                break;
            case 'name_asc':
                $products = $products->orderBy('name', 'asc');
                break;
            case 'name_desc':
                $products = $products->orderBy('name', 'desc');
                break;
            case 'latest':
                $products = $products->orderBy('created_at', 'desc');
                break;

            default:
                break;
        }
        $products = $products->paginate($perPage);
        $data = $products->items();
        foreach ($data as $value) {
            $value->avgStarProduct = $this->getAVGStarProduct(($value->_id));
        }

        return response([
            'products' => $data,
            'current_page' => $products->currentPage(),
            'last_page' => $products->lastPage(),
            'categories' => Category::all()
        ]);
    }



    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:5 ',
            'price' => 'required|numeric',
            'image' => 'required|image|mimes:jpg,bmp,png,webp',
            'description' => 'required|min:10',

        ], [
            'image.required' => "Vui lòng chọn hình ảnh.",
            'image.image' => "Vui lòng chọn hình ảnh.",
            'image.mimes' => " Hình ảnh phải đúng định dạng.",
            'name.required' => "Vui lòng nhập tên sản phẩm.",
            'name.min' => "Tên sản phẩm ít nhất 5 ký tự.",
            'price.required' => "Vui lòng nhập giá.",
            'price.numeric' => "Vui lòng nhập số.",
            'description.required' => "Vui lòng nhập mô tả sản phẩm.",
            'description.min' => "Mô tả ít nhất 5 ký tự.",
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 400);
        }

        $product = new Product();
        $product->name = $request->name;
        $product->price = (int)$request->price;
        $product->description = $request->description;
        if ($request->newCategory) {
            $category = new Category();
            $category->name = $request->newCategory;
            $category->save();
            $product->category_id = $category->_id;
        } else {
            $product->category_id = $request->category;
        }

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $name = time() . rand(1000, 9999);
            $ext = $file->extension();
            $imgName = $name . "." . $ext;
            $request->image->move(('images'), $imgName);


            $cloudinary = new Cloudinary();
            $folder = "s-food";
            $cloudinary->uploadApi()->upload(public_path('images/' . $imgName), [
                "folder" => $folder,
                "public_id" => $name,
                "format" => $ext
            ]);

            // Save DB image name
            $product->image = $folder . "/" .  $imgName;

            // Delete file in storage after upload
            File::delete("images/" . $imgName);
        }
        $product->save();
        return response()->json([
            "message" => "Tạo sản phẩm thành công.",
            'product' => $product,
        ]);
    }


    public function show($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response(['message' => "Không tìm thấy sản phẩm."], 404);
        }
        return response([
            'product' => $product,
        ]);
    }
    public function getReviews($id)
    {
        $product = Product::find($id);
        $reviews = Review::where("product_id", $id)->get();
        return response([
            'product' => $product,
            'reviews' => $reviews,
            'avgStarProduct' => $this->getAVGStarProduct($id)
        ]);
    }


    public function edit($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response([
                'message' => "Không tìm thấy sản phẩm."
            ], 404);
        }
        return response([
            'product' => $product,
            'categories' => Category::all()
        ]);
    }


    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:5 ',
            'price' => 'required|numeric',
            'description' => 'required|min:10',
            'image' => 'image|mimes:jpg,bmp,png,webp',

        ], [
            'name.required' => "Vui lòng nhập tên sản phẩm.",
            'name.min' => "Tên sản phẩm ít nhất 5 ký tự.",
            'price.required' => "Vui lòng nhập giá.",
            'price.numeric' => "Vui lòng nhập số.",
            'description.required' => "Vui lòng nhập mô tả sản phẩm.",
            'description.min' => "Mô tả ít nhất 5 ký tự.",
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors(),
            ], 400);
        }

        $cloudinary = new Cloudinary();

        $product =  Product::find($id);
        $product->name = $request->name;
        $product->price = (int)$request->price;
        $product->description = $request->description;
        $product->category_id = $request->category_id;

        if ($request->hasFile('image')) {
            if ($product->image) {
                $cloudinary->uploadApi()->destroy(explode(".", $product->image)[0]);
            }

            $file = $request->file('image');
            $name = time() . rand(1000, 9999);
            $ext = $file->extension();
            $imgName = $name . "." . $ext;
            $request->image->move(('images'), $imgName);


            $folder = "s-food";
            $cloudinary->uploadApi()->upload(public_path('images/' . $imgName), [
                "folder" => $folder,
                "public_id" => $name,
                "format" => $ext
            ]);

            // Save DB image name
            $product->image = $folder . "/" .  $imgName;

            // Delete file in storage after upload
            File::delete("images/" . $imgName);
        }
        $product->save();
        return response()->json([
            'message' => 'Cập nhật thành công.',
            'product' => $product,
        ]);
    }

    public function destroy($id)
    {
        $product =  Product::find($id);
        if ($product->image) {

            $cloudinary = new Cloudinary();

            $cloudinary->uploadApi()->destroy(explode(".", $product->image)[0]);
        }
        $product->delete();
        return response()->json([
            'message' => 'Xóa thành công.',
            'product' => $product
        ]);
    }
    public function adminGetProducts()
    {
        $products = Product::paginate(6);
        return response([
            'products' => $products->items(),
            'current_page' => $products->currentPage(),
            'last_page' => $products->lastPage(),
            'categories' => Category::all()

        ]);
    }
    public function adminGetCategories()
    {

        return response()->json([
            'categories' => Category::all()
        ]);
    }
}
