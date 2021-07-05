What to do: <br>
1.) composer install; <br>
2.) install npm modules; <br>
3.) if you need to make changes to js files run "npm run dev" after; <br>
4.) php artisan migrate; <br>
5.) php artisan db:seed; <br>
6.) in .env file put SANCTUM_STATEFUL_DOMAINS and put value of domain from which request to Laravel backend
 will be coming as well as port; <br>
7.) since sanctum uses cookie based authentication and backend relies on auth:user it's essential 
to test communication between different users in separate browsers in order to avoid cookie overriding <br>
8.) run nodejs server (server.js file in node folder) and make sure that 2223 port is not busy
