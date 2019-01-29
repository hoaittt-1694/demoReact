<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddActivationTokenToUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('is_active')->default(0);
            $table->string('active_token')->nullable();
            $table->datetime('active_token_expire')->nullable();
            $table->string('reset_token')->nullable();
            $table->datetime('reset_token_expire')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_active');
            $table->dropColumn('active_token');
            $table->dropColumn('active_token_expire');
            $table->dropColumn('reset_token');
            $table->dropColumn('reset_token_expire');
        });
    }
}
