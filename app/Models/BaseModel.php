<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class BaseModel extends Model
{
    protected $primaryKey = '_id';
    protected $connection = 'mongodb';
    use HasFactory;
}
