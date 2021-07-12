<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::resource('/contacts', 'ContactsController')
    ->except('destroy', 'update', 'show', 'edit')->middleware('auth:sanctum');

Route::get('/messages/{id}{currentPage?}{perPage?}','MessagesController@index')->middleware('auth:sanctum');

Route::resource('/messages', 'MessagesController')
    ->except('index', 'destroy', 'update', 'show', 'edit', 'create')->middleware('auth:sanctum');


