import axios from "axios"
import { getApiUrl  } from "../../utils/apiUtil";
import cedulaService  from "../../utils/tokenUtils";
const config = {
    headers: {
        Authorization: `Bearer ${JSON.parse(cedulaService.getToken()).jwt}`
    }
};
export const obtenerProductosFechaFachada = async (datosBuscar) => {
    return await obtenerProductosFechaAPI(datosBuscar);

}

const obtenerProductosFechaAPI = async (datosBuscar) => {
    const url=getApiUrl("guias/buscarAD")
   
    console.log(config)
    const data = axios.post(url,datosBuscar,config).then(r => r.data);
    return data;
}

