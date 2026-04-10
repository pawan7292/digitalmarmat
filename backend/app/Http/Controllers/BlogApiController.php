<?php

namespace App\Http\Controllers;

use Modules\Blogs\app\Models\BlogPost;
use App\Http\Resources\BlogApiResource;
use App\Http\Resources\BlogDetailsResource;
use Illuminate\Http\Request;

class BlogApiController extends Controller
{
    public function index () {
        $blogs = BlogPost::with('categoryRelation')->paginate();
        // return response()->json([
        //     'blogs' => $blogs
        // ]);
        return BlogApiResource::collection($blogs);
    }

    public function show (string $slug) {
        $blogs = BlogPost::with('category')->where('slug', $slug)->firstOrFail();;
        // return response()->json([
        //     'blogs' => $blogs
        // ]);
        return new BlogDetailsResource($blogs);
    }
}
