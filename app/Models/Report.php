<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'name', 'email', 'description', 'latitude', 'longitude', 'reason', 'status'];

    public function photos()
    {
        return $this->hasMany(Photo::class);
    }

    public function shops()
    {
        return $this->belongsToMany(Shop::class);
    }


    public function getAvailableShops($reportLatitude, $reportLongitude)
    {
        return Shop::select(\DB::raw("id, ( 3959 * acos( cos( radians('$reportLatitude') ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians('$reportLongitude') ) + sin( radians('$reportLatitude') ) * sin( radians( latitude ) ) ) ) AS distance"))->havingRaw('distance < 25')->orderBy('distance')
            ->get();
    }
}
