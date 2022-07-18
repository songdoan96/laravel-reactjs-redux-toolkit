<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class isAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->user() || auth()->user()->role !== "admin") {
            return response()->json(['message' => 'Không được phép truy cập.'], 403);
        }
        return $next($request);
    }
}
