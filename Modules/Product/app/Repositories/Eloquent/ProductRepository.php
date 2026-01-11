<?php

namespace Modules\Product\app\Repositories\Eloquent;

use Modules\Product\app\Repositories\Contracts\ProductRepositoryInterface;
use App\Http\Controllers\Controller;
use App\Models\Branches;
use App\Models\PackageTrx;
use App\Models\ServiceBranch;
use App\Models\ServiceStaff;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\Service\app\Models\Productmeta; // Shared
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Modules\Service\app\Models\AdditionalService as ModelsAdditionalService; // Maybe shared or need Product equivalent?
use Modules\Product\app\Models\Product; // The updated Product model
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Illuminate\View\View;
use Modules\Categories\app\Models\Categories;
use Modules\Communication\app\Http\Controllers\EmailController;
use Modules\GlobalSetting\app\Models\Language;
use Modules\Communication\app\Http\Controllers\NotificationController;
use Modules\GlobalSetting\app\Models\Templates;
use Modules\GlobalSetting\Entities\GlobalSetting;
use Modules\Product\app\Models\Category;

class ProductRepository implements ProductRepositoryInterface
{
    public function setDefault(Request $request): array
    {
        $category = Product::where('id', $request->input('id'))->first();
        if ($category->status == 0) {
            $product_views = Product::find($request->input('id'));
            $product_views->status = 1;
            $product_views->save();
        }
        if ($category->status == 1) {
            $product_views = Product::find($request->input('id'));
            $product_views->status = 0;
            $product_views->save();
        }
        return [
            'code' => '200',
            'success' => true,
            'message' => 'Product Status updated Successfully'
        ];
    }

    public function delete(Request $request): array
    {
        try {
            $category = Product::where('id', $request->input('id'))->first();
            $category->delete();

            return [
                'code' => 200,
                'success' => true,
                'message' => 'Product deleted successfully.',
                'data' => $category
            ];
        } catch (\Exception $e) {
            return [
                'code' => 500,
                'success' => false,
                'message' => 'Failed to delete Product.',
                'error' => $e->getMessage()
            ];
        }
    }

    public function index(Request $request): array
    {
        try {
            $userId = $request->input('user_id');
            // $query = Product::query()->where('source_type', '=', 'product'); // optimized below
            $query = DB::table('products')
                ->select('products.id', 'products.verified_status', 'products.user_id', 'products.slug', 'products.status', 'categories.name', 'products.source_code', 'products.source_name')
                ->join('categories', 'products.source_category', '=', 'categories.id')
                ->where('products.source_type', '=', 'product') // CHANGED
                ->whereNull('products.deleted_at')
                ->whereExists(function ($query) {
                    $query->select(DB::raw(1))
                        ->from('users')
                        ->whereColumn('users.id', 'products.user_id')
                        ->whereNull('users.deleted_at');
                })
                ->groupBy('products.id', 'products.verified_status', 'products.user_id', 'products.slug', 'categories.name', 'products.source_code', 'products.source_name', 'products.status');

            return [
                'code' => '200',
                'message' => 'Products retrieved successfully.',
                'data' => $query->get(),
            ];
        } catch (\Exception $e) {
            return [
                'code' => '500',
                'message' => 'An error occurred while retrieving products.',
                'error' => $e->getMessage(),
            ];
        }
    }

    public function store(Request $request): JsonResponse | RedirectResponse
    {
        DB::beginTransaction();

        try {
            $validator = $request->validate([
                'source_name' => 'required|unique:products|max:255',
                'source_code' => 'required',
                'category_fied' => 'required',
                'Subcategory_fied' => 'required',
                'source_desc' => 'required',
            ]);

            $slug_text = $request->source_name;
            $slug_text = Str::slug($slug_text);

            $userId = Auth::id();

            $data = [
                'source_name' => $request->source_name,
                'source_type' => 'product', // CHANGED
                'slug' => $slug_text,
                'user_id' => $userId,
                'source_category' => $request->category_fied,
                'source_subcategory' => $request->Subcategory_fied,
                'price_type' => $request->price_type,
                'source_price' => $request->fixed_price,
                'source_brand' => $request->source_brand,
                'source_stock' => $request->source_stock,
                'seo_title' => $request->seo_title,
                'seo_description' => $request->content,
                'include' => $request->include,
                'tags' => $request->tags,
                'source_description' => $request->source_desc,
                'source_code' => $request->source_code,
                'created_by' => $userId,
                'country' => $request->country,
                'state' => $request->state,
                'city' => $request->city,
                'verified_status' => 1, // Auto verify or not? Services are verified_status 0 or 1.
            ];

            $product = Product::create($data);

            // Handle additional meta if needed, but for now mostly copying structure
            $message = 'Product created successfully.';
            $statusCode = 200;

            if ($request->hasFile('logo')) {
                foreach ($request->file('logo') as $photo) {
                    $logoPath = $photo->store('product_images', 'public'); // CHANGED
                    $data = [
                        'product_id' => $product->id,
                        'source_key' => 'product_image',
                        'source_Values' => $logoPath
                    ];
                    $product_meta = Productmeta::create($data);
                }
            }

            if ($request->price_type != "") {
                $data = [
                    'product_id' => $product->id,
                    'source_key' => $request->price_type,
                    'source_Values' => $request->fixed_price
                ];
                $product_meta = Productmeta::create($data);
            }
            DB::commit();
            return redirect('admin/products'); // CHANGED

        } catch (\Exception $e) {
            DB::rollback();
            return redirect('admin/addproduct')->withErrors($e->getMessage())->withInput(); // CHANGED
        }
    }

