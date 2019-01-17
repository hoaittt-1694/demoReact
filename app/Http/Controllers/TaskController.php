<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
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

    public function destroy(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json($task);
    }
}
