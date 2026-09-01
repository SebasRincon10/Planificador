class TaskManager {
    constructor() {
        const tareasGuardadas = localStorage.getItem("tasks");

        if (tareasGuardadas) {
            this.tasks = JSON.parse(tareasGuardadas);
        } else {
            this.tasks = [];
        }

        if (this.tasks.length > 0) {
            this.currentId = Math.max(
                ...this.tasks.map((task) => task.id)
            );
        } else {
            this.currentId = 0;
        }
    }

    addTask(tarea, fecha, descripcion,estado) {
        this.currentId++;

        const nuevaTarea = {
            id: this.currentId,
            tarea: tarea,
            descripcion: descripcion,
            fecha: fecha,
            estado: estado
        };

        this.tasks.push(nuevaTarea);
    }

    deleteTask(taskId) {
    const newTasks = [];

    for (let task of this.tasks) {
        if (task.id !== taskId) {
            newTasks.push(task);
        }
    }

    this.tasks = newTasks;  
    }
}