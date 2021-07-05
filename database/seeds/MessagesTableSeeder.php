<?php

use App\Message;
use App\User;
use Illuminate\Database\Seeder;

class MessagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();

        foreach ($users as $user){
            if($user->contacts ){
                foreach ($user->contacts->all() as $contact){
                    factory(Message::class, 10)->create([
                        'from' => $user->id,
                        'to' => $contact->id
                    ]);
                    factory(Message::class, 10)->create([
                        'from' => $contact->id,
                        'to' =>  $user->id
                    ]);
                }
            }
        }
    }
}
