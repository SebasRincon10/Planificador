
const formTarea= document.getElementById("formTarea");

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
Swal.fire({
        icon: "success",
        title: "¡Excelente!",
        confirmButtonColor: '#7b9e87'
    }).then(() => {
        formTarea.reset();
        [inputTarea, inputTareaFecha, inputTareaEstado, inputTareaDescripcion].forEach(campo => {
            campo.classList.remove("is-valid", "is-invalid");
        });
    });
})
