<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Support\Facades\Auth;

class TaskController extends BaseController
{
    public function index()
    {
        $tasks = Auth::user()->tasks()->get();

        return response()->json($tasks);
    }

    public function show($id)
    {
        return Auth::user()->tasks()->find($id);
    }

    public function store(StoreTaskRequest $request)
    {
        $task = Auth::user()->tasks()->create($request->all());

        return response()->json($task, 201);
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $this->authorize('update', $task);
        $task->update($request->only(['title']));

        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);
        $task->delete();

        return response()->json($task);
    }
}
