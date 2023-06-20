class UserController {
    constructor(model, view) {
      this.model = model;
      this.view = view;


      this.idSectionInicial = undefined;
      this.idSectionFinal = undefined;
      this.idElementoDrag = undefined;

    }
  
    async getTasks() {
        const tasks = await this.model.getTasks();
        tasks.forEach(task => {
            this.showTask(task);
        });
    }

    async insertTask(textTittle){
        if(textTittle==''){
            this.view.displayAlert();
        }
        else{
            const data = new FormData();
            data.append("title", textTittle);
            data.append("description", "Descripcion");
            data.append("status_id", 1);
            const idTask = await this.model.insertTask(data);
            this.getTask(idTask);
        }
    }

    async getTask(id){
        const data = new FormData();
        data.append("task_id", id);
        const tasks = await this.model.getTask(data);
        tasks.forEach(task => {
            this.showTask(task);
        });
    }

    async updateTaskSection(){
        const data = new FormData();
        data.append("task_id", this.idElementoDrag);
        data.append("new_status_id", this.idSectionFinal);

        const updateResult = await this.model.updateTaskSection(data);
        
        this.view.displayUpdate(this.idElementoDrag,this.idSectionFinal);
    }

    async updateTaskInfo(taskKey,textTittle,textDescription){
        const data = new FormData();
        data.append("task_id", taskKey);
        data.append("title", textTittle);
        data.append("description", textDescription);

        const updateResult = await this.model.updateTaskInfo(data);
        
        this.view.displayUpdate(this.idElementoDrag,this.idSectionFinal);
    }

    async deleteTask(taskId){
        const data = new FormData();
        data.append("task_id", taskId);

        const deleteResult = await this.model.deleteTask(data);
        
        this.view.deleteTask(taskId);
    }

    async showTask(task){
        this.view.displayTask(task);
    }

    setIdSectionInicial(id){
        console.log(id)
        this.idSectionInicial=id;
    }

    setIdSectionFinal(id){
        console.log(id)
        this.idSectionFinal=id;
    }

    setIdElementoDrag(id){
        console.log(id)
        this.idElementoDrag=id;
    }



    getIdSectionInicial(id){
        return this.idSectionInicial;
    }

    getIdSectionFinal(id){
        return this.idSectionFinal;
    }

    getIdElementoDrag(id){
        return this.idElementoDrag;
    }

  }