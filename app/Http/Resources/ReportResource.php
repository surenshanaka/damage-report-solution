<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ReportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'photos' => PhotoResource::collection($this->photos),
            'description' => $this->description,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'reason' => $this->reason,
            'status' => $this->status,
            'created_at' => Carbon::createFromFormat('Y-m-d H:i:s', $this->created_at)
                ->format('m-d-Y h:i'),
            'updated_at' => Carbon::createFromFormat('Y-m-d H:i:s', $this->updated_at)
                ->format('m-d-Y h:i'),

        ];
    }
}
