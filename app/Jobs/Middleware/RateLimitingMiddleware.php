<?php


namespace App\Jobs\Middleware;


use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class RateLimitingMiddleware
{
    public function handle($job, $next)
    {
        Redis::throttle("sender: $job->sender receiver: $job->receiver")
            ->allow(5)
            ->every(60)
            ->then(function () use ($job, $next) {
                $next($job);
            }, function () use ($job) {
                $job->release(60);
            });
    }
}