<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShopRequest;
use App\Http\Resources\ShopResource;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return void
     * 
     *
     * @OA\Get(
     *      path="/api/shops",
     *      operationId="getShopsList",
     *      tags={"Shops"},
     *      summary="Get list of shops",
     *      description="Returns list of shops",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation"
     *       )
     *     )
     */
    public function index()
    {
        try {
            return ShopResource::collection(Shop::orderBy('created_at', 'DESC')->paginate(10));
        } catch (\Exception $exception) {
            Log::error('ShopController(index)' . $exception->getMessage() . PHP_EOL . $exception->getTraceAsString());
            return $this->error("Shops fetch failed", 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ShopRequest $request
     * @return void
     * 
     * 
     * @OA\Post(
     *      path="/api/shops",
     *      operationId="storeShop",
     *      tags={"Shops"},
     *      summary="Store new shop",
     *      description="Returns shop data",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *              required={"name","email", "latitude", "longitude"},
     *              @OA\Property(property="name", type="string", example="John Doe"),
     *              @OA\Property(property="email", type="string", format="email", example="johndoe@mail.com"),
     *              @OA\Property(property="latitude", type="string", example="7.790864"),
     *              @OA\Property(property="longitude", type="string", example="-52.627011")
     *          )
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Successful operation",
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      )
     * )
     */
    public function store(ShopRequest $request)
    {
        try {
            $data = $request->validated();

            $shop = Shop::create($data);

            return new ShopResource($shop);
        } catch (\Exception $exception) {
            Log::error('ShopController(store)' . $exception->getMessage() . PHP_EOL . $exception->getTraceAsString());
            return $this->error("The shop failed to store", 400);
        }
    }

    /**
     * 
     * Display the specified resource.
     *
     * @param Shop $shop
     * @param Request $request
     * @return void
     * 
     * 
     * @OA\Get(
     *      path="/api/shops/{id}",
     *      operationId="getShopsById",
     *      tags={"Shops"},
     *      summary="Get shop information",
     *      description="Returns shop data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Shop id",
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
    public function show(Shop $shop)
    {
        try {
            return new ShopResource($shop);
        } catch (\Exception $exception) {
            Log::error('ShopController(show)' . $exception->getMessage() . PHP_EOL . $exception->getTraceAsString());
            return $this->error("The shop failed to show", 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ShopRequest $request
     * @param Shop $shop
     * @return void
     * 
     * 
     * @OA\Put(
     *      path="/api/shops/{id}",
     *      operationId="updateShop",
     *      tags={"Shops"},
     *      summary="Update existing shop",
     *      description="Returns updated shop data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Shop id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *      @OA\RequestBody(
     *         @OA\JsonContent(
     *              required={"name","email", "latitude", "longitude"},
     *              @OA\Property(property="name", type="string", example="John Shop"),
     *              @OA\Property(property="email", type="string", format="email", example="johndoe@mail.com"),
     *              @OA\Property(property="latitude", type="string", example="7.790864"),
     *              @OA\Property(property="longitude", type="string", example="-52.627011"),
     *         ) 
     *     ),
     *      @OA\Response(
     *          response=202,
     *          description="Successful operation"
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
    public function update(ShopRequest $request, Shop $shop)
    {
        try {
            $data = $request->validated();

            $shop->update($data);

            return new ShopResource($shop);
        } catch (\Exception $exception) {
            Log::error('ShopController(update)' . $exception->getMessage() . PHP_EOL . $exception->getTraceAsString());
            return $this->error("The shop failed to update", 400);
        }
    }


    /**
     * Delete the specified resource in storage
     *
     * @param Shop $shop
     * @return void
     * 
     * 
     * @OA\Delete(
     *      path="/api/shops/{id}",
     *      operationId="deleteShop",
     *      tags={"Shops"},
     *      summary="Delete existing shop",
     *      description="Deletes a record and returns no content",
     *      @OA\Parameter(
     *          name="id",
     *          description="Shop id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation"
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="Resource Not Found"
     *      )
     * )
     */
    public function destroy(Shop $shop)
    {
        try {
            $shop->delete();

            return new ShopResource($shop);
        } catch (\Exception $exception) {
            Log::error('ShopController(destroy)' . $exception->getMessage() . PHP_EOL . $exception->getTraceAsString());
            return $this->error("The shop failed to destroy", 400);
        }
    }
}
