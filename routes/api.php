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
Route::resource('tasks', 'TaskController');






Route::group(['namespace' => 'Api'], function () {
    Route::group(['middleware' => ['jwt.verify']], function() {
        Route::get('closed', 'DataController@closed');
        Route::get('user', 'UsersController@getAuthenticatedUser');
    });
    Route::post('register', 'UsersController@register');
    Route::post('login', 'UsersController@authenticate');
    Route::get('open', 'DataController@open');
});
