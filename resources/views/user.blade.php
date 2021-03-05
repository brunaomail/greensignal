@extends('layouts.layout')
@section('jscript')
    <script type="text/javascript" src="{{ URL::asset('js/user.js') }}"></script>
@endsection
@section('content')
    <div id="form_user" class="row">
        <div class="col-6">
            <label for="name" class="form-label">Nome</label>
            <input type="text" class="form-control" id="name"v-model="form_data.name">
        </div>
        <div class="col-6">
            <label for="mail" class="form-label">Email</label>
            <input type="text" class="form-control" id="mail" v-model="form_data.mail">
        </div>
        <div class="col-6">
            <label for="fone" class="form-label">Fone</label>
            <input type="text" class="form-control" id="fone" v-model="form_data.fone">
        </div>
        <div class="col-6">
            <label for="cpf" class="form-label">CPF</label>
            <input type="text" class="form-control" id="cpf" v-model="form_data.cpf">
        </div>
        <div class="col-6">
            <label for="password" class="form-label">Senha</label>
            <input type="password" class="form-control" id="password" v-model="form_data.password">
        </div>
        <div class="col-6">
            <label for="confirm_password" class="form-label">Confirmar Senha</label>
            <input type="password" class="form-control" id="confirm_password" v-model="form_data.confirm_password">
        </div>
        <div class="col-6 mt-3">
            <button type="button" class="btn btn-primary btn-block" v-on:click="_click_save">Cadastrar</button>
            <button type="button" class="btn btn-light btn-block" v-on:click="_click_clear">Limpar</button>
        </div>
    </div>    
@endsection