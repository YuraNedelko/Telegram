<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Http\Resources\MessageCollection;
use App\Jobs\SendMessageEmailNotification;
use App\Message;
use App\Http\Resources\Message as MessageResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class MessagesController extends Controller
{
    function index(Request $request,$id){
        $userId = Auth::user()->id;
        $perPage = $request['perPage'] ? $request['perPage'] : 10;
        $consistentPaginationLastId = $request['consistentPaginationLastId'] ? $request['consistentPaginationLastId'] : null;

        $messages = Message::where(function ($query) use($id,$userId){
            $query->where(function($query)use($id,$userId){
                $query->where('from',$id)
                    ->where('to', $userId);
            })->orWhere( function ($query) use($id,$userId){
                $query->where('from',$userId)
                    ->where('to', $id);
            });
        })
        ->when($consistentPaginationLastId, function($query) use ($consistentPaginationLastId){
            $query->where('id', '<=', $consistentPaginationLastId);
        })
        ->orderBy('id', 'desc')->paginate($perPage);

        return new MessageCollection($messages);
    }

    function store(MessageRequest $request){
        $message = (new Message())->fill($request->all());
        $message->from = Auth::user()->id;
        if($message->save()){
            SendMessageEmailNotification::dispatch($message, Auth::user());
            return response()->json(['message' => new MessageResource($message)] ,200);
        }else{
            return  response()->json(['error' => 'Error occurred'], 500);
        }
    }
}
