<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\TncUser;

class TncUserController extends Controller
{
    public function __construct()
    {
        $this->globalUserDetails = config('globalUserDetails');
    }
    public function getAllUsers(Request $request)
    {
        $users = TncUser::orderBy('created_at', 'desc')->skip(0)->take(50)->get();
        return response()->json($users);
    }

    public function createUser(Request $request)
    {
        try
        {    
            TncUser::create($request->all());
        }
        catch(\Illuminate\Database\QueryException $exception)
        {
            return response()->json(["error" => $exception->errorInfo],500);
        } 
        
        return response()->json(["message" => "User has been created successfully"],200);
    }

    public function getUser($id)
    {
        return response()->json(TncUser::where('id', $id)->first());
    }

    public function updateUser(Request $request, $id)
    {
        $globalUserDetails = config('globalUserDetails');

        $user = TncUser::where('id', $id)->first();

        if(trim($request->access_level) && !in_array($request->access_level,array_values(TncUser::ACCESS_LEVEL)))
        {
            return response()->json(["error" => "Cannot grant super access"],500);
        }

        if($globalUserDetails->access_level == TncUser::ACCESS_LEVEL['USER'] && 
            $globalUserDetails->id != $user->id){
            return response()->json(["error" => "`user` access level cannot update any other user"],500);
        }

        if(trim($request->first_name))
        {
            $user->first_name = $request->first_name;
        }

        if(trim($request->last_name))
        {
            $user->last_name = $request->last_name;
        }

        if(trim($request->password))
        {
            $user->password = $request->password;
        }

        if(trim($request->access_level))
        {
            $user->access_level = $request->access_level;
        }
        
        $user->save();
        return response()->json(["message" => "User has been Updated successfully"],200);
    }

    public function destroy($id)
    {
        $globalUserDetails = config('globalUserDetails');

        $user = TncUser::where('id', $id)->first();

        if(!$user)
        {
            return response()->json(["error" => "Invalid ID"],500);
        }

        if($globalUserDetails->access_level == TncUser::ACCESS_LEVEL['USER']){
            return response()->json(["error" => "Access level `user` cannot perform delete"],500);
        }

        if($user->id === $globalUserDetails->id)
        {
            return response()->json(["error" => "Cannot delete itself"],500);
        }
        
        if(!in_array($user->access_level,array_values(TncUser::ACCESS_LEVEL)))
        {
            return response()->json(["error" => "Cannot delete super user"],500);
        }

        if($user->delete())
        {
            return response()->json([
                "message" => "User has been deleted successfully", 
                "id" => $id
            ],200);
        }

        return response()->json(["error" => "Error Deleting the User"],500);
    }


    public function userLogin(Request $request)
    {
        $req = $request->all();
        $email = trim(@$req['email']);
        $password = trim(@$req['password']);

        if(!$email)
        {
            return response()->json(["error" => "Email is empty"],401);
        }

        if(!$password)
        {
            return response()->json(["error" => "Password is empty"],401);
        }

        $user = TncUser::where('email', $email)->first();

        if($user && $user->getHashedPassword($password))
        {

            # Update the user last activity time
            $user->user_last_activity = @date("Y-m-d H:i:s");
            $user->save();

            # explicitly pass token on login only
            $token = $user->rollApiKey();
            $user = $user->toArray();
            $user['remember_token'] = $token;
            
            return response()->json($user);
        }

        return response()->json(["error" => "Invalid Username/Password"], 401);
    }

    public function userLogout()
    {
        $globalUserDetails = config('globalUserDetails');

        $user = TncUser::where('id',$globalUserDetails->id)->first();
        
        if($user) {
            $user->remember_token = "";
            $user->save();
            return response()->json(["error" => "Logout successful"], 200);
        }
        return response()->json(["error" => "User not found"], 500);
    }
}
