
const taskManager = new TaskManager();
const formTarea= document.getElementById("formTarea");
const inputTareaFecha = document.getElementById("inputTareaFecha");

const hoy = new Date();

const fechaHoy = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;

inputTareaFecha.value = fechaHoy;
//  AGREGAR LAS TAREAS AL TABLERO
function mostrarTareas(){
    const contenedor= document.querySelector(".contenedor-postits");
        contenedor.innerHTML="";
        taskManager.tasks.forEach((task)=>{
            const claseEstado = task.estado === "COMPLETADA" ? "completada" : "porhacer";
            contenedor.innerHTML+=`
            <div class="postit ${claseEstado}" data-id="${task.id}">
                <div class="postit-header justify-content-center">
                    <h3 class="bold">TAREA ${task.id}</h3>
                </div>
                    <h5 class="titulo">${task.tarea}</h5>
                    <p class="descripcion">${task.descripcion}.</p>
                    <p></p>
                    <small><i class="bi bi-calendar3"></i> ${task.fecha}</small>   
                <div class="postit-estado ${claseEstado}">
                    <small><i class="bi bi-calendar3"></i> ${task.estado}</small>
                </div>
                <div class="postit-footer">
                    <button class="btn-completar" type="button" aria-pressed="true">${
        claseEstado==="completada"
            ? `<i class="bi bi-hourglass-top"></i> Pendiente`
            : `<i class="bi bi-check2-circle"></i> Completar`
    }</button>
                    <button class="delete-button" type="button" aria-pressed="true">&times Eliminar</button>
                </div>
                </div>`
            })
        }
formTarea.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputTarea = document.getElementById("inputTarea");
    const inputTareaFecha = document.getElementById("inputTareaFecha");
    const inputTareaEstado = document.getElementById("inputTareaEstado");
    const inputTareaDescripcion = document.getElementById("inputTareaDescripcion");
    
    function getFormData() {
        return {
            tarea: inputTarea.value.trim(),
            fecha: inputTareaFecha.value.trim(),
            estado: inputTareaEstado.value.trim(),
            descripcion: inputTareaDescripcion.value.trim()
        };
    }    
    const data=getFormData();

    function validarCampos(campo){
        if(!campo.value.trim()){
            campo.classList.add("is-invalid");
            campo.classList.remove("is-valid");
            return false;
        } else{
            campo.classList.remove("is-invalid");
            campo.classList.add("is-valid");
            return true;
        }
    }
    const esTareaValida=validarCampos(inputTarea);
    const esFechaValida=validarCampos(inputTareaFecha);
    const esEstadoValida=validarCampos(inputTareaEstado);
    const esDescripcionValida=validarCampos(inputTareaDescripcion);
    function validFormFieldInput(){
        if (!esTareaValida || !esFechaValida || !esEstadoValida || !esDescripcionValida) {
            Swal.fire({
                icon: "error",
                title: "I'm So Sorry... 😱",
                text: "El Formulario Esta Incompleto",
                confirmButtonColor: '#dc3545'
            });

            return false;
      } return true;
    }
    if (!validFormFieldInput()) return;
    console.log(`Tarea:${data.tarea},
Fecha:${data.fecha},
Estado:${data.estado},
Descripcion:${data.descripcion}`);
taskManager.addTask(
    data.tarea,
    data.fecha,
    data.descripcion,
    data.estado
);
localStorage.setItem("tasks", JSON.stringify(taskManager.tasks));
mostrarTareas();

console.log(taskManager.tasks);

        Swal.fire({
                icon: "success",
                title: "¡Excelente!",
                confirmButtonColor: '#7b9e87'
            }).then(() => {
                formTarea.reset();
                inputTareaFecha.value = fechaHoy;
                [inputTarea, inputTareaFecha, inputTareaEstado, inputTareaDescripcion].forEach(campo => {
                    campo.classList.remove("is-valid", "is-invalid");
                });
            });
        
    })
    
    
const contenedorPostits = document.querySelector(".contenedor-postits");

contenedorPostits.addEventListener("click", (event) => {
    const botonEliminar = event.target.closest(".delete-button");

    if (botonEliminar) {
        const tarjeta = botonEliminar.closest(".postit");
        const id = Number(tarjeta.dataset.id);

        taskManager.deleteTask(id);

        localStorage.setItem("tasks", JSON.stringify(taskManager.tasks));

        mostrarTareas();

        return;
    }

    const botonCompletar = event.target.closest(".btn-completar");

    if (botonCompletar) {
        const tarjeta = botonCompletar.closest(".postit");
        const id = Number(tarjeta.dataset.id);

        const tarea = taskManager.tasks.find((task) => task.id === id);

        if (!tarea) return;

        if (tarea.estado === "COMPLETADA") {
            tarea.estado = "POR HACER";
        } else {
            tarea.estado = "COMPLETADA";
        }

        localStorage.setItem("tasks", JSON.stringify(taskManager.tasks));

        mostrarTareas();
    }
});

mostrarTareas();
