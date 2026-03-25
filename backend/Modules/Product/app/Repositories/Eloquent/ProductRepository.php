<?php

namespace Modules\Product\app\Repositories\Eloquent;

use Modules\Product\app\Repositories\Contracts\ProductRepositoryInterface;
use App\Http\Controllers\Controller;
use App\Models\Branches;
use App\Models\PackageTrx;
use App\Models\ServiceBranch;
use App\Models\ServiceStaff;
use App\Models\User;
use App\Models\NewProduct;
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

public function store(Request $request): RedirectResponse
{
    DB::beginTransaction();

    try {
        // Map form keys to database keys
        $validator = $request->validate([
            'product_name' => 'required|unique:products,source_name|max:255',
            'product_code' => 'required',
            'category_fied' => 'required',
            // 'subcategory_fied' => 'required', // Make sure you add this input in your form
            'product_desc' => 'required',
        ]);

        $slug_text = Str::slug($request->product_name);
        $userId = Auth::id();

        $data = [
            'source_name' => $request->product_name,
            'source_type' => 'product',
            'slug' => $slug_text,
            'user_id' => $userId,
            'source_category' => $request->category_fied,
            'source_subcategory' => $request->subcategory_fied ?? null, // ensure your form has subcategory
            'price_type' => $request->price_type,
            'source_price' => $request->fixed_price,
            'source_brand' => $request->source_brand ?? null,
            'source_stock' => $request->source_stock,
            'seo_title' => $request->meta_title ?? null,
            'seo_description' => $request->meta_description ?? null,
            'tags' => $request->meta_keywords ?? null,
            'source_description' => $request->product_desc,
            'source_code' => $request->product_code,
            'created_by' => $userId,
        ];

        $product = Product::create($data);

        // Handle images
        if ($request->hasFile('product_images')) {
            foreach ($request->file('product_images') as $photo) {
                $logoPath = $photo->store('product_images', 'public');
                Productmeta::create([
                    'product_id' => $product->id,
                    'source_key' => 'product_image',
                    'source_Values' => $logoPath
                ]);
            }
        }

        // Handle price meta
        if (!empty($request->price_type)) {
            Productmeta::create([
                'product_id' => $product->id,
                'source_key' => $request->price_type,
                'source_Values' => $request->fixed_price
            ]);
        }

        DB::commit();
        return redirect('admin/products')->with('success', 'Product created successfully.');
    } catch (\Exception $e) {
        DB::rollback();
        return redirect('admin/addproduct')->withErrors($e->getMessage())->withInput();
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
            $products = NewProduct::where('user_id', $request->provider_id)
                ->where('language_id', $request->language_id)
                ->where('source_type', 'product')
                ->orderBy($sortBy, $orderBy)
                ->get();
        } else {
            $products = NewProduct::where('user_id', $authId)
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
        try {
            $rules = [
                'product_name'    => 'required|string|max:255',
                'product_code'    => 'required|string|max:100',
                'category'        => 'required|integer',
                'sub_category'    => 'required|integer',
                'description'     => 'required|string|min:10',
                'service_price'   => 'required|numeric',
                'seo_title'       => 'required|string|max:255',
                'seo_description' => 'required|string|max:500|min:20',
                'source_stock'    => 'nullable|integer',
                'product_images.*'=> 'image|mimes:jpeg,png,jpg,webp|max:2048'
            ];

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // Slug Logic
            $slug = Str::slug($request->product_name);
            $originalSlug = $slug;
            $count = 1;
            while (NewProduct::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $count++;
            }

            $userId = Auth::id() ?? $request->provider_id;
            
            // Handle Multiple Images
            $imagePaths = [];
            if ($request->hasFile('product_images')) {
                foreach ($request->file('product_images') as $image) {
                    $path = $image->store('product_images', 'public');
                    $imagePaths[] = $path;
                }
            }

            // Prepare Data for NewProduct Model
            $data = [
                'user_id'            => $userId,
                'source_name'        => $request->product_name,
                'slug'               => $slug,
                'source_code'        => $request->product_code,
                'source_type'        => 'product',
                'source_category'    => $request->category,
                'source_subcategory' => $request->sub_category,
                'brand'              => $request->brand,
                'model'              => $request->model,
                'capacity'           => $request->capacity,
                'warranty'           => $request->warranty,
                'specs'              => json_decode($request->specification, true), // Decode table data
                'images'             => $imagePaths, // Saved as JSON array via model casting
                'source_description' => $request->description, // Markdown content
                'price_type'         => $request->price_type ?? 'fixed',
                'source_price'       => $request->service_price,
                'discount_percent'   => $request->discount ?? 0,
                'source_stock'       => $request->source_stock ?? 0,
                'seo_title'          => $request->seo_title,
                'seo_description'    => $request->seo_description,
                'featured'           => 1,
                'popular'            => 1,
                'verified_status'    => 1,
                'language_id'        => $request->userLangId ?? 1,
                'created_by'         => $userId,
            ];

            $save = NewProduct::create($data);

            return response()->json([
                'code'         => 200,
                'success'      => true,
                'message'      => __('Product created successfully'),
                'redirect_url' => route('provider.product'),
                'data'         => $save,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'line'    => $e->getLine(),
                'file'    => $e->getFile()
            ], 500);
        }
    }

    public function providerProductUpdate(Request $request): JsonResponse
    {
        try {

            $rules = [
                'id'              => 'required|integer',
                'product_name'    => 'required|string|max:255',
                'product_code'    => 'required|string|max:100',
                'category'        => 'required|integer',
                'sub_category'    => 'required|integer',
                'description'     => 'required|string|min:10',
                'service_price'   => 'required|numeric',
                'seo_title'       => 'required|string|max:255',
                'seo_description' => 'required|string|max:500|min:20',
                'source_stock'    => 'nullable|integer',
                'product_images.*'=> 'image|mimes:jpeg,png,jpg,webp|max:2048'
            ];

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], 422);
            }

            $product = NewProduct::findOrFail($request->id);

            // slug (ignore current product)
            $slug = Str::slug($request->product_name);
            $originalSlug = $slug;
            $count = 1;

            while (
                NewProduct::where('slug', $slug)
                ->where('id', '!=', $request->id)
                ->exists()
            ) {
                $slug = $originalSlug . '-' . $count++;
            }

            $userId = Auth::id();

            // images
            $imagePaths = $product->images ?? [];

            if ($request->hasFile('product_images')) {
                foreach ($request->file('product_images') as $image) {
                    $path = $image->store('product_images', 'public');
                    $imagePaths[] = $path;
                }
            }

            // remove images
            if ($request->removed_images) {
                $remove = explode(',', $request->removed_images);
                $imagePaths = array_diff($imagePaths, $remove);
            }

            $data = [
                'source_name'        => $request->product_name,
                'slug'               => $slug,
                'source_code'        => $request->product_code,
                'source_category'    => $request->category,
                'source_subcategory' => $request->sub_category,
                'brand'              => $request->brand,
                'model'              => $request->model,
                'capacity'           => $request->capacity,
                'warranty'           => $request->warranty,
                'specs'              => json_decode($request->specification, true),
                'images'             => array_values($imagePaths),
                'source_description' => $request->description,
                'price_type'         => $request->price_type ?? 'fixed',
                'source_price'       => $request->service_price,
                'discount_percent'   => $request->discount ?? 0,
                'source_stock'       => $request->source_stock ?? 0,
                'seo_title'          => $request->seo_title,
                'seo_description'    => $request->seo_description,
                'updated_by'         => $userId,
            ];

            $product->update($data);

            return response()->json([
                'code'         => 200,
                'success'      => true,
                'message'      => __('Product updated successfully'),
                'redirect_url' => route('provider.product'),
                'data'         => $product,
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'line'    => $e->getLine(),
                'file'    => $e->getFile()
            ], 500);
        }
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
        $product = NewProduct::find($id);
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
