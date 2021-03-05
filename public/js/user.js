var user = new Vue({
    el: "#form_user",
    data : {
        form_data : {
            name : "",
            mail : "",
            fone : "",
            cpf : "",
            password : "",
            confirm_password : "",
            _token : _token
        }
    },
    methods : {
        _click_save : function(event){
            this.ajax_save();
        },
        _click_clear : function(event){
            this.form_data.name = "";
            this.form_data.mail = "";
            this.form_data.fone = "";
            this.form_data.cpf = "";
            this.form_data.password = "";
            this.form_data.confirm_password = "";
        },
        ajax_save : function(){
            let self = this;
            $.ajax({
                type : "POST",
                url : baseUrl + "/user/add",
                dataType : "json",
                data : self.form_data,
                success : function(data){
                    if(data.status){
                        Swal.fire({
                            title: 'Usuário cadastrado com sucesso!',
                            text: 'O usuário foi cadastrado com sucesso.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                          });
                          self._click_clear();
                    }else{
                        Swal.fire({
                            title: 'Usuário não cadastrado!',
                            text: 'Verifique se todos os campos foram preenchidos corretamente, tente novamente.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                          });
                    }
                    
                },
                error : function(data){
                    Swal.fire({
                        title: 'Ocorreu uma falha!',
                        text: 'Ocorreu uma falha inesperada. Tente novamente.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                      });
                    console.log(data);
                }
                
            });
        }
        
    },
    mounted : function(){
    }
});