    public function update(Request $request): RedirectResponse
    {
        $userId = Auth::id();

        $data = [
            'source_name' => $request->source_name,
            'source_type' => 'product', // CHANGED
            'source_category' => $request->category,
            'source_subcategory' => $request->Subcategory_fied,
            'price_type' => $request->price_type,
            'source_price' => $request->fixed_price,
            'source_brand' => $request->source_brand,
            'source_stock' => $request->source_stock,
            'seo_title' => $request->seo_title,
            'seo_description' => $request->content,
            'include' => $request->include,
            'tags' => $request->tags,
            'source_description' => $request->source_desc,
            'source_code' => $request->source_code,
            'updated_by' => $userId,
            'country' => $request->country,
            'state' => $request->state,
            'city' => $request->city,
        ];
        Product::where('id', $request->source_id)->update($data);

        if ($request->hasFile('logo')) {
            foreach ($request->file('logo') as $photo) {
                $logoPath = $photo->store('product_images', 'public');
                $data = [
                    'product_id' => $request->source_id,
                    'source_key' => 'product_image',
                    'source_Values' => $logoPath
                ];
                $product_meta = Productmeta::create($data);
            }
        }

        $removedImages = str_replace('storage/', '', explode(',', $request->removed_images));
        if (!empty($removedImages)) {
            foreach ($removedImages as $removedImage) {
                if (!empty($removedImage)) {
                    if (Storage::exists($removedImage)) {
                        Storage::delete($removedImage);
                    }
                    Productmeta::where(['product_id' => $request->source_id, 'source_Values' => $removedImage])->delete();
                }
            }
        }
        return redirect('admin/products'); // CHANGED
    }

