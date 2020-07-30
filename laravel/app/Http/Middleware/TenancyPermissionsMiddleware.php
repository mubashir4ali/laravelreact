<?php

namespace App\Http\Middleware;
use \App\Models\TncUser;

use Closure;

class TenancyPermissionsMiddleware
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
        $globalUserDetails = config('globalUserDetails');

        if($request->id != $globalUserDetails->id && 
            $globalUserDetails->access_level === TncUser::ACCESS_LEVEL['USER'])
        {
            return response()->json(["error" => "Cannot perform this action"],401);
        }

        return $next($request);
    }
}
