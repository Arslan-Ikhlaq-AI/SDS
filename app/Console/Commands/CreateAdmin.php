<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

#[Signature('admin:create {email : The email address the admin signs in with} {--name=Admin : The name shown in the panel}')]
#[Description('Give someone access to the admin panel')]
class CreateAdmin extends Command
{
    /**
     * Execute the console command.
     *
     * A new admin receives a link to choose their own password, so no password
     * is ever typed here. An account that has not confirmed its email address
     * is refused, because anyone could have registered it.
     */
    public function handle(): int
    {
        $email = Str::lower((string) $this->argument('email'));

        if (Validator::make(['email' => $email], ['email' => ['required', 'email']])->fails()) {
            $this->components->error('Please give a valid email address.');

            return self::FAILURE;
        }

        $existingUser = User::query()->where('email', $email)->first();

        if ($existingUser !== null) {
            return $this->promote($existingUser);
        }

        $admin = new User([
            'name' => (string) $this->option('name'),
            'email' => $email,
            'password' => Str::password(40),
        ]);
        $admin->is_admin = true;
        $admin->markEmailAsVerified();

        $status = Password::sendResetLink(['email' => $email]);

        $status === Password::RESET_LINK_SENT
            ? $this->components->info("Admin created. A link to choose a password was sent to {$email}.")
            : $this->components->warn('Admin created, but the email could not be sent. Use "Forgot your password?" on the login page.');

        return self::SUCCESS;
    }

    /**
     * Give an existing, confirmed account access to the admin panel.
     */
    private function promote(User $user): int
    {
        if (! $user->hasVerifiedEmail()) {
            $this->components->error('That account has not confirmed its email address yet.');

            return self::FAILURE;
        }

        $user->is_admin = true;
        $user->save();

        $this->components->info("{$user->email} can now use the admin panel.");

        return self::SUCCESS;
    }
}
