<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Photo;
use App\Models\Report;
use App\Models\Shop;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Note: This is not required. because we didn't use the authentication
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // Use for make the dummy data for the customers table
        // Customer::factory(10)->create();

        // Use for make the dummy data for the shops table
        Shop::factory(10)->create();
        Report::factory(10)->create();
        Photo::factory(15)->create();
    }
}
