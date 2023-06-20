window.addEventListener("DOMContentLoaded", () => {
  const model = new UserModel();
  const view = new UserView();
  const controller = new UserController(model, view);

  let textInputInitial = '';
  let textDescriptionInitial = '';

  let elementOutside = false;

  //Mostrar tareas existentes al iniciar el programa
  controller.getTasks();

  //Agregar una tarea
  const inputTaskTittle = document.querySelector(".inputTask");
  const buttonTaskTittle = document.querySelector(".btnNew");

  inputTaskTittle.addEventListener("input", () => {
    view.hideAlert();
  });

  buttonTaskTittle.addEventListener("click", () => {
    const textInput = inputTaskTittle.value;
    inputTaskTittle.value = "";
    controller.insertTask(textInput);
  });

  //Actualizar una tarea al moverla
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    section.addEventListener("dragstart", handleDragStart);
    section.addEventListener("dragenter", handleDragEnter);
    section.addEventListener("dragleave", handleDragLeave);
    section.addEventListener("dragover", handleDragOver);
    section.addEventListener("dragend", handleDragEnd);
    section.addEventListener("drop", handleDrop);
  });

  function handleDragStart(event) {
    if (event.target.classList.contains("articleTask")) {
      controller.setIdElementoDrag(event.target.getAttribute("key"));
      controller.setIdSectionInicial(
        event.target.parentElement.getAttribute("key")
      );

      // event.target.classList.add('hold');
      setTimeout(() => event.target.classList.add("invisible"), 0);
    }
  }

  function handleDragEnter(event) {
    event.preventDefault();
    elementOutside = false;
    if (event.target.classList.contains("buttonDescription")) {
      controller.setIdSectionFinal(
        event.target.parentElement.parentElement.parentElement.getAttribute(
          "key"
        )
      );
    } else if (event.target.classList.contains("descriptionTask")) {
      controller.setIdSectionFinal(
        event.target.parentElement.parentElement.getAttribute("key")
      );
    } else if (event.target.classList.contains("tittleTask")) {
      controller.setIdSectionFinal(
        event.target.parentElement.parentElement.getAttribute("key")
      );
    } else if (event.target.classList.contains("section")) {
      controller.setIdSectionFinal(event.target.getAttribute("key"));
    }
  }

  function handleDragLeave(event) {
    elementOutside = true;
  }

  function handleDragOver(event) {
    event.preventDefault();
    // console.log(event.target)
  }

  function handleDragEnd(event) {
    if (elementOutside || controller.getIdSectionFinal() == "1") {
      event.target.classList.remove("invisible");
    }
  }

  function handleDrop(event) {
    if (
      controller.getIdSectionInicial() != "1" &&
      controller.getIdSectionFinal() == "1"
    ) {
      event.target.classList.remove("invisible");
      return;
    }

    controller.updateTaskSection();
  }

  //Ocultar o mostrar opciones de editar y eliminar tarea
  sections.forEach((section) => {
    section.addEventListener("click", (event) => {
      if (event.target.classList.contains("taskOptions")) {
        event.target.nextElementSibling.classList.toggle(
          "ocultodivTaskOptions"
        );
      }
    });
  });

  //Estilos y evitar que se escriban muchos caracteres en el textarea
  sections.forEach((section) => {
    section.addEventListener("input", (event) => {
      if (event.target.classList.contains("textDescription")) {
        console.log("Event textarea")
        var contenido = event.target.value.trim();
        var lineas = contenido.split("");

        // event.target.style.textAlign = "center";
        console.log(lineas.length)

        if(lineas.length<23){
            event.target.style.paddingTop = '10%'
        }
        else if(lineas.length>=23 && lineas.length<66){
            event.target.style.paddingTop = '5%' 
        }
        else if (lineas.length>=66){
          event.target.style.paddingTop = '3%' 
        }
        
        var maxLength = 94;
        if (event.target.value.length > maxLength) {
            event.target.value = event.target.value.slice(0, maxLength);
        }
      }
    });
  });

  sections.forEach((section) => {
    section.addEventListener("click", (event) => {
      if (event.target.classList.contains("Delete")) {
        const taskKey = event.target.parentElement.parentElement.getAttribute('key');
        console.log(taskKey)
        controller.deleteTask(taskKey);
      }
    });
  });

  sections.forEach((section) => {
    section.addEventListener("click", (event) => {
      if (event.target.classList.contains("Edit")) {
        const taskCard = event.target.parentElement.parentElement;
        taskCard.removeAttribute("draggable");
        taskCard.classList.add("articleTaskEdit");

        const modalEdit=document.querySelector(".modalTask");
        modalEdit.classList.add("modalEdit");

        const editOptions = taskCard.querySelector(".divEditOptions");
        editOptions.style.display = "block";

        const taskOptionIcon = taskCard.querySelector(".taskOptions");
        taskOptionIcon.style.display="none";
        


        const inputTittle = taskCard.querySelector(".inputTittle");
        inputTittle.removeAttribute("disabled");
        inputTittle.focus({ focusVisible: true });
        inputTittle.setSelectionRange(inputTittle.value.length, inputTittle.value.length);
        textInputInitial=inputTittle.value;
        // inputTittle.classList.add("elementActive");

        const textDescription = taskCard.querySelector(".textDescription");
        textDescription.removeAttribute("disabled");
        textDescriptionInitial=textDescription.value;

        // textDescription.focus();
        
        // textDescription.classList.add("elementActive");

        const divTaskOptions = taskCard.querySelector(".divTaskOptions");
        divTaskOptions.classList.add("ocultodivTaskOptions");
      }
    });
  });

  sections.forEach((section) => {
    section.addEventListener("click", (event) => {
      if (event.target.classList.contains("saveTaskButton")) {
        const taskCard = event.target.parentElement.parentElement;
        const taskKey = taskCard.getAttribute("key");

        const inputTittle = taskCard.querySelector(".inputTittle");

        const textDescription = taskCard.querySelector(".textDescription");

        controller.updateTaskInfo(taskKey,inputTittle.value,textDescription.value);

        taskCard.setAttribute("draggable",'true');
        taskCard.classList.remove("articleTaskEdit");

        const modalEdit=document.querySelector(".modalTask");
        modalEdit.classList.remove("modalEdit");

        const editOptions = taskCard.querySelector(".divEditOptions");
        editOptions.style.display = "none";

        const taskOptionIcon = taskCard.querySelector(".taskOptions");
        taskOptionIcon.style.display="block";
        
        inputTittle.setAttribute("disabled","true");

        textDescription.setAttribute("disabled","true");

        const divTaskOptions = taskCard.querySelector(".divTaskOptions");
        divTaskOptions.classList.add("ocultodivTaskOptions");


        
      }

      if (event.target.classList.contains("cancelTaskButton")) {
        console.log("cancel edit")
        const taskCard = event.target.parentElement.parentElement;
        console.log(taskCard)

        taskCard.setAttribute("draggable",'true');
        taskCard.classList.remove("articleTaskEdit");

        const modalEdit=document.querySelector(".modalTask");
        modalEdit.classList.remove("modalEdit");

        const editOptions = taskCard.querySelector(".divEditOptions");
        editOptions.style.display = "none";

        const taskOptionIcon = taskCard.querySelector(".taskOptions");
        taskOptionIcon.style.display="block";
        


        const inputTittle = taskCard.querySelector(".inputTittle");
        inputTittle.setAttribute("disabled","true");
        inputTittle.value=textInputInitial;


        const textDescription = taskCard.querySelector(".textDescription");
        textDescription.setAttribute("disabled","true");
        textDescription.value=textDescriptionInitial;

        const divTaskOptions = taskCard.querySelector(".divTaskOptions");
        divTaskOptions.classList.add("ocultodivTaskOptions");
      }
    });
  });
});
