import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";


//Fachada
export const verificarUsuario= async(bodyUsuario)=>{
    return await verificarUsuarioAPI(bodyUsuario)
}

//Consumir
const verificarUsuarioAPI= async (boduUsuario)=>{
    const url=getApiUrl("auth/authenticate")
    const token=await axios.post(url, boduUsuario).then(r => r.data)
    //Guardar iten en el localStorage
    console.log(token)
    localStorage.setItem('token',JSON.stringify(token));
}


