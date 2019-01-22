<?php

use Illuminate\Http\Request;

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

Route::group(['namespace' => 'Api'], function () {
       
    Route::post('register', 'UsersController@register');
    Route::post('login', 'UsersController@login');
    Route::get('profile', 'UsersController@getAuthenticatedUser');

    Route::group(['middleware' => ['jwt-auth']], function() {
        Route::resource('tasks', 'TaskController');
        Route::get('closed', 'DataController@closed');
        Route::get('open', 'DataController@open');
    });
});
