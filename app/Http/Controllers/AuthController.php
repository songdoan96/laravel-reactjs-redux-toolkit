<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $req = $request->only('email', 'password');

        $validator = Validator::make($req, [
            'email' => 'required|email',
            'password' => 'required',
        ], [
            'email.required' => "Vui lòng nhập email.",
            'email.email' => "Vui lòng đúng định dạng email.",
            'password.required' => "Vui lòng nhập mật khẩu.",
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 400);
        }

        if (!$token = auth()->attempt($req)) {
            return response()->json([
                'message' => ["email" => 'Tài khoản không tồn tại.'],
            ], 401);
        }
        return response()->json([
            'message' =>  'Đăng nhập thành công.',
            'user' => [
                '_id' => auth()->user()->_id,
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'role' => auth()->user()->role,
                'token' => $token
            ],
        ]);
    }
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:6',
            'email' => 'required|email|unique:users|max:100',
            'password' => 'required|min:4|string|confirmed',
        ], [
            'name.required' => "Vui lòng nhập họ tên.",
            'name.min' => "Họ tên phải hơn 4 ký tự.",
            'email.required' => "Vui lòng nhập email.",
            'email.email' => "Vui lòng đúng định dạng email.",
            'email.unique' => "Email đã được đăng ký.",
            'password.required' => "Vui lòng mật khẩu.",
            'password.min' => "Mật khẩu phải hơn 4 ký tự.",
            'password.confirmed' => "Mật khẩu chưa khớp.",
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors(),
            ], 400);
        }
        $data = [
            ...$request->all(),
            'password' => Hash::make($request->password),
            "role" => "user"
        ];
        $user = User::create($data);
        $token = auth()->login($user);
        return response()->json([
            'message' => 'Đăng ký thành công.',
        ]);
        // return response()->json([
        //     'message' => 'Đăng ký thành công.',
        //     'user' => [
        //         '_id' => auth()->user()->_id,
        //         'name' => auth()->user()->name,
        //         'email' => auth()->user()->email,
        //         'role' => auth()->user()->role,
        //         'token' => $token
        //     ],
        // ]);
    }
    public function logout()
    {
        auth()->logout();
        return response()->json([
            'message' => 'Đăng xuất thành công.'
        ]);
    }
    public function me()
    {
        return response()->json(['user' => auth()->user()]);
    }
}
