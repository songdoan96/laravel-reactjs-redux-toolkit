<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware(['isAdmin']);
    }

    public function index()
    {
        return response()->json([
            'categories' => Category::all()
        ]);
    }
    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        $category->name = $request->name;
        $category->save();
        return response()->json([
            'message' => "Cập nhật thành công.",
            'category' => $category
        ]);
    }
    public function destroy($id)
    {
        Category::destroy($id);
        return response()->json([
            'message' => "Xóa thành công.",
        ]);
    }
}
