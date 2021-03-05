<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use \Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\Task;
use Auth;

class TaskController extends Controller
{
    public function add(Request $request)
    {

        $data = $request->input();
        try {
            $task = new Task;


            if (!empty($data["id"])) {
                $task::where(["id" => $data["id"]])
                ->update([
                    "title"=>$data["title"], 
                    "conclude_at"=>$data["conclude_at"],
                    "description"=>$data["description"],
                    "status"=>$data["status"],
                    "attach_user_id"=>$data["attach_user_id"]
                ]);
                //$task->id = $data["id"];

            } else {
                $task->title = $data["title"];
                $task->conclude_at = $data["conclude_at"];
                $task->user_id = Auth::user()->id;

                $task->description = $data["description"];
                $task->status = $data["status"];
                $task->attach_user_id = $data["attach_user_id"];
                $task->save();
            }

            return response()->json(["status" => true, "msg" => "Inserido com sucesso."]);
        } catch (Exception $e) {
            return response()->json(["status" => false, "msg" => $e->getMessage()]);
        }
    }
    public function list()
    {
        $task = new Task;
        $result = $task::where(["user_id" => Auth::user()->id])->orWhere(["attach_user_id" => Auth::user()->id])->get();
        return response()->json(["status" => true, "data" => $result]);
    }
    public function delete(Request $request){
        $data = $request->input();
        $task = Task::destroy($data['id']);
        return response()->json(["status" => true, "msg" => "Deletado com sucesso."]);
    }
}
