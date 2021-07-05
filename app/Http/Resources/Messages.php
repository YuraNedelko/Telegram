<?php

namespace App\Http\Resources;

use App\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class Messages extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'text' => $this->text,
            'from' => User::where('id', $this->from)->first()->name,
            'isMine' => $this->from === Auth::user()->id ? true : false,
            'date' => $this->created_at,
        ];
    }
}
