<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Artisan;

return new class extends Migration
{
    /**
     * Give the first admin access to the panel on the live website. Creates the
     * account when it is missing; an existing confirmed one keeps its password.
     */
    public function up(): void
    {
        if (! app()->isProduction()) {
            return;
        }

        rescue(fn (): int => Artisan::call('admin:create', [
            'email' => 'anns@sdsrealestate.ae',
            '--name' => 'ANNS',
        ]));
    }
};
