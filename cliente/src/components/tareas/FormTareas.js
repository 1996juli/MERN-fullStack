import React, {  useContext, useState, useEffect}  from 'react';
import proyectoContext from '../../context/proyectos/ProyectoContext'; 
import tareaContext from '../../context/tareas/tareasContext'; 

const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto} = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, actualizarTarea, limpiarTarea} = tareasContext;

    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                nombre:"",
            })
        }
    },[tareaseleccionada]);

    const [tarea, guardarTarea] = useState({
        nombre: '',
    })

    const { nombre } = tarea;

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    // Si no hay proyecto seleccionado extraemos el proyecto sino retorna un null y deja de mostrarse el resto del codigo
    if(!proyecto) return null;

    // Array destructuring para extraer el proyecto actual
    // eslint-disable-next-line no-unused-vars
    const [proyectoActual] =  proyecto;

    const onSubmit = e => {
        e.preventDefault();

        // validar
        if(nombre.trim() === ""){
            validarTarea();
            return;
        }
        // Si es edicion o si es una nueva tarea
        if(tareaseleccionada === null) {
            // Agrega nueva tarea
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            //actualizar tarea existente
            actualizarTarea(tarea);
            limpiarTarea();
        }

        // Obtener y filtrar las tareas del proyecto actual
        //obtenerTareas(proyectoActual.id)

        // reiniciar el form
        guardarTarea({
            nombre: ''
        })
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>

            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null }
        </div>
    );
}
 
export default FormTarea;