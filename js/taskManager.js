class TaskManager{
    constructor(currentId=0){
        this.tasks=[];
        this.currentId=currentId;
    }
    addTask(tarea,fecha,descripcion){
        this.currentId++;
        const nuevaTarea = {
            id: this.currentId,
            tarea: tarea,
            descripcion: descripcion,
            fecha: fecha,
            estado: 'porHacer'
        }; 
        this.tasks.push(nuevaTarea);
    }
}