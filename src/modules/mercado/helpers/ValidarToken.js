import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";


//Fachada
export const validarToken= async(token)=>{
    return await validarTokenAPI(token)
}

//Consumir
const validarTokenAPI= async (token)=>{
    const url=getApiUrl("auth/validarToken")
    return await axios.post(url, token).then(r => r.data)
    }
