<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name'    => 'John Smith',
            'mail'    => 'teste@teste.com',
            'cpf'     => '000.000.000-01',
            'fone'    => '(31) 3333-1111',
            'password'   =>  Hash::make('teste')
        ]);
    }
}
