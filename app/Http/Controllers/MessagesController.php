<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Http\Resources\MessageCollection;
use App\Message;
use App\Http\Resources\Message as Mess;
use Illuminate\Support\Facades\Auth;

class MessagesController extends Controller
{
    function index($id, $perPage = 10){
        $userId = Auth::user()->id;

        $messages = Message::where(function ($query) use($id,$userId){
            $query->where('from',$id)
                ->where('to', $userId);
        })
        ->orWhere( function ($query) use($id,$userId){
            $query->where('from',$userId)
                ->where('to', $id);
        })->orderBy('id', 'desc')->paginate($perPage);

        return new MessageCollection($messages);
    }

    function store(MessageRequest $request){
        $message = (new Message())->fill($request->all());
        $message->from = Auth::user()->id;
        if($message->save()){
            return response()->json(['message' => new Mess($message)] ,200);
        }else{
            return  response()->json(['error' => 'Error occurred'], 500);
        }
    }
}
