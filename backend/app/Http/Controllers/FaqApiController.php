<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Faq\app\Models\Faq;

class FaqApiController extends Controller
{
    public function index (Request $request)
    {
        return response()->json([
            'data' => Faq::select('question', 'answer')->paginate(9)
        ]);
    }
}
