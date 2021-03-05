var myTableList = {
    template: [
        '<div class="table-responsive">',
            "<div v-if=\"countRow > 0\">",
                '<br>',
                '<div v-if="showSearch">',
                    '<hr>',
                '</div>',
                '<datatable v-bind="$data">',
                    '<div v-if="showSearch" class="col-lg-4 col-md-12" style="float: right">',
                        '<div class="input-group">',
                            '<div class="input-group-prepend">',
                                '<button class="btn btn-default" type="button">',
                                    '<i class="fas fa-search"></i>',
                                '</button>',
                            '</div>',
                            '<input class="form-control" type="text" placeholder="Pesquisar" v-model="fieldSearch"/>',
                        '</div>',
                    '</div>',
                '</datatable>',
            "</div>",
            "<div v-else>",
                "<div></div>",
            "</div>",

            '<br>',
        '</div>'
    ].join(''),
    data : function(){
        return {
            columns : [],
            data : [],
            dataHide : [],
            keyEdit : '',
            keyView : '',
            total: 0,
            query: {},
            formData : {},
            HeaderSettings: false, // whether to render `HeaderSettings`
            Pagination: false,
            fieldSearch : "",
            showSearch : true
        }
    },
    computed : {
        isEdit : function(){
            return (this.keyEdit || this.keyEdit === 0);
        },
        countRow : function(){
            return this.data.length;
        }
    },
    watch : {
        fieldSearch : function(newValue, oldValue){
            let arrAux = [];
            $.each(this.data, function(keyRow, objRow){
                arrAux.splice(arrAux.length, 0, objRow);
            });
            $.each(this.dataHide, function(key, obj){
                arrAux.splice(arrAux.length, 0, obj);
            });
            this.dataHide.splice(0, this.dataHide.length);
            this.removeAll();
            let arrFind = [];
            let self = this;
            if(newValue){
                $.each(arrAux, function(keyRow, objRow){
                    let flgFind = false;
                    $.each(objRow, function(key, value){
                        if(typeof value === "string"){
                            if(value.indexOf(newValue) > -1 && !flgFind){
                                self.addList(objRow);
                                flgFind = true;
                            }
                        }
                    });
                    if(!flgFind){
                        self.dataHide.splice(self.dataHide.length, 0, objRow);
                    }
                });
            }else{
                 $.each(arrAux, function(keyRow, objRow){
                     self.addList(objRow);
                 });
            }
        },

    },
    methods : {

        viewList : function(pos){
            this.keyView = pos;
        },
        addList : function(obj){
            if(this.keyEdit || this.keyEdit === 0){
                this.data.splice(this.keyEdit, 1, obj);
            }else{
                this.data.splice(this.data.length, 0, obj);
            }
            this.keyEdit = '';
        },
        editList : function(pos){
            this.keyEdit = pos;
        },
        removeList : function(pos){
            general.confirmBox.vue.title = "Remover";
            general.confirmBox.vue.msg = "Deseja excluir realmente?";
            let self = this;
            general.confirmBox.vue.setFunc_callback(function(){
                self.data.splice(pos, 1);
                self.keyEdit = '';
                general.indexingId(self.data, 'id');
            });
            general.confirmBox.show();
        },
        removeAll : function(){
            this.data.splice(0, this.data.length);
        },
        getListData : function(){
            var result = $.map(this.data, function(obj){
                return Object.assign({},obj.data);
            });
            return result;
        },
        orderRows : function(column, order){
            let func;
            if(order == "desc"){
                func = function(b,a){
                    return (a[column] < b[column]) ? -1 : ((a[column] > b[column])? 1 : 0);
                }
            }else{
                func = function(a,b){
                    return (a[column] < b[column]) ? -1 : ((a[column] > b[column])? 1 : 0);
                }
            }
            this.data.sort(func);
        }
    },
    mounted : function(){
        //HACKER PARA FUNCIONAR O BOTÃO DE CONFIGURAÇÃO DE COLUNAS
        $('div[name=HeaderSettings] .dropdown-toggle').attr('data-toggle','dropdown');
        $('div[name=HeaderSettings] .dropdown-toggle').attr('id','headerSettingsDropdown');
        $('div[name=HeaderSettings] .dropdown-menu').attr('aria-labelledby','headerSettingsDropdown');

        $("body").on("click", "[name='HeadSort']",function(e){
            setTimeout(function(){
                $(".fa.fa-sort-desc").addClass("fa-sort-down");
                $(".fa.fa-sort-asc").addClass("fa-sort-up");
            },100);
        });
    }
};
var myTableListPagination = {
    template: [
        '<div class="table-responsive">',
        "<div v-if=\"1 > 0\">",
        '<datatable v-bind="$data">',
        '<div class="col-md-12 col-lg-4" style="float: right">',
        '<div class="input-group">',
        '<div class="input-group-prepend">',
        '<button class="btn btn-default" type="button">',
        '<i class="fas fa-search"></i>',
        '</button>',
        '</div>',
        '<input class="form-control" type="text" placeholder="Pesquisar" v-model="fieldSearch"/>',
        '</div>',
        '</div>',
        '</datatable>',
        "</div>",
        "<div v-else>",
        "<v-alert-list-empty msg='Lista vazia'></v-alert-list-empty>",
        "</div>",
        '<br>',
        '</div>'
    ].join(''),
    data : function(){
        return {
            columns : [],
            data : [],
            dataHide : [],
            keyEdit : '',
            keyView : '',
            total: 0,
            query: {},
            rows : [],
            formData : {},
            HeaderSettings: true, // whether to render `HeaderSettings`
            Pagination: true,
            fieldSearch : "",
            selection: [],
            pageSizeOptions: [10, 20, 50],
            summary : {}
        }
    },
    computed : {
        isEdit : function(){
            return (this.keyEdit || this.keyEdit === 0);
        },
        countRow : function(){
            return this.data.length;
        }
    },
    watch : {
        query : {
            handler : function(query){
                this.handlerQueryChange(query);
                this.orderRows(query.sort, query.order);
            },
            deep : true
        },
        fieldSearch : function(newValue, oldValue){
            let arrAux = [];
            $.each(this.rows, function(keyRow, objRow){
                arrAux.splice(arrAux.length, 0, objRow);
            });
            $.each(this.dataHide, function(key, obj){
                arrAux.splice(arrAux.length, 0, obj);
            });
            this.dataHide.splice(0, this.dataHide.length);
            this.removeAll();
            let arrFind = [];
            let self = this;
            if(newValue){
                $.each(arrAux, function(keyRow, objRow){
                    let flgFind = false;
                    $.each(objRow, function(key, value){
                        if(typeof value === "string"){
                            if(value.indexOf(newValue) > -1 && !flgFind){
                                self.addList(objRow);
                                flgFind = true;
                            }
                        }
                    });
                    if(!flgFind){
                        self.dataHide.splice(self.dataHide.length, 0, objRow);
                    }
                });
            }else{
                $.each(arrAux, function(keyRow, objRow){
                    self.addList(objRow);
                });
            }
        }
    },
    methods : {
        handlerQueryChange : function(query){
            let arr = this.rows.slice(query.offset, parseInt(query.limit + query.offset));
            this.removeDataAll();
            let self = this;
            $.each(arr, function(key, obj){
                self.addData(obj);
            });
        },
        setData : function(){
            this.handlerQueryChange({limit : 10, offset : 0});
        },
        viewList : function(pos){
            this.keyView = pos;
        },
        addData : function(obj){
            this.data.splice(this.data.length, 0, obj);
        },
        addList : function(obj){
            if(this.keyEdit || this.keyEdit === 0){
                this.rows.splice(this.keyEdit, 1, obj);
            }else{
                this.rows.splice(this.rows.length, 0, obj);
            }
            this.keyEdit = '';
            this.total = this.rows.length;
            this.setData();
        },
        editList : function(pos){
            this.keyEdit = pos;
        },
        removeList : function(pos){
            general.confirmBox.vue.title = "Remover";
            general.confirmBox.vue.msg = "Deseja excluir realmente?";
            let self = this;
            general.confirmBox.vue.setFunc_callback(function(){
                self.data.splice(pos, 1);
                self.keyEdit = '';
                general.indexingId(self.rows, 'id');
            });
            general.confirmBox.show();
        },
        removeAll : function(){
            this.rows.splice(0, this.rows.length);
        },
        removeDataAll : function(){
            this.data.splice(0, this.data.length);
        },
        getListData : function(){
            var result = $.map(this.rows, function(obj){
                return Object.assign({},obj.data);
            });
            return result;
        },
        orderRows : function(column, order){
            let func;
            if(order == "desc"){
                func = function(b,a){
                    if(general.date_format(a[column]) !== null){
                        let val_a = new Date(general.date_format(a[column], "YYYY-mm-dd hh:mm:ss"));
                        let val_b = new Date(general.date_format(b[column], "YYYY-mm-dd hh:mm:ss"));
                        return (val_a < val_b) ? -1 : ((val_a > val_b)? 1 : 0);
                    }else{
                        return (a[column] < b[column]) ? -1 : ((a[column] > b[column])? 1 : 0);
                    }

                }
            }else{
                func = function(a,b){
                    if(general.date_format(a[column]) !== null){
                        let val_a = new Date(general.date_format(a[column], "YYYY-mm-dd hh:mm:ss"));
                        let val_b = new Date(general.date_format(b[column], "YYYY-mm-dd hh:mm:ss"));
                        return (val_a < val_b) ? -1 : ((val_a > val_b)? 1 : 0);
                    }else{
                        return (a[column] < b[column]) ? -1 : ((a[column] > b[column])? 1 : 0);
                    }

                }
            }
            this.rows.sort(func);
        },
        getDataJson : function(){
            return JSON.stringify(this.rows);
        },
        setDataJson : function(string){
            let self = this;
            let arr = JSON.parse(string);
            $.each(arr, function(key, obj){
                self.rows.splice(self.rows.length, 0, obj);
            });
        }
    },
    mounted : function(){
        //HACKER PARA FUNCIONAR O BOTÃO DE CONFIGURAÇÃO DE COLUNAS
        $('div[name=HeaderSettings] .dropdown-toggle').attr('data-toggle','dropdown');
        $('div[name=HeaderSettings] .dropdown-toggle').attr('id','headerSettingsDropdown');
        $('div[name=HeaderSettings] .dropdown-menu').attr('aria-labelledby','headerSettingsDropdown');

        $("body").on("click", "[name='HeadSort']",function(e){
            setTimeout(function(){
                $(".fa.fa-sort-desc").addClass("fa-sort-down");
                $(".fa.fa-sort-asc").addClass("fa-sort-up");
            },100);
        });
    }
};
var componentDefault = {
    inject : ['$validator'],
    methods: {
        onValidate : function(){
            this.$validator.validateAll();
        }
    },
    mounted : function(){
        bus.$on('validate', this.onValidate);
    }
};
var myFormDefault = {
    data : function(){return {flg_form_valid: false};},
    methods : {
        formValid : function(){
            let self = this;
            let flg_verify_form = true;
            $.each(this.$validator.fields.items, function(key, obj){
                if(obj.flags.required && (obj.value === null || obj.value === "" )){
                    flg_verify_form = false;
                }
            });
            if(flg_verify_form){
               this.validate(function(flg){
                   if(flg){
                       self.flg_form_valid = true;
                   }else{
                       self.flg_form_valid = false;
                   }
               });
            }
        },
        validate : function(func){
            this.$validator.validate().then(func);
        }
    }
};