<?php
namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use \Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function add(Request $request)
    {
        $rules = [
            'name' => 'required|string|min:2|max:250',
            'mail' => 'required|string|min:3|max:250',
            'cpf' => 'required|string|min:2|max:14',
            'password' => 'required|string'
        ];
        $validator = Validator::make($request->all(),$rules);
        if ($validator->fails()) {
            return response()->json(["status"=>false,"msg"=>"Verifique os campos preenchidos"]);
		}else{
            $data = $request->input();
            try{
                $user = new User;
                $user->name = $data["name"];
                $user->cpf = $data["cpf"];
                $user->fone = $data["fone"];
                $user->mail = $data["mail"];
                $user->password = Hash::make($data["password"]);
                $user->save();
                return response()->json(["status"=>true,"msg"=>"Inserido com sucesso."]);
            }catch(Exception $e){
                return response()->json(["status"=>false,"msg"=>$e->getMessage()]);
            }
        }
        
        
    }
    public function list(){
        $user = new User;
        $result = $user::all();
        return response()->json(["status" => true, "data" => $result]);
    }
}