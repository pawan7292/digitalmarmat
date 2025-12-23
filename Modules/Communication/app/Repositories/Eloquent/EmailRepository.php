<?php

namespace Modules\Communication\app\Repositories\Eloquent;

use Modules\Communication\app\Repositories\Contracts\EmailInterface;
use Modules\Communication\app\Helpers\MailConfigurator;
use Modules\Communication\app\Mail\Samplemail;
use Illuminate\Support\Facades\Mail;

class EmailRepository implements EmailInterface
{
    public function sendEmail(array $data): array
    {
        MailConfigurator::configureMail();
        
        Mail::to($data['to_email'])->send(new Samplemail([
            'message' => $data['content'],
            'subject' => $data['subject'],
            'attachment' => $data['attachment'] ?? null,
        ]));

        return [
            'code' => 200,
            'message' => __('Email sent successfully.'),
            'data' => []
        ];
    }

    public function sendBulkEmail(array $emails, array $data): array
    {
        MailConfigurator::configureMail();
        
        foreach ($emails as $email) {
            Mail::to($email)->send(new Samplemail([
                'message' => $data['content'],
                'subject' => $data['subject'],
                'attachment' => $data['attachment'] ?? null,
            ]));
        }

        return [
            'code' => 200,
            'message' => __('Bulk emails sent successfully.'),
            'data' => []
        ];
    }
}