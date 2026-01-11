<?php

namespace Modules\Product\app\Repositories\Contracts;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

interface ProductRepositoryInterface
{
    public function setDefault(Request $request): array;
    public function delete(Request $request): array;
    public function index(Request $request): array;
    public function store(Request $request): JsonResponse | RedirectResponse;
    public function update(Request $request): RedirectResponse;
    public function providerProductIndex(Request $request): array;
    public function getDetails(Request $request, string $slug): array;
    public function providerProductStore(Request $request): JsonResponse;
    public function verifyProduct(Request $request): array;
    public function providerProductUpdate(Request $request): JsonResponse;
    public function deleteProductImage(string $id): array;
    public function deleteSlot(string $id): array; // Might not be needed for products but keeping for interface consistency or stock mgmt
    public function deleteAdditionalProducts(string $id): array; // Rename?
    public function deleteProducts(Request $request): array;
    public function status(Request $request): array;
    public function checkUnique(Request $request): bool;
    public function checkEditUnique(Request $request): bool;
    public function providerSub(Request $request): array; // Subscription related
    public function providerSubApi(Request $request): array;
    public function translate(Request $request): array;
    public function deleteImage(Request $request): array;
    public function checkCoupon(Request $request): array;
}
