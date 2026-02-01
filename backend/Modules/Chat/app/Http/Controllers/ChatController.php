<?php
namespace Modules\Chat\app\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Modules\Chat\app\Repositories\Contracts\ChatRepositoryInterface;

class ChatController extends Controller
{
    protected $chat;

    public function __construct(ChatRepositoryInterface $chat)
    {
        $this->chat = $chat;
    }

    public function adminChat(Request $request): View | JsonResponse
    {
        $data = $this->chat->adminChat($request);
        if ($request->is_ajax == 1) {
            return response()->json($data);
        }
        return view('chat::admin.chat', $data);
    }

    public function providerChat(Request $request): View | JsonResponse
    {
        $data = $this->chat->providerChat($request);
        if ($request->is_ajax == 1) {
            return response()->json($data);
        }
        return view('chat::provider.chat', $data);
    }

    public function userChat(Request $request): View | JsonResponse
    {
        $data = $this->chat->userChat($request);
        if ($request->is_ajax == 1) {
            return response()->json($data);
        }
        return view('chat::user.chat', $data);
    }

    public function sendChat(Request $request): JsonResponse
    {
        $result = $this->chat->sendChat($request);
        return response()->json($result);
    }

    public function fetchMessages(Request $request)
    {
        return $this->chat->fetchMessages($request);
    }
}