<?php

namespace App\Models;

use App\Models\BaseModel;

class Order extends BaseModel
{
    protected $with = ['user', 'shipping', 'orderItems'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function shipping()
    {
        return $this->belongsTo(Shipping::class);
    }
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
