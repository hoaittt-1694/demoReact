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
Auth::routes(['verify' => true]);
Route::group(['namespace' => 'Api'], function () {
    Route::post('register', 'UsersController@register');
    Route::post('login', 'UsersController@login');
    Route::get('user/activation/{email}/{active_token}', 'UsersController@verifyCode');
    Route::post('user/activation', 'UsersController@resendVerifyCode');

    Route::get('profile', 'UsersController@getAuthenticatedUser')->middleware('verified');

    Route::group(['middleware' => ['jwt-auth']], function() {
        Route::resource('tasks', 'TaskController');
    });
});
