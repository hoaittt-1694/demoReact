<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends BaseController
{
    public function index()
    {
       return Task::all();
    }

    public function show($id)
    {
        return Task::find($id);
    }

    public function store(StoreTaskRequest $request)
    {
        $task = Task::create($request->all());

        return response()->json($task, 201);
    }

    public function update(UpdateTaskRequest $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->update($request->all());

        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json($task);
    }
}
