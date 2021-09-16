import React, { useReducer } from 'react';
import TareaContext from './tareasContext';
import TareaReducer from './tareasReducer';

import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA,
} from '../../types';

import clienteAxios from '../../config/axios';

const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null,
    }    

    const [state, dispatch] = useReducer(TareaReducer, initialState);

    const obtenerTareas = async (proyecto) => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: {proyecto} })
            //console.log(resultado.data.tareas);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error)
        }
    }

    const agregarTarea = async tarea => {
        //console.log(tarea)
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            //console.log(resultado)
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const eliminarTarea = async (id, proyecto) =>{
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: {proyecto} });
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            }) 
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarTarea = async tarea =>{
    //console.log(tarea);
        try {
           const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea) 
            //console.log(resultado);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea,
            })
        } catch (error) {
            console.log(error);
        }      
    }
    
    const guardarTareaActual = tarea =>{
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea,
        })
    }

    const limpiarTarea = () =>{
        dispatch({
            type: LIMPIAR_TAREA,
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto : state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;


