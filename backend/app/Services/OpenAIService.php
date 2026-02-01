<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class OpenAIService
{
    protected $apiKey;
    protected $apiUrl;

    public function __construct()
    {
       // $this->apiKey = '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';
       $this->apiKey = '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'; 
       $this->apiUrl = 'https://api.openai.com/v1/chat/completions';
    }

    public function chat(array $messages)
    {
        $response = Http::withToken($this->apiKey)
            ->post($this->apiUrl, [
                'model' => 'gpt-4', // Specify the model (e.g., gpt-3.5-turbo, gpt-4)
                'messages' => $messages,
            ]);

        if ($response->successful()) {
            return $response->json();
        }

        throw new \Exception('Error communicating with OpenAI: ' . $response->body());
    }
}
