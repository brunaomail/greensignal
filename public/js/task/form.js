Vue.component('v-select', VueSelect.VueSelect);

var form_task = new Vue({
    el: "#form_task",
    data: {
        form_data: {
            id: "",
            title: "Titulo 1",
            conclude_at: "2021-03-04 12:34:00",
            description: "Descrição da atividade.",
            status: "",
            attach_user_id : null,
            _token: _token
        },
        arr_users : [],
        attach_user : null,
        status : null
    
    },
    watch : {
        attach_user : function(val, old){
            if(val !== null){
                this.form_data.attach_user_id = val.value;
            }else{
                this.form_data.attach_user_id = null;
            }
            
        },
        status : function(val, old){
            if(val !== null){
                this.form_data.status = val.value;
            }
        }
    },
    computed : {
        user_options : function(){
            let result = [];
            $.each(this.arr_users, function(key, obj){
                result.splice(result.length, 0, {"label":obj.name,"value":obj.id});
            });
            return result;
        },
        status_options : function(){
            return [
                {"label":"Aberto","value":"Aberto"},
                {"label":"Em desenvolvimento","value":"Em desenvolvimento"},
                {"label":"Concluído","value":"Concluido"},
                {"label":"Em atraso","value":"Em atraso"},
            ];
        }
    },
    methods: {
        _click_save: function (event) {
            this.postAdd();
        },
        _click_clear: function (event) {
            this.form_data.id = "";
            this.form_data.title = "";
            this.form_data.conclude_at = "";
            this.form_data.description = "";
            this.form_data.status = "";

        },
        editTask: function (obj) {
            general.setFieldEditList(this.form_data, obj.data);
            $("#cadastro-tab").tab('show');
        },
        getUsers: function(){
            let self = this;
            $.ajax({
                type : "GET",
                url : baseUrl + "/user/list",
                dataType : "json",
                success : function(data){
                    if(data.status){
                        self.arr_users.splice(0,self.arr_users.length);
                        $.each(data.data, function(key, obj){
                            self.arr_users.splice(self.arr_users.length, 0, obj);
                        });
                    }
                    console.log(data);
                },
                error : function(data){
                    console.log(data);
                }
            });
        },
        postAdd: function () {
            let self = this;
            $.ajax({
                type: "POST",
                url: baseUrl + "/task/add",
                dataType: "json",
                data: self.form_data,
                success: function (data) {
                    if (data.status) {
                        Swal.fire({
                            title: 'Tarefa inserida!',
                            text: 'A tarefa foi inserida com sucesso.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                        self._click_clear();
                    }else{
                        Swal.fire({
                            title: 'Tarefa não inserida!',
                            text: 'Não foi possível inserir a atividade. Verifique todos os campos e tente novamente.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                },
                error: function (data) {
                    Swal.fire({
                        title: 'Ocorreu uma falha!',
                        text: 'Não foi possível inserir a atividade. Verifique todos os campos e tente novamente.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            });
        }
    },
    mounted : function(){
        this.getUsers();
    }

});