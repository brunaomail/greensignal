Vue.component('btn-edit', {
    template: [
        '<div>',
        '<button class="btn btn-primary" v-on:click="_onClickEdit" title="Editar"><i class="fa fa-pencil"></i></button>&nbsp;',
        '<button class="btn btn-danger" v-on:click="_onClickDelete" title="Deletar"><i class="fa fa-trash"></i></button>',
        '</div>'
    ].join(''),
    data: function () {
        return {
            target: []
        }
    },
    methods: {
        _onClick: function (event) {
            event.preventDefault();
            let objSearch = JSON.stringify(this.$attrs.row);
            let key_result = null;
            if (this.$parent.data !== undefined) {
                $.each(this.$parent.data, function (key, obj) {
                    if (JSON.stringify(obj) === objSearch) {
                        key_result = key;
                    }
                });
            }
            return key_result;
        },
        _onClickEdit: function (event) {
            let pos = this._onClick(event);
            if (this.$root.editTask !== undefined) {
                this.$root.editTask(pos);
            }
        },
        _onClickDelete: function (event) {
            let pos = this._onClick(event);
            if (this.$root.deleteTask !== undefined) {
                this.$root.deleteTask(pos);
            }
        }
    }
});

var listTask = new Vue({
    el: '#list_task',
    mixins: [myTableList],
    props: ['row'],
    data: function () {
        return {
            columns: [
                { title: 'Titulo', field: 'title', sortable: true },
                { title: 'Descrição', field: 'description' },
                { title: 'Data Conclusão', field: 'conclude_at' },
                { title: 'Status', field: 'status' },
                { title: '#', tdComp: 'btn-edit' }
            ],
            showSearch: false
        }
    },
    methods: {
        add_list: function (objTask) {

            let pos = listTask.data.length;
            var obj = {
                //date : general.date_format(new Date(objLog.data), "dd/mm/YYYY hh:mm"),
                title: objTask.title,
                status: objTask.status,
                description: objTask.description,
                conclude_at: objTask.conclude_at,
                data: Object.assign({}, objTask)
            }

            listTask.addList(obj);
        },
        getTask: function () {
            let self = this;
            $.ajax({
                type: "GET",
                url: baseUrl + "/task/getList",
                dataType: "json",
                success: function (data) {
                    if (data.status) {
                        $.each(data.data, function (key, obj) {
                            self.add_list(obj);
                        });
                    }
                    //console.log(data);
                },
                error: function (data) {
                    console.log(data)
                }
            });
        },
        editTask: function (pos) {
            if (typeof form_task === "object" && form_task.editTask !== "undefined") {
                let data = this.data[pos];
                form_task.editTask(data);
            }
            //console.log(pos);
        },
        deleteTask: function (pos) {
            let obj = this.data[pos];

            Swal.fire({
                title: 'Deletetar tarefa?',
                text: 'Deseja realmente excluir a tarefa?',
                icon: 'question',
                confirmButtonText: 'Excluir',
                showCancelButton: true,
                preConfirm : function(){
                    //console.log(obj);
                    $.ajax({
                        type : "POST",
                        url : baseUrl + "/task/delete",
                        dataType : "json",
                        data : {
                            id : obj.data.id,
                            _token : _token
                        },
                        success : function(data){
                            if(data.status){
                                location.reload();
                            }
                            console.log(data);
                        }
                    });
                }

              })
              //Swal.getConfirmButton();
        }
        
    },
    mounted: function () {
        this.getTask();
    }
});