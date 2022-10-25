<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReportRequest;
use App\Http\Resources\ReportResource;
use App\Jobs\SendEmailJob;
use App\Models\Photo;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ReportController extends Controller
{

    public function __construct()
    {
        $this->report = new Report();
    }

    /**
     * Display a listing of the resource.
     *
     * @return void
     * 
     *
     * @OA\Get(
     *      path="/api/reports",
     *      operationId="getReportsList",
     *      tags={"Reports"},
     *      summary="Get list of reports",
     *      description="Returns list of reports",
     *      @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Per page count",
     *         required=false,
     *         explode=true,
     *         @OA\Schema(
     *             default="1",
     *             type="integer"
     *         )
     *      ),
     *      @OA\Parameter(
     *         name="status[]",
     *         in="query",
     *         description="Filter reports by status",
     *         required=false,
     *         explode=true,
     *         @OA\Schema(
     *             default="[0,1,2]",
     *             type="object"
     *         )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation"
     *       )
     *     )
     */
    public function index(Request $request)
    {
        try {
            $status = $request->input('status');

            $reports = ReportResource::collection(Report::whereIn('status', $status)->orderBy('created_at', 'DESC')->paginate(10));

            return $reports;
        } catch (\Exception $exception) {
            Log::error('ReportController(index)' . $exception->getMessage() . PHP_EOL . $exception->getTraceAsString());
            return $this->error("Reports fetch failed", 400);
        }
    }

    /**
     * 
     * Store a newly created resource in storage.
     *
     * @param ShopRequest $request
     * @return void
     *
     * @OA\Post(
     *      path="/api/reports",
     *      operationId="storeReport",
     *      tags={"Reports"},
     *      summary="Store new report",
     *      description="Returns report data",
     *      @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 allOf={
     *                     @OA\Schema(
     *                          required={"name","email", "description", "latitude", "longitude", "photo[]"},
     *                          @OA\Property(property="name", type="string", example="John Doe"),
     *                          @OA\Property(property="email", type="string", format="email", example="johndoe@mail.com"),
     *                          @OA\Property(property="description", type="string", example="Lorem Ipsum is simply dummy text of the printing"),
     *                          @OA\Property(property="latitude", type="string", example="7.790864"),
     *                          @OA\Property(property="longitude", type="string", example="-52.627011"),
     *                          @OA\Property(property="reason", type="string", example="Lorem Ipsum is simply dummy text of the printing"),
     *                          @OA\Property(
     *                             description="Report photos",
     *                             property="photo[]",
     *                             type="array",
     *                             @OA\Items(type="string", format="binary")
     *                         )
     *                     )
     *                 }
     *             )
     *         )
     *     ),

     *      @OA\Response(
     *          response=201,
     *          description="Successful operation",
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      ),
     * )
     */
    public function store(ReportRequest $request)
    {
        try {
            $data = $request->validated();

            $report = Report::create($data);

            if (!$request->hasFile('photo')) {
                return response()->json(['upload_file_not_found'], 400);
            }

            $allowedlyExtension = ['jpg', 'png'];
            $files = $request->file('photo');

            foreach ($files as $file) {

                $extension = $file->getClientOriginalExtension();
                $check = in_array($extension, $allowedlyExtension);

                if ($check) {
                    $name = time() . '.' . $extension;
                    $path = $file->move(public_path('photos'), $name);
                    //store photo into directory and db
                    $photoModal = new Photo();
                    $photoModal->name = $name;
                    $photoModal->path = $path;
                    $photoModal->report_id = $report->id;
                    $photoModal->save();
                } else {
                    return response()->json(['invalid_file_format'], 422);
                }
            }

            return new ReportResource($report);
        } catch (\Exception $exception) {
            Log::error('ReportController(store)' . $exception->getMessage() . PHP_EOL . $exception->getTraceAsString());
            return $this->error("The report failed to store", 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param Report $report
     * @param Request $request
     * @return void
     *
     * 
     * @OA\Get(
     *      path="/api/reports/{id}",
     *      operationId="getReportById",
     *      tags={"Reports"},
     *      summary="Get report information",
     *      description="Returns report data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Report id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      )
     * )
     */
    public function show(Report $report)
    {
        try {
            return new ReportResource($report);
        } catch (\Exception $exception) {
            Log::error('ReportController(show)' . $exception->getMessage() . PHP_EOL . $exception->getTraceAsString());
            return $this->error("The report failed to show", 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ReportRequest $request
     * @param Report $report
     * @return void
     *
     *
     * @OA\Put(
     *      path="/api/reports/{id}",
     *      operationId="updateReport",
     *      tags={"Reports"},
     *      summary="Update existing report",
     *      description="Returns updated report data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Report id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *      @OA\RequestBody(
     *         @OA\JsonContent(
     *              required={"name","email", "description", "latitude", "longitude", "reason", "status"},
     *              @OA\Property(property="name", type="string", example="John Doe"),
     *              @OA\Property(property="email", type="string", format="email", example="johndoe@mail.com"),
     *              @OA\Property(property="description", type="string", example="Lorem Ipsum is simply dummy text of the printing"),
     *              @OA\Property(property="latitude", type="string", example="7.790864"),
     *              @OA\Property(property="longitude", type="string", example="-52.627011"),
     *              @OA\Property(property="reason", type="string", example="Lorem Ipsum is simply dummy text of the printing"),
     *              @OA\Property(property="status", type="string", example="1"),
     *         ) 
     *     ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Resource Not Found"
     *      )
     * )
     */
    public function update(ReportRequest $request, Report $report)
    {
        try {
            $data = $request->validated();

            if ($data['status'] === 1) {
                $response = $this->storeReportShop($report->id);
                if ($response) {

                    $details['email'] = $data['email'];
                    $details['name'] = $data['name'];
                    $details['reason'] = null;
                    $details['status'] = 'approved';
                    // Send mail when approve the report
                    SendEmailJob::dispatch($details);

                    $report->update($data);

                    return new ReportResource($report);
                } else {
                    return response()->json(['no shops available within 25km'], 400);
                }
            }

            if ($data['status'] === 2) {
                $details['email'] = $data['email'];
                $details['name'] = $data['name'];
                $details['reason'] = $data['reason'];
                $details['status'] = 'rejected';

                // Send mail when reject the report
                SendEmailJob::dispatch($details);

                return new ReportResource($report);
            }
        } catch (\Exception $exception) {
            Log::error('ReportController(update)' . $exception->getMessage() . PHP_EOL . $exception->getTraceAsString());
            return $this->error("The report not updated", 400);
        }
    }

    /**
     * Delete the specified resource in storage
     *
     * @param Report $report
     * @return void
     */
    public function destroy(Report $report)
    {
        try {
            $report->delete();

            return new ReportResource($report);
        } catch (\Exception $exception) {
            Log::error('ReportController(destroy)' . $exception->getMessage() . PHP_EOL . $exception->getTraceAsString());
            return $this->error("The report not deleted", 400);
        }
    }

    /**
     * Assign to shops when approve the report
     *
     * @param [type] $reportId
     * @return void
     */
    private function storeReportShop($reportId)
    {
        try {
            $report = Report::findOrFail($reportId);

            $reportLatitude = $report->latitude;
            $reportLongitude = $report->longitude;

            // Get all the available shops within 25 km.
            $shops = $this->report->getAvailableShops($reportLatitude, $reportLongitude);

            if (!$shops->isEmpty()) {
                foreach ($shops as $shop) {
                    $report->shops()->attach($shop->id);
                }
                return true;
            } else {
                return false;
            }
        } catch (\Exception $exception) {
            Log::error('ReportController(storeReportShop)' . $exception->getMessage() . PHP_EOL . $exception->getTraceAsString());
            return false;
        }
    }
}
