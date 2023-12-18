import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";


//Fachada
export const verificarUsuario= async(token)=>{
    return await verificarUsuarioAPI(token)
}

//Consumir
const verificarUsuarioAPI= async (token)=>{
    const url=getApiUrl("auth/validarToken")
    await axios.post(url, token).then(r => r.data)
    }
