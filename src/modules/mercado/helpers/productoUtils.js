import axios from "axios"
import cedulaService  from "../../utils/tokenUtils";
import { getApiUrl  } from "../../utils/apiUtil";

const config = {
    headers: {
        Authorization: `Bearer ${JSON.parse(cedulaService.getToken()).jwt}`
    }
};
export const obtenerProductosNombreFachada = async (nombre) => {
    return await obtenerProductosNombreAPI(nombre);

}

export const obtenerProductosFachada = async () => {
    return await obtenerProductosAPI();

}
const obtenerProductosNombreAPI = async (nombre) => {
    const url=getApiUrl("productos/")
    const data = axios.get(url+nombre).then(r => r.data);
    return data;
}


const obtenerProductosAPI = async () => {
    const url=getApiUrl("productos")
    const data = axios.get(url,config).then(r => r.data);
    return data;
}
//export default obtenerProductosFachada;