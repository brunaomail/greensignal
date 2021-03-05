@extends('layouts.layout')
@section('jscript')
<script type="text/javascript" src="{{ URL::asset('js/forgot.js') }}"></script>
@endsection
@section('content')
<div id="form_forgot" class="row">
    <div class="col-md-6 offset-md-3">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                            
                        </div>
                        <div class="form-group">
                            <label>CPF</label>
                            <input type="text" class="form-control" v-model="form_data.cpf">
                        </div>
                        <div class="form-group d-grid mt-3">
                            <button type="button" class="btn btn-primary" v-on:click="_click_forgot">Recuperar senha</button>
                        </div>
                        <a href="{{ url('login') }}" class="btn btn-link">Voltar para login</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection