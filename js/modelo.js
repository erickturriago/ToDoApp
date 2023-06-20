class UserModel {
  constructor() {
    //   this.controller = new AbortController();
    //   this.signal = this.controller.signal;
  }

  async getTasks() {
    try {
      const response = await fetch("php/getTasks.php");
      const tasks = await response.json();
      return tasks;
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
      return [];
    }
  }

  async getTask(data) {
    try {
      const response = await fetch("php/getTask.php", {
        method: "POST",
        body: data,
      });
      const tasks = await response.json();
      return tasks;
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
      return [];
    }
  }

  async insertTask(data) {
    try {
      const response = await fetch("php/insertTask.php", {
        method: "POST",
        body: data,
      });

      const idInsertado = await response.json();
      return idInsertado;
    } catch (error) {
      console.error("Error al insertar una tarea:", error);
      return [];
    }
  }

  async updateTaskSection(data) {
    try {
      const response = await fetch("php/updateTaskSection.php", {
        method: "POST",
        body: data,
      });

      const idActualizado = await response.text();
      return idActualizado;
    } catch (error) {
      console.error("Error al actualizar una tarea:", error);
      return [];
    }
  }

  async updateTaskInfo(data) {
    try {
      const response = await fetch("php/updateTaskInfo.php", {
        method: "POST",
        body: data,
      });

      const idActualizado = await response.text();
      return idActualizado;
    } catch (error) {
      console.error("Error al actualizar una tarea:", error);
      return [];
    }
  }

  async deleteTask(data) {
    try {
      const response = await fetch("php/deleteTask.php", {
        method: "POST",
        body: data,
      });
      const idEliminado = await response.text();
      return idEliminado;
    } catch (error) {
      console.error("Error al eliminar una tarea:", error);
      return [];
    }
  }
}
