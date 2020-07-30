<?php

namespace App\Http\Middleware;
use \App\Models\TncUser;

use Closure;

class TenancyMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = trim($request->header('tnc_user_token'));
        if(!$token)
        {
            return response()->json(['error' => 'Token missing'],401);
        }

        $userDetails = TncUser::where('remember_token', $token)->first();
        if(!$userDetails)
        {
            return response()->json(['error' => 'Invalid Token'],401);
        }

        # Check Token Expiry
        $last_activity_difference = strtotime("now") - strtotime($userDetails->user_last_activity);
        if($last_activity_difference > env('TOKEN_EXPIRY_SECONDS'))
        {
            return response()->json(['error' => 'Token has expired'],401);
        }

        # Update the user last activity time
        $userDetails->user_last_activity = @date("Y-m-d H:i:s");
        $userDetails->save();

        config(['globalUserDetails' => $userDetails]);

        return $next($request);
    }
}
