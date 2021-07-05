<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserContactTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_contact', function (Blueprint $table) {
            $table->foreignId('user_id')
                ->constrained('users', 'id')
                ->onDelete('cascade');
            $table->foreignId('contact_id')
                ->constrained('users', 'id')
                ->onDelete('cascade');
            $table->string('contact_hash', 128);
            $table->primary(array('user_id', 'contact_id'));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_contact');
    }
}
