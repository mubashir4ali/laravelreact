<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class TncUser extends Model
{
    protected $table = 'tnc_users';

    public const ACCESS_LEVEL = [
        'ADMIN' => 'admin',
        'USER' => 'user',
    ];

    # Bulk Assignment
    protected $fillable = [ 'first_name', 'last_name', 'email', 'password', 'access_level'];

    # Hide Password from API
    protected $hidden = [ 'password', 'remember_token' ];

    public $timestamps = true;

    # Mutators 
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public function setEmailAttribute($value)
    {
        # Prevent email from updating
        if($this->email) {
            return;
        }

        $this->attributes['email'] = strtolower($value);
    }

    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function getHashedPassword($value)
    {
        if (Hash::check($value, $this->password)) 
        {
            return true;
        }
        return false;
    }

    public function rollApiKey()
    {
        do
        {
           $this->remember_token = Str::random(60);
        }
        while($this->where('remember_token', $this->remember_token)->exists());
        $this->save();
        return $this->remember_token;
    }
}
