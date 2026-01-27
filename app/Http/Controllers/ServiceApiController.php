<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;

class ServiceApiController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;

    }
    public function index(Request $request) : JsonResponse
    {
        $response = $this->productService->getProducts($request);
        return response()->json([
            'success' => true,
            'data' => $response
        ]);
    }
}
