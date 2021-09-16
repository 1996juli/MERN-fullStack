/* eslint-disable import/no-anonymous-default-export */

import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from "../../types";

export default (state, action) => {
    switch(action.type) { 
        case MOSTRAR_ALERTA:
            return {
                alerta: action.payload
            }
        case OCULTAR_ALERTA:
            return {
                alerta: null
            }
        default:
            return state;
    }
}