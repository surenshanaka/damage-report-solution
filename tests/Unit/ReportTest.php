<?php

namespace Tests\Feature;

use App\Models\Report;
use App\Models\Shop;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ReportTest extends TestCase
{

    use WithFaker;

    /**
     * test get all reports.
     *
     * @return void
     */
    public function test_get_all_reports()
    {
        $payload = [
            'status' => [0, 1, 2]
        ];
        $response = $this->json('GET', 'api/reports', $payload);
        $response->assertStatus(200);
    }

    /**
     * test create report
     *
     * @return void
     */
    public function test_create_report()
    {

        $data = [
            'name' => $this->faker->name(),
            'email'  => $this->faker->safeEmail(),
            'description' => $this->faker->paragraph(5),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
            'reason' => $this->faker->paragraph(5),
            'status' => $this->faker->numberBetween(0, 2)
        ];

        $report = Report::create($data);

        $payload = [
            'name' => $this->faker->name(),
            'email'  => $this->faker->safeEmail(),
            'description' => $this->faker->paragraph(5),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
            'reason' => $this->faker->paragraph(5),
            'status' => $this->faker->numberBetween(0, 2),
            'photo' => [UploadedFile::fake()->image('file.png'), 'report_id' => $report->id]
        ];

        $response = $this->json('POST', 'api/reports', $payload);

        $response->assertStatus(201);
    }

    /**
     * test update report.
     *
     * @return void
     */
    public function test_update_report()
    {

        $reportData = [
            'name' => $this->faker->name(),
            'email'  => $this->faker->safeEmail(),
            'description' => $this->faker->paragraph(5),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
            'reason' => $this->faker->paragraph(5),
            'status' => $this->faker->numberBetween(0, 2),
        ];

        $report = Report::create(
            $reportData
        );

        $payload = [
            'name' => $this->faker->name(),
            'email'  => $this->faker->safeEmail(),
            'description' => $this->faker->paragraph(5),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
            'reason' => $this->faker->paragraph(5),
            'status' => $this->faker->numberBetween(0, 2),
        ];

        $response = $this->json('PUT', "api/reports/$report->id", $payload);

        $response->assertStatus(200);
    }

    /**
     * test delete report.
     *
     * @return void
     */
    public function test_delete_report()
    {

        $reportData = [
            'name' => $this->faker->name(),
            'email'  => $this->faker->safeEmail(),
            'description' => $this->faker->paragraph(5),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
            'reason' => $this->faker->paragraph(5),
            'status' => $this->faker->numberBetween(0, 2),
        ];

        $report = Report::create(
            $reportData
        );

        $response = $this->json('DELETE', "api/reports/$report->id");
        $response->assertStatus(200);
    }

    /**
     * test shops available within 25km for the selected report 
     *
     * @return void
     */
    public function test_shops_available_for_report()
    {
        $shopData = [
            'name' => $this->faker->name(),
            'email'  => $this->faker->safeEmail(),
            'latitude' => "6.022983590186114",
            'longitude' => "80.50106908475232",
        ];

        Shop::create(
            $shopData
        );

        $reportData = [
            'name' => $this->faker->name(),
            'email'  => $this->faker->safeEmail(),
            'description' => $this->faker->paragraph(5),
            'latitude' => "6.012845718315232",
            'longitude' => "80.51238688696638",
            'reason' => $this->faker->paragraph(5),
            'status' => $this->faker->numberBetween(0, 2),
        ];

        $report = Report::create(
            $reportData
        );

        $shops = $report->getAvailableShops($report->latitude, $report->longitude);

        $this->assertTrue(!$shops->isEmpty());
    }
}
