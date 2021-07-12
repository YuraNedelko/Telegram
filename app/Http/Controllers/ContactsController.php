<?php

namespace App\Http\Controllers;

use App\Http\Resources\Contact;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContactsController extends Controller
{
    function index(){
        $user = User::with(['contactsOwned:id,name,email','contacts:id,name,email'])->find(Auth::user()->id);
        $contactsOwner = $user->contactsOwned;
        $contacts = $user->contacts->merge($contactsOwner);

        return response()->json(['contacts' => Contact::collection($contacts)],200);
    }
}
