<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin Name',
            'email' => "admin@gmail.com",
            'password' => Hash::make('admin'),
            'role' => 'admin'
        ]);
        for ($i = 1; $i <= 5; $i++) {
            User::create([
                'name' => 'User Name ' . $i,
                'email' => "user" . $i . "@gmail.com",
                'password' => Hash::make('user'),
                'role' => 'user'
            ]);
        }

        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
