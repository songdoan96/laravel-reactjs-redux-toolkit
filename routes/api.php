<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::middleware(['isAuthenticated'])->group(function () {
        Route::post('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
    });

    // Route::post('refresh', [AuthController::class, 'refresh']);
    // Route::post('is-admin', [AuthController::class, 'isAdmin'])->middleware('admin');
});

Route::resource('/product', ProductController::class);
Route::get('/admin-products', [ProductController::class, 'adminGetProducts']);
Route::get('/product-reviews/{id}', [ProductController::class, 'getReviews']);
// Route::get('/admin-categories', [ProductController::class, 'adminGetCategories']);

Route::resource('/category', CategoryController::class);


Route::middleware(['auth:api'])->group(function () {
    Route::post('/order', [OrderController::class, 'order']);
    Route::get('/orders', [OrderController::class, 'userGetOrders']);
    Route::get('/order-detail/{id}', [OrderController::class, 'userGetOrderDetail']);
    Route::post('/rating-reviews', [ReviewController::class, 'reviews']);
});
Route::middleware(['isAdmin'])->group(function () {
    Route::get('/admin-orders', [OrderController::class, 'adminGetOrders']);
    Route::get('/admin-order-detail/{id}', [OrderController::class, 'adminGetOrderDetail']);
    Route::post('/admin-order-success', [OrderController::class, 'adminSetOrderSuccess']);
});
