<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\User;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * @param LoginRequest $request
     * @return array
     */
    function index(LoginRequest $request){
        if (Auth::attempt($request->all())) {
            return response()->json(['success' => true]);
        }else{
            return response()->json(['error' => 'Wrong combination of email and passport'], 401);
        }
    }
}
