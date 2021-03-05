<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    //return view('welcome');
    return view('task.index');
});

Route::get('/user', function () {
    return view('user');
});
Route::post('/user/add', [UserController :: class, 'add']);
Route::get('/user/list', [UserController :: class, 'list']);


Route::get('/login', function(){
    return view('login.login');
});
Route::post('/login', [LoginController :: class, 'checkLogin']);
Route::get('/login/logout', [LoginController :: class, 'logout']);
Route::get('/login/forgot', function(){return view('login.forgot');});
Route::post('/login/forgot', [LoginController :: class, 'forgot']);


Route::get('/home', function(){
    return view('task.index');
});
Route::get('/task', function(){
    return view('task.index');
});
/*
Route::get('/task/form', function(){
    return view('task.form');
});
Route::get('/task/list', function(){
    return view('task.list');
});
*/
Route::get('/task/getList', [TaskController :: class, 'list']);
Route::post('/task/add', [TaskController :: class, 'add']);
Route::post('/task/delete', [TaskController :: class, 'delete']);
