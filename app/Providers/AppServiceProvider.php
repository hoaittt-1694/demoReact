<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->bootDBLogger();
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Log database queries and bindings to the standard log
     * Only when in debug mode and not running unit tests
     */
    protected function bootDBLogger()
    {
        if (config('app.debug_log_queries') && !$this->app->runningUnitTests()) {
            DB::listen(function ($query) {
                Log::channel('queries')->debug($query->sql, [
                    'time' => $query->time . ' ms', // milisecond
                    'bindings' => $query->bindings,
                ]);
            });
        }
    }
}
