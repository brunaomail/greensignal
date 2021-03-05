<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use Auth;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class LoginController extends Controller
{
    function successlogin()
    {
        return view('home');
    }
    function checkLogin(Request $request)
    {
        $this->validate($request, [
            'mail'   => 'required|email',
            'password'  => 'required|alphaNum|min:3'
        ]);

        $user_data = array(
            'mail'  => $request->get('mail'),
            'password' => $request->get('password')
        );

        if (Auth::attempt($user_data)) {
            return response()->json(["status" => true, "msg" => "Logado com sucesso!"]);
        } else {
            return response()->json(["status" => false, "msg" => "Login falhou!"]);
            //return back()->with('error', 'Wrong Login Details');
        }
    }
    function logout()
    {
        Auth::logout();
        //return response()->json(["status" => true, "msg" => "Logado com sucesso!"]);
        return view('login.login');
    }

    public function forgot(Request $request)
    {
        $user = new User;
        $result = $user::where(["cpf" => $request["cpf"]])->get();
        if (count($result)) {
            $new_password = strval($this->str_rand(6));
            $user::where(["id" => $result[0]["id"]])->update(["password" => Hash::make($new_password)]);
            $msg = "A sua nova senha é: " . $new_password;
            $param = [ 
                'to' => "bruno@bafra.com.br",
                'from' => "bruno@bafra.com.br",
                'subject' => 'Recuperação de senha',
                'title' => "",
                "body"  => $msg
            ];
            $res = $this->new_mail($param);
            if($res){
                return response()->json(["status" => true, "msg" => "Email enviado com sucesso!"]);
            }else{
                return response()->json(["status" => false, "msg" => "Falha no envio de email!"]);
            }
            
        } else {
            return response()->json(["status" => false, "msg" => "Cpf não cadastrado!"]);
        }
    }
    private function str_rand(int $length = 16){
        $x = '';
        for($i = 1; $i <= $length; $i++){
            $x .= dechex(random_int(0,255));
        }
        return substr($x, 0, $length);
    }
    public function mail_recuve($msg, $mail)
    {
        //$data = array('name'=>"Virat Gandhi");
        //Mail::to($mail ,'Recuperação de senha')->subject($msg)->send();

        Mail::send(['text' => 'mail'], [], function ($message) {
            $message->to($email)->subject($msg);
            $message->from('bruno@bafra.com.br', 'BRUNO COSTA');
        });

        //echo "HTML Email Sent. Check your inbox.";
    }
    public function new_mail($request)
    {

        $details = [
            'to' => $request["to"],
            'from' => $request["from"],
            'subject' => $request["subject"],
            'title' => $request["title"],
            "body"  => $request["body"]
        ];

        Mail::to("bruno@bafra.com.br")->send(new \App\Mail\NewMail($details));

        if (Mail::failures()) {
            return false;
            /*
            return response()->json([
                'status'  => false,
                'data'    => $details,
                'message' => 'Nnot sending mail.. retry again...'
            ]);
            */
        }
        return true;
        /*
        return response()->json([
            'status'  => true,
            'data'    => $details,
            'message' => 'Your details mailed successfully'
        ]);
        */
    }
}
