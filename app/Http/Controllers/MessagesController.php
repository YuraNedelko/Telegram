<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Http\Resources\Messages;
use App\Message;
use Illuminate\Support\Facades\Auth;

class MessagesController extends Controller
{
    function index($id){
        $userId = Auth::user()->id;
        $messages = Message::where(function ($query) use($id,$userId){
            $query->where('from',$id)
                ->where('to', $userId);
        })
        ->orWhere( function ($query) use($id,$userId){
            $query->where('from',$userId)
                ->where('to', $id);
        })->get();
        return response()->json(['messages' => Messages::collection($messages)] ,200);
    }

    function store(MessageRequest $request){
        $message = (new Message())->fill($request->all());
        $message->from = Auth::user()->id;
        if($message->save()){
            return response()->json(['message' => new Messages($message)] ,200);
        }else{
            return  response()->json(['error' => 'Error occurred'], 500);
        }
    }
}
