import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";

//Fachada
export const registrarUsuario = (bodyUsuario) => {
    console.log("Registrar Usuario")
    registrarUsuarioAPI(bodyUsuario)
}

//Consumir
const registrarUsuarioAPI=(bodyUsuario)=>{
    const url=getApiUrl("usuario/registro")
    const usuario=axios.post(url,bodyUsuario).then(r=>r.data)
    console.log(usuario)
}