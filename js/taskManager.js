class TaskManager {
    constructor() {
        this.apiUrl = 'http://localhost:8080/api/tasks';
        this.tasks = [];
    }

    // GET: Obtener todas las tareas del backend
    async load() {
        try {
            const res = await fetch(this.apiUrl);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            this.tasks = await res.json();
            return this.tasks;
        } catch (error) {
            console.error("Error al cargar tareas:", error);
            return [];
        }
    }

    // POST: Guardar una nueva tarea
    async addTask(tarea, fecha, descripcion, estado) {
        const nuevaTarea = { tarea, fecha, descripcion, estado };
        try {
            const res = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaTarea)
            });
            if (!res.ok) throw new Error(`Error al crear: ${res.status}`);
            return await res.json();
        } catch (error) {
            console.error("Error al guardar tarea:", error);
            throw error;
        }
    }

    // PUT: Actualizar una tarea existente
    async updateTask(id, datos) {
        try {
            const res = await fetch(`${this.apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            if (!res.ok) throw new Error(`Error al actualizar: ${res.status}`);
            return await res.json();
        } catch (error) {
            console.error("Error al actualizar tarea:", error);
            throw error;
        }
    }

    // DELETE: Eliminar una tarea por ID
    async deleteTask(taskId) {
        try {
            const res = await fetch(`${this.apiUrl}/${taskId}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error(`Error al eliminar: ${res.status}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar tarea:", error);
            return false;
        }
    }
}