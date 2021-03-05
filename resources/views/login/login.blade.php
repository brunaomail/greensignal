@extends('layouts.layout')
@section('jscript')
<script type="text/javascript" src="{{ URL::asset('js/login.js') }}"></script>
@endsection
@section('content')
<div id="form_login" class="row">
    <div class="col-md-6 offset-md-3">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                            <label>Email</label>
                            <input type="text" class="form-control" v-model="form_data.mail">
                        </div>
                        <div class="form-group">
                            <label>Senha</label>
                            <input type="password" class="form-control" v-model="form_data.password">
                        </div>
                        <div class="form-group d-grid mt-3">
                            <button type="button" class="btn btn-primary" v-on:click="_click_login">Acessar</button>
                        </div>
                        <div class="form-group">
                            <a href="{{ url('login/forgot') }}" class="btn btn-link">Esqueci minha senha</a>
                            <a href="{{ url('user') }}" class="btn btn-link">Cadastrar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection