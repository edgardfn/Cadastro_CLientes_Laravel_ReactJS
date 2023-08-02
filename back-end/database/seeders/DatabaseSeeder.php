<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Daniel Braga',
            'email' => 'daniel@sysfar.com.br',
            'password' => 'segredo',
        ]);

        \App\Models\Clients::factory(25)->create();
    }
}
