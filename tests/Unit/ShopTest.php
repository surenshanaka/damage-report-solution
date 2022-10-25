<?php

namespace Tests\Feature;

use App\Models\Shop;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ShopTest extends TestCase
{
    use WithFaker;
    /**
     * test get all shops.
     *
     * @return void
     */
    public function test_get_all_shops()
    {
        $response = $this->json('GET', 'api/shops');
        $response->assertStatus(200);
    }

    /**
     * test create shop
     *
     * @return void
     */
    public function test_create_shop()
    {
        $payload = [
            'name' => $this->faker->name(),
            'email'  => $this->faker->safeEmail(),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude()
        ];

        $response = $this->json('POST', 'api/shops', $payload);

        $response->assertStatus(201);
    }

    /**
     * test update shop.
     *
     * @return void
     */
    public function test_update_shop()
    {
        $shopData = [
            'name' => $this->faker->name(),
            'email'  => $this->faker->safeEmail(),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
        ];

        $shop = Shop::create(
            $shopData
        );

        $payload = [
            'name' => $this->faker->name(),
            'email'  => $this->faker->safeEmail(),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
        ];

        $response = $this->json('PUT', "api/shops/$shop->id", $payload);

        $response->assertStatus(200);
    }

    /**
     * test delete shop.
     *
     * @return void
     */
    public function test_delete_shop()
    {

        $shopData = [
            'name' => $this->faker->name(),
            'email'  => $this->faker->safeEmail(),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
        ];

        $shop = Shop::create(
            $shopData
        );

        $response = $this->json('DELETE', "api/shops/$shop->id");
        $response->assertStatus(200);
    }
}
