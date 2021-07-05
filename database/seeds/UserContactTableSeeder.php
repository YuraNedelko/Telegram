<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use function GuzzleHttp\Psr7\str;

class UserContactTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = factory(User::class,10)->create();
        $usedUsersArray = [];
        foreach ($users as $user){
            $usedUsersArray[] = $user->id;
            if(count($usedUsersArray) === count($users)){
                break;
            }
            foreach (User::all()->except($usedUsersArray) as $freeUser){
                DB::table('user_contact')->insert(
                    [
                        'user_id' => $user->id,
                        'contact_id' => $freeUser->id,
                        'contact_hash' => hash('sha512', "$user->email $freeUser->email"),
                        'created_at' => now(),
                        'updated_at' => now()
                    ]
                );
            }
        }
    }
}
