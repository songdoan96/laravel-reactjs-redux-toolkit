<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function getTotalRatingProduct($id)
    {
        $reviews = Review::where("product_id", $id)->get();
        return count($reviews);
    }
    protected function getAVGStarProduct($id)
    {
        $reviews = Review::where("product_id", $id)->get();
        $totalRating = count($reviews);
        $totalStar = 0;
        foreach ($reviews as $review) {
            $totalStar += $review->rating;
        }
        if ($totalRating > 0) {
            return round($totalStar / $totalRating, 1);
        }
        return $totalRating;
    }
}
