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


// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::group(['middleware' => 'TenancyMiddleware'], function () 
{
    Route::get('users', 'TncUserController@getAllUsers');
    Route::get('users/{id}', 'TncUserController@getUser');

    Route::get('logout', 'TncUserController@userLogout');

    # Only Admin/SuperAdmin/Self[update] can perform the following actions
    Route::group(['middleware' => 'TenancyPermissionsMiddleware'], function () 
    {
        // No need to create as already have signup page
        // Route::post('users', 'TncUserController@createUser');

        // Route::put('users/{id}', 'TncUserController@updateUser');
        Route::post('user/{id}', 'TncUserController@updateUser');
        Route::delete('users/{id}','TncUserController@destroy');
    });

});

/*Route::get('users', 'TncUserController@getAllUsers');
Route::get('users/{id}', 'TncUserController@getUser');
Route::get('logout', 'TncUserController@userLogout');
Route::post('users', 'TncUserController@createUser');
// Route::put('users/{id}', 'TncUserController@updateUser');
Route::post('user/{id}', 'TncUserController@updateUser');
Route::delete('users/{id}','TncUserController@destroy');*/

Route::post('login','TncUserController@userLogin');
Route::post('signup','TncUserController@createUser');