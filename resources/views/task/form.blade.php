    <div id="form_task" class="row">
        <div class="col-6">
            <label for="title" class="form-label">Título</label>
            <input type="text" class="form-control" id="title" v-model="form_data.title">
        </div>
        <div class="col-6">
            <label for="conclude_at" class="form-label">Data Conclusão</label>
            <input type="text" class="form-control" id="conclude_at" v-model="form_data.conclude_at">
        </div>
        <div class="col-6">
            <label for="description" class="form-label">Descrição</label>
            <input type="text" class="form-control" id="description" v-model="form_data.description">
        </div>
        <div class="col-6">
            <label for="status" class="form-label">Status</label>
            <v-select v-model="status" :options="status_options"></v-select>
        </div>
        <div class="col-6">
            <label for="status" class="form-label">Atribuir para:</label>
            <v-select v-model="attach_user" :options="user_options"></v-select>
        </div>
        
        
        <div class="col-12 mt-3">
            <button type="button" class="btn btn-primary btn-block" v-on:click="_click_save">Inserir</button>
            <button type="button" class="btn btn-light btn-block" v-on:click="_click_clear">Limpar</button>
        </div>
    </div>    
