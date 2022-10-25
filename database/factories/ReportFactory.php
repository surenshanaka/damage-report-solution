<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'description' => fake()->paragraph(5),
            'latitude' => fake()->latitude(),
            'longitude' => fake()->longitude(),
            'reason' => fake()->paragraph(5),
            'status' => fake()->numberBetween(0, 2),
        ];
    }
}
