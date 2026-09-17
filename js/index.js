const taskManager = new TaskManager();
const formTarea = document.getElementById("formTarea");
const inputTareaFecha = document.getElementById("inputTareaFecha");

// Establecer fecha por defecto (Hoy)
const hoy = new Date();
const fechaHoy = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;
inputTareaFecha.value = fechaHoy;

// RENDERIZAR TAREAS
async function mostrarTareas() {
    const contenedor = document.querySelector(".contenedor-postits");
    contenedor.innerHTML = "";
    
    await taskManager.load();

    taskManager.tasks.forEach((task) => {
        const claseEstado = task.estado === "COMPLETADA" ? "completada" : "porhacer";
        contenedor.innerHTML += `
        <div class="postit ${claseEstado}" data-id="${task.id}">
            <div class="postit-header justify-content-center">
                <h3 class="bold">TAREA ${task.id}</h3>
            </div>
            <h5 class="titulo">${task.tarea}</h5>
            <p class="descripcion">${task.descripcion || 'Sin descripción'}.</p>
            <small><i class="bi bi-calendar3"></i> ${task.fecha}</small>   
            <div class="postit-estado ${claseEstado}">
                <small><i class="bi bi-tag"></i> ${task.estado}</small>
            </div>
            <div class="postit-footer mt-2">
                <button class="btn-completar btn btn-sm btn-outline-primary" type="button">
                    ${claseEstado === "completada"
                        ? `<i class="bi bi-hourglass-top"></i> Pendiente`
                        : `<i class="bi bi-check2-circle"></i> Completar`}
                </button>
                <button class="delete-button btn btn-sm btn-outline-danger" type="button">&times; Eliminar</button>
            </div>
        </div>`;
    });
}

// EVENTO ENVIAR FORMULARIO (POST)
formTarea.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const inputTarea = document.getElementById("inputTarea");
    const inputTareaEstado = document.getElementById("inputTareaEstado");
    const inputTareaDescripcion = document.getElementById("inputTareaDescripcion");
    
    function validarCampos(campo) {
        if (!campo.value.trim()) {
            campo.classList.add("is-invalid");
            campo.classList.remove("is-valid");
            return false;
        } else {
            campo.classList.remove("is-invalid");
            campo.classList.add("is-valid");
            return true;
        }
    }

    const esTareaValida = validarCampos(inputTarea);
    const esFechaValida = validarCampos(inputTareaFecha);
    const esEstadoValida = validarCampos(inputTareaEstado);
    const esDescripcionValida = validarCampos(inputTareaDescripcion);

    if (!esTareaValida || !esFechaValida || !esEstadoValida || !esDescripcionValida) {
        Swal.fire({
            icon: "error",
            title: "Campos incompletos",
            text: "Por favor llena todos los campos obligatorios.",
            confirmButtonColor: '#dc3545'
        });
        return;
    }

    try {
        await taskManager.addTask(
            inputTarea.value.trim(),
            inputTareaFecha.value.trim(),
            inputTareaDescripcion.value.trim(),
            inputTareaEstado.value.trim()
        );

        Swal.fire({
            icon: "success",
            title: "¡Tarea Guardada!",
            confirmButtonColor: '#7b9e87'
        }).then(() => {
            formTarea.reset();
            inputTareaFecha.value = fechaHoy;
            [inputTarea, inputTareaFecha, inputTareaEstado, inputTareaDescripcion].forEach(c => c.classList.remove("is-valid", "is-invalid"));
            mostrarTareas();
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error de servidor",
            text: "No se pudo guardar la tarea en la base de datos.",
            confirmButtonColor: '#dc3545'
        });
    }
});

// EVENTOS DE CLICK EN TABLERO (DELETE Y PUT)
const contenedorPostits = document.querySelector(".contenedor-postits");

contenedorPostits.addEventListener("click", async (event) => {
    const tarjeta = event.target.closest(".postit");
    if (!tarjeta) return;
    
    const id = Number(tarjeta.dataset.id);
    const tarea = taskManager.tasks.find(t => t.id === id);

    // BOTÓN ELIMINAR (DELETE)
    const botonEliminar = event.target.closest(".delete-button");
    if (botonEliminar) {
        const exito = await taskManager.deleteTask(id);
        if (exito) await mostrarTareas();
        return;
    }

    // BOTÓN CAMBIAR ESTADO (PUT)
    const botonCompletar = event.target.closest(".btn-completar");
    if (botonCompletar && tarea) {
        const nuevoEstado = tarea.estado === "COMPLETADA" ? "POR HACER" : "COMPLETADA";
        
        await taskManager.updateTask(id, {
            tarea: tarea.tarea,
            descripcion: tarea.descripcion,
            fecha: tarea.fecha,
            estado: nuevoEstado
        });

        await mostrarTareas();
    }
});

// Cargar lista al iniciar la aplicación
document.addEventListener("DOMContentLoaded", mostrarTareas);