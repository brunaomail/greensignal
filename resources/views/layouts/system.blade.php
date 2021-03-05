<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>Laravel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <link rel="stylesheet" href="{{url('font-awesome/css/font-awesome.min.css')}}">
    <link rel="stylesheet" href="https://unpkg.com/vue-select@latest/dist/vue-select.css">
</head>

<body>
    @if(isset(Auth::user()->mail))

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/home">Home</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/task">Tarefas</a>
                    </li>
                    
                </ul>
                <form class="d-flex">
                <!--
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                    -->
                    <a class="btn btn-secondary" href="{{ url('/login/logout') }}">Sair</a>
                </form>
            </div>
        </div>
    </nav>
    <!--
    <div class="alert alert-danger success-block">
        <strong>Welcome {{ Auth::user()->mail }}</strong>
        <br />
        <a href="{{ url('/login/logout') }}">Logout</a>
    </div>
    -->
    <div class="container mt-3">
        @yield('content')
    </div>
    @else
    <script>
        window.location = "/login";
    </script>
    @endif



    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    
    <script src="https://unpkg.com/vue@latest"></script>
    <!--<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>-->
    <!--<script src="{{ URL::asset('js/components/vue.js') }}"></script>-->
    <script src="https://unpkg.com/vue-select@latest"></script>
    <!--<script src="{{ URL::asset('js/components/vue-select.js') }}"></script>-->
    <script src="{{ URL::asset('js/components/vue-datatable.min.js') }}"></script>

    <script src="{{ URL::asset('js/components/mixins.js') }}"></script>
    <script src="{{ URL::asset('js/components/general.js') }}"></script>
    
    <script>
        var baseUrl = '<?php echo url('/'); ?>';
        let _token = $('meta[name="csrf-token"]').attr('content');
    </script>
    @yield('jscript')
</body>

</html>