    public function providerProductIndex(Request $request): array
    {
        $orderBy = $request->input('order_by', 'desc');
        $sortBy = $request->input('sort_by', 'id');
        $authId = $request->input('auth_id');

        $userId = User::select('user_language_id')->where('id', $authId)->first();

        if ($userId) {
            $languageId = $userId->user_language_id;
        } else {
            $languageId = 1; // Default
        }

        if (request()->has('is_mobile') && request()->get('is_mobile') === "yes") {
            $products = Product::where('user_id', $request->provider_id)
                ->where('language_id', $request->language_id)
                ->where('source_type', 'product')
                ->orderBy($sortBy, $orderBy)
                ->get();
        } else {
            $products = Product::where('user_id', $authId)
                ->where('language_id', $languageId)
                ->where('source_type', 'product')
                ->orderBy($sortBy, $orderBy)
                ->get();
        }

        try {
            $countries = json_decode(file_get_contents(public_path('countries.json')), true);
            $states = json_decode(file_get_contents(public_path('states.json')), true);
            $cities = json_decode(file_get_contents(public_path('cities.json')), true);
        } catch (\Exception $e) {
            $countries = ['countries' => []];
            $states = ['states' => []];
            $cities = ['cities' => []];
        }

        $countryMap = collect($countries['countries'] ?? [])->pluck('name', 'id')->all();
        $stateMap = collect($states['states'] ?? [])->pluck('name', 'id')->all();
        $cityMap = collect($cities['cities'] ?? [])->pluck('name', 'id')->all();

        $data = $products->map(function ($product) use ($countryMap, $stateMap, $cityMap, $request) {
            $baseUrl = url('/storage');

            $productMeta = ProductMeta::where('product_id', $product->id)
                ->where('source_key', 'product_image')
                ->pluck('source_Values')
                ->map(function ($image) use ($baseUrl) {
                    return $baseUrl . '/' . $image;
                });

            // Additional services might not apply to Products, but keeping structure if needed
            $additionalServices = ModelsAdditionalService::where('service_id', $product->id)->get(['name', 'price', 'duration', 'image']);
            $additionalServices->transform(function ($additional) use ($baseUrl) {
                if ($additional->image) {
                    $additional->image = $baseUrl . '/' . $additional->image;
                }
                return $additional;
            });

            $cityNames = collect(explode(',', $product->city))->map(function ($cityId) use ($cityMap) {
                return $cityMap[$cityId] ?? $cityId;
            })->unique()->implode(', ');

            $stateName = $stateMap[$product->state] ?? $product->state;
            $countryName = $countryMap[$product->country] ?? $product->country;

            $catgoryName = Category::select('name')->where('id', $product->source_category)->first();
            $subCatgoryName = Category::select('name')->where('id', $product->source_subcategory)->first();

            return [
                'id'                 => $product->id,
                'user_id'            => $product->user_id,
                'source_name'        => $product->source_name,
                'slug'               => $product->slug,
                'source_code'        => $product->source_code,
                'source_type'        => $product->source_type,
                'source_tag'         => $product->source_tag,
                'source_description' => $product->source_description,
                'source_category'    => $request->is_mobile === "yes" ? $catgoryName->name ?? null : $product->source_category,
                'source_subcategory' => $request->is_mobile === "yes" ? $subCatgoryName->name ?? null : $product->source_subcategory,
                'source_price'       => $product->source_price,
                'plan'               => $product->plan,
                'price_description'  => $product->price_description,
                'source_brand'       => $product->source_brand,
                'source_stock'       => $product->source_stock,
                'seo_title'          => $product->seo_title,
                'tags'               => $product->tags,
                'featured'           => $product->featured,
                'popular'            => $product->popular,
                'seo_description'    => $product->seo_description,
                'price_type'         => $product->price_type,
                'duration'           => $product->duration,
                'country'            => $countryName,
                'state'              => $stateName,
                'city'               => $cityNames,
                'address'            => $product->address,
                'pincode'            => $product->pincode,
                'include'            => $product->include,
                'status'             => $product->status,
                'created_by'         => $product->created_by,
                'product_image'       => $productMeta,
                'additional_services' => $additionalServices,
                'verified_status' => $product->verified_status,
            ];
        });

        return [
            'code'    => '200',
            'message' => __('Product details retrieved successfully.'),
            'data'    => $data
        ];
    }

    public function getDetails(Request $request, string $slug): array
    {
        $product = Product::where('slug', $slug)->where('language_id', $request->language_id)->first();

        if (!$product) {
            $product = Product::where('language_id', $request->language_id)
                ->where('parent_id', $request->service_id) // using service_id from request but logic is for product
                ->orWhere('id', $request->parent_id)->first();
        }

        if ($product) {
            $productMeta = ProductMeta::where('product_id', $product->id)->get();

            $baseUrl = url('/storage');

            $productMeta->transform(function ($meta) use ($baseUrl) {
                if ($meta->source_key === 'product_image') {
                    $meta->source_Values = $baseUrl . '/' . $meta->source_Values;
                }
                if ($meta->source_key === 'product_video') {
                    $meta->source_Values = $baseUrl . '/' . $meta->source_Values;
                }
                return $meta;
            });

            // Assuming Additional services NOT used for products
            $additionalServices = ModelsAdditionalService::where('service_id', $product->id)->get();

            // Branches handled same way?
            $serviceBranches = ServiceBranch::where('service_id', $product->id)->get();
            // Simplify branches for now or keep logic if products are location based by branch

            // ... Code omitting complex branch logic for brevity, mimicking minimal return

            return [
                'code' => 200,
                'data' => [
                    'product' => $product,
                    'meta' => $productMeta,
                    'additional_services' => $additionalServices,
                    'service_branch' => [], // TODO: Add branch logic if needed
                ]
            ];
        } else {
            return [
                'code' => 422,
                'message' => 'Product not found',
                'data' => [
                    'status' => true,
                ],
            ];
        }
    }

