<?php

use Illuminate\Support\Facades\Route;
use Modules\Product\app\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Public Routes
// Route::get('/products', [ProductController::class, 'productList'])->name('products.list'); // Moved to main web.php to fix catch-all conflict
Route::get('/productdetail/{slug}', [ProductController::class, 'productDetail'])->name('product.detail');

// Provider Routes (Protected)
Route::middleware(['auth', 'auc'])->prefix('provider')->group(function () {
    // Views
    Route::get('/product', [ProductController::class, 'providerProduct'])->name('provider.product');
    Route::get('/product/create', [ProductController::class, 'providerAddProductIndex'])->name('provider.add.product');
    Route::get('/product/edit/{slug}', [ProductController::class, 'providerEditProduct'])->name('provider.edit.product');

    // API endpoints (used by AJAX mainly)
    Route::post('/product/store', [ProductController::class, 'providerProductStore'])->name('provider.product.store');
    Route::post('/product/update', [ProductController::class, 'providerProductUpdate'])->name('provider.product.update');
    // Datatable Source API
    // Datatable Source API
    Route::post('/product/list', [ProductController::class, 'providerProductIndex'])->name('api.provider.product.list');

    // Status and Delete
    Route::post('/product/status', [ProductController::class, 'status'])->name('provider.product.status');
    Route::post('/product/delete', [ProductController::class, 'deleteProducts'])->name('provider.product.delete');

    // Image Delete
    Route::post('/product/image/delete/{id}', [ProductController::class, 'deleteProductImage'])->name('product.image.delete');

    // Product Details API (for Edit Page)
    Route::post('/product-details/{slug}', [ProductController::class, 'getDetails'])->name('api.provider.product.details');
});

// Admin Routes (Protected)
Route::middleware(['web', 'auth', 'admin.auth'])->prefix('admin')->group(function () {
    Route::get('/products', [ProductController::class, 'adminProduct'])->name('admin.products');

    // API for Datatable
    Route::post('/product/list', [ProductController::class, 'adminProductListApi'])->name('api.admin.product.list');

    // CRUD Views
    Route::get('/add-product', [ProductController::class, 'adminAddProductIndex'])->name('admin.add.product');
    Route::get('/edit-product/{id}', [ProductController::class, 'adminEditProduct'])->name('admin.edit.product'); // Corrected URI from edit/product/{id} to match usage

    // CRUD Actions
    Route::post('/product/store', [ProductController::class, 'adminProductStore'])->name('admin.product.store');
    Route::post('/product/update', [ProductController::class, 'adminProductUpdate'])->name('admin.product.update');
    Route::post('/product/delete', [ProductController::class, 'deleteProducts'])->name('admin.product.delete');
});
