import axios from "axios"
import { getApiUrl  } from "../../utils/apiUtil";


export const obtenerProductosFachada = async (datosBuscar) => {
    console.log(datosBuscar)
    return await obtenerProductosAPI(datosBuscar);

}

const obtenerProductosAPI = async (datosBuscar) => {
    const url=getApiUrl("guias/buscarAD")
    const data = axios.get(`http://localhost:8080/API/v1.0/Mercado/guias/buscarAD`,datosBuscar).then(r => r.data);
    console.log(data);
    return data;
}

export default obtenerProductosFachada;