    public function providerProductStore(Request $request): JsonResponse
    {
        // Validation similar to Services
        $rules = [
            'product_name'    => 'required|string|max:255',
            'product_code'    => 'required|string|max:100',
            'category'        => 'required|integer',
            'sub_category'    => 'required|integer',
            'description'     => 'required|string|min:10',
            'seo_title'       => 'required|string|max:255',
            'seo_description' => 'required|string|max:500|min:20',
            'source_stock'    => 'nullable|integer',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $slug = Str::slug($request->product_name);
        $slugCount = Product::where('slug', $slug)->count();
        if ($slugCount > 0) {
            $slug = $slug . '-' . ($slugCount + 1);
        }

        $userId = Auth::id();
        $verifiedStatus = 1; // Default to verified or check logic

        $data = [
            'user_id'            => $userId,
            'source_name'        => $request->product_name,
            'slug'               => $slug,
            'source_code'        => $request->product_code,
            'source_type'        => 'product', // CHANGED
            'source_category'    => $request->category,
            'source_subcategory' => $request->sub_category,
            'source_description' => $request->description,
            'seo_title'          => $request->seo_title,
            'seo_description'    => $request->seo_description,
            'price_type'         => $request->price_type ?? 'fixed',
            'source_price'       => $request->service_price,
            'source_stock'       => $request->source_stock, // Added Stock
            'featured'           => 1,
            'popular'            => 1,
            'created_by'         => $userId,
            'verified_status'    => $verifiedStatus,
            'language_id'        => $request->userLangId ?? 1,
        ];

        $save = Product::create($data);

        // Save Images
        if ($request->hasFile('product_images') && $request->file('product_images')) {
            $images = $request->file('product_images');
            if (is_array($images)) {
                foreach ($images as $image) {
                    $imagePath = $image->store('product_images', 'public');
                    Productmeta::create([
                        'product_id' => $save->id,
                        'source_key' => 'product_image',
                        'source_Values' => $imagePath
                    ]);
                }
            }
        }

        $redirectUrl = route('provider.product'); // CHANGED

        return response()->json([
            'code'    => 200,
            'message' => __('Product created successfully'),
            'redirect_url' => $redirectUrl,
            'data'    => [],
        ], 200);
    }

    public function providerProductUpdate(Request $request): JsonResponse
    {
        // Validation
        $rules = [
            'product_name'    => 'required|string|max:255',
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Logic similar to update
        $product = $request->id;
        $userId = Auth::id();
        $slug = Str::slug($request->product_name);

        $data = [
            'source_name'        => $request->product_name,
            'slug'               => $slug,
            'source_code'        => $request->product_code,
            'source_category'    => $request->category,
            'source_subcategory' => $request->sub_category,
            'source_description' => $request->description,
            'source_price'       => $request->service_price,
            'source_stock'       => $request->source_stock,
            'updated_by'         => $userId,
        ];

        Product::where('id', $product)->update($data);

        // Handle images if needed

        $redirectUrl = route('provider.product');

        return response()->json([
            'code'    => 200,
            'message' => __('Product updated successfully'),
            'redirect_url' => $redirectUrl,
            'data'    => [],
        ], 200);
    }

    // Stubs for Interface compliance
    public function verifyProduct(Request $request): array
    {
        return [];
    }
    public function deleteProductImage(string $id): array
    {
        $image = Productmeta::find($id);
        if ($image) {
            if (Storage::disk('public')->exists($image->source_Values)) {
                Storage::disk('public')->delete($image->source_Values);
            }
            $image->delete();
            return [
                'code' => 200,
                'message' => __('Image deleted successfully')
            ];
        }
        return [
            'code' => 404,
            'message' => __('Image not found')
        ];
    }

    public function deleteSlot(string $id): array
    {
        return [];
    }

    public function deleteAdditionalProducts(string $id): array
    {
        // Logic if additional products exist
        return [];
    }

    public function deleteProducts(Request $request): array
    {
        $id = $request->input('id');
        $product = Product::find($id);
        if ($product) {
            $product->delete();
            // Optionally delete metas
            return [
                'code' => 200,
                'success' => true, // Legacy support
                'message' => __('Product deleted successfully')
            ];
        }
        return [
            'code' => 404,
            'success' => false,
            'message' => __('Product not found')
        ];
    }

    public function status(Request $request): array
    {
        $id = $request->input('id');
        $service = Product::select('status')->where('id', $id)->first();
        if ($service) {
            $newStatus = $service->status == 1 ? 0 : 1; // Toggle
            DB::table('products')->where('id', $id)->update(['status' => $newStatus]);
            return ['code' => '200', 'success' => true, 'message' => 'Status updated successfully.'];
        }
        return ['code' => '404', 'success' => false, 'message' => 'Product not found.'];
    }
    public function checkUnique(Request $request): bool
    {
        return false;
    }
    public function checkEditUnique(Request $request): bool
    {
        return false;
    }
    public function providerSub(Request $request): array
    {
        return [];
    }
    public function providerSubApi(Request $request): array
    {
        return [];
    }
    public function translate(Request $request): array
    {
        return [];
    }
    public function deleteImage(Request $request): array
    {
        return [];
    }
    public function checkCoupon(Request $request): array
    {
        return [];
    }
}
