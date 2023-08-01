<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => ['apiJwt']], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::namespace('App\\Http\\Controllers\\Api')->prefix('clients')->group(function () {

        //Rota de listar clientes:
        Route::get('/', 'ClientController@index');
        //Rota de consultar cliente especifico:
        Route::get('/{id}', 'ClientController@show');
        //Rota de salvar novo cliente:
        Route::post('/', 'ClientController@save');
        //Atualizar cliente:
        Route::put('/', 'ClientController@update');
        //Excluir cliente:
        Route::delete('/{id}', 'ClientController@delete');
    });

    //Rota de listar clientes:
    //Route::get('/clients', 'App\\Http\\Controllers\\Api\\ClientController@index');

    //Rota de salvar novo cliente:
    //Route::post('/clients', 'App\\Http\\Controllers\\Api\\ClientController@save');
});

// Route::middleware('api')->get('/user', function (Request $request) {
//     return $request->user();
// });

//Rota de clientes:
// Route::middleware('api')->get('/clients', function () {
//     return \App\Models\Clients::all();
// });

//Rota de Login:
Route::post('/auth/login', 'App\\Http\\Controllers\\Api\\AuthController@login');

/*
Route::post('/login', function (Request $request) {
    $credentials = $request->only(['email', 'password']);

    if (!$token = auth()->attempt($credentials)) {
        abort(401, 'Unauthorized');
    }

    return response()->json([
        'data' => [
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ],
    ]);
});
*/