@extends('layouts.system')

@section('jscript')
<script type="text/javascript" src="{{ URL::asset('js/task/list.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/task/form.js') }}"></script>
@endsection

@section('content')
<ul class="nav nav-tabs" id="taskTab" role="tablist">
    <li class="nav-item" role="presentation">
        <button class="nav-link active" id="list-tab" data-bs-toggle="tab" data-bs-target="#list" type="button" role="tab" aria-controls="list" aria-selected="false">Listagem</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="cadastro-tab" data-bs-toggle="tab" data-bs-target="#cadastro" type="button" role="tab" aria-controls="cadastro" aria-selected="true">Cadastro</button>
    </li>
    
</ul>
<div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="list" role="tabpanel" aria-labelledby="list-tab">
        @include('task.list')
    </div>
    <div class="tab-pane fade" id="cadastro" role="tabpanel" aria-labelledby="cadastro-tab">
        @include('task.form')        
    </div>
    
</div>



<div>

</div>
<div>

</div>
@endsection