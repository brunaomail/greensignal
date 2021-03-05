var logForgot = new Vue({
    el: "#form_forgot",
    data: {
        form_data : {
            cpf : "",
            _token : _token
        }
    },
    methods : {
        _click_forgot : function(event){
            this.postForgot();
        },
        postForgot : function(){
            let self = this;
            $.ajax({
                type : "POST",
                url : baseUrl + "/login/forgot",
                dataType : "json",
                data : self.form_data,
                success : function(data){
                    if(data.status){
                        Swal.fire({
                            title: 'Email enviado!',
                            text: 'Você receberá em alguns instantes um e-mail com sua senha!',
                            icon: 'success',
                            confirmButtonText: 'OK'
                          });
                    }else{
                        Swal.fire({
                            title: 'CPF não cadastrado!',
                            text: 'O CPF informado, não foi encontrado!',
                            icon: 'error',
                            confirmButtonText: 'OK'
                          });
                    }
                    
                },
                error : function(data){
                    Swal.fire({
                        title: 'Falha no sistema!',
                        text: 'Ocorreu uma falha no sistema. Tente novamente!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                      });
                }

            });
        }
    }
});