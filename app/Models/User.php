<?php

namespace App\Models;

use App\Models\Traits\ApiScopes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;
    use ApiScopes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function hasDefinePrivilege($permission)
    {
        //TODO: check role
        return false;
    }

    public function isAccessAdmin()
    {
        //TODO: check admin
        return false;
    }
}
