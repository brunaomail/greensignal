var login = new Vue({
    el : "#form_login",
    data : {
        form_data : {
            mail : "",
            password : "",
            _token : _token
        }
    },
    methods : {
        _click_login : function(){
            this.postLogin();
        },
        postLogin : function(){
            let self = this;
            $.ajax({
                type : "POST",
                url : baseUrl + "/login",
                dataType : "json",
                data : self.form_data,
                success : function(data){
                    if(data.status){
                        window.location = "/home";
                    }else{
                        Swal.fire({
                            title: 'Login Inválido!',
                            text: 'Verifique se o email e a senha foram digitados corretamente.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                          });
                    }

                },
                error : function(data){
                    Swal.fire({
                        title: 'Falha!',
                        text: 'Ocorreu uma falha no sistema, tente novamente!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                      });
                    //console.log(data);
                }
            });
        }
    },
    mounted : function(){
        //alert('aaaaa');
    }
});