import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/ProyectoContext';
import tareaContext from '../../context/tareas/tareasContext'; 

const Tarea = ({tarea}) => {    

    const tareasContext = useContext(tareaContext);
    const {eliminarTarea,  actualizarTarea, guardarTareaActual } = tareasContext;

    const proyectosContext = useContext(proyectoContext);
    const { proyecto} = proyectosContext;

    const [proyectoActual] =  proyecto;

    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
    }

    const cambiarEstado = tarea =>{
        if(tarea.estado){
            tarea.estado = false;
        }  else {
            tarea.estado = true;
        }

        actualizarTarea(tarea);
    }
    
    const seleccionarTarea = tarea =>{
        guardarTareaActual(tarea);
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre} </p>

            <div className="estado">
                {tarea.estado 
                ?  
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={()=> cambiarEstado(tarea)}
                        >Completo</button>
                    )
                : 
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={()=> cambiarEstado(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>

            <div className="acciones">
                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick={()=>seleccionarTarea(tarea)}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;