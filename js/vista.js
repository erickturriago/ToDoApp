class UserView {
  constructor() {
    this.mapSections = new Map();
    this.mapSections.set("1", "sectionNuevo");
    this.mapSections.set("2", "sectionEnProceso");
    this.mapSections.set("3", "sectionEnRevision");
    this.mapSections.set("4", "sectionFinalizado");

    this.mapColours = new Map();
    this.mapColours.set("1", "#57B549");
    this.mapColours.set("2", "#008E97");
    this.mapColours.set("3", "#D0DD3B");
    this.mapColours.set("4", "#5A645A");
  }

  displayTask(task) {
    const section = document.querySelector(
      `#${this.mapSections.get(task.status_id)}`
    );
    section.innerHTML += `
            <article class="articleTask" key=${task.task_id} draggable="true">
                
                <div class="tittleTask" style="background-color:${this.mapColours.get(
                  task.status_id
                )}">
                    <input type="text" class="inputTittle" value="${task.title}" disabled style="background-color:${this.mapColours.get(
                        task.status_id
                      )}"> 
                </div>
                <div class="descriptionTask">
                    <textarea class="textDescription" disabled>${task.description}</textarea>
                </div>
                <i class="fa-solid fa-ellipsis-vertical taskOptions"></i>
                <div class="divTaskOptions ocultodivTaskOptions">
                    <a class="option Edit">Editar</a>
                    <a class="option Delete">Eliminar</a>
                </div>
                <div class="divEditOptions" style="display:none">
                  <button class="cancelTaskButton">Cancel</button>
                  <button class="saveTaskButton">Save</button>
                </dvi>
            </article>
        `;
  }

  displayAlert() {
    const alertMessage = document.querySelector(".message");
    alertMessage.textContent = "Debe ingresar un titulo";
  }

  hideAlert() {
    const alertMessage = document.querySelector(".message");
    alertMessage.textContent = "";
  }

  displayUpdate(idElementDrag, idSectionEnd) {
    const allTasks = document.querySelectorAll(".articleTask");
    // console.log(allTasks)
    const task = Array.from(allTasks).filter((task) => {
      return task.getAttribute("key") == idElementDrag;
    });

    const allSections = document.querySelectorAll(".section");
    const section = Array.from(allSections).filter((section) => {
      return section.getAttribute("key") == idSectionEnd;
    });

    section[0].appendChild(task[0]);
    task[0].classList.remove("invisible");
    const divTitle = task[0].querySelector(".tittleTask")
    divTitle.style.backgroundColor = this.mapColours.get(idSectionEnd);
    const inputTittle = divTitle.querySelector(".inputTittle");
    inputTittle.style.backgroundColor = this.mapColours.get(idSectionEnd);
  }

  deleteTask(taskId){
    const allTasks = document.querySelectorAll(".articleTask");
    const task = Array.from(allTasks).filter((task) => {
      return task.getAttribute("key") == taskId;
    });

    task[0].parentElement.removeChild(task[0]);
  }
}
