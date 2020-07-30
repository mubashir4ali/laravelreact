<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Hash;

class CreateTncUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tnc_users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('access_level', ['super', 'admin', 'user'])->default('user');
            $table->rememberToken();
            $table->dateTime('user_last_activity')->nullable();
            $table->timestamps();
        });

        # Create Super Admin
        \DB::table('tnc_users')->insert([
                'first_name' => 'Super',
                'last_name' => 'Admin',
                'email' => env('SUPER_ADMIN_EMAIL'),
                'password' => Hash::make(env('SUPER_ADMIN_PASSWORD')),
                'access_level' => 'super'
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tnc_users');
    }
}
