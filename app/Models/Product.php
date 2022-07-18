<?php

namespace App\Models;

use App\Models\BaseModel;

class Product extends BaseModel
{
    protected $with = ['category'];
    public function category()
    {
        return $this->hasOne(Category::class, "_id", "category_id");
    }
}
