<?php

namespace App\Models;

use App\Models\BaseModel;

class Review extends BaseModel
{
    protected $with = ['user'];

    public function user()
    {
        return $this->hasOne(User::class, "_id", "user_id");
    }
}
