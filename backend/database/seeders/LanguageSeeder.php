<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\GlobalSetting\app\Models\Language;


class LanguageSeeder extends Seeder
{
    public function run()
    {
        Language::updateOrCreate(
            ['is_default' => 1],
            ['name' => 'English', 'code' => 'en', 'status' => 1]
        );
    }
}