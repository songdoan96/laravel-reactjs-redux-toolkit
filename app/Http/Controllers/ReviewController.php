<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ReviewController extends Controller
{
    public function reviews(Request $request)

    {
        $validator = Validator::make($request->all(), [
            'review' => 'required|min:6',
            'rating' => 'required',
        ], [
            'review.required' => "Vui lòng nhập đánh giá.",
            'review.min' => "Vui lòng nhập hơn 6 ký tự.",
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors(),
            ], 400);
        }
        $product = Review::where('user_id', $request->user_id)->where("product_id", $request->product_id)->first();

        if ($product) {
            return response()->json([
                'message' => ["user_id" => 'Bạn đã đánh giá cho sản phẩm này.'],
            ], 400);
        }
        $review = new Review();
        $review->user_id = $request->user_id;
        $review->product_id = $request->product_id;
        $review->review = $request->review;
        $review->rating = $request->rating;
        $review->save();
        return response([
            'message' => 'Xin cảm ơn đánh giá của bạn.',
            'review' => $review,
        ]);
    }
}
