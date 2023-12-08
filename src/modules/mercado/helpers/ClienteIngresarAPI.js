import axios from "axios";

//Fachada
export const verificarUsuario= async(bodyUsuario)=>{
    return await verificarUsuarioAPI(bodyUsuario)
}

//Consumir
const verificarUsuarioAPI= async (boduUsuario)=>{
    const token=await axios.post(`http://localhost:8080/auth/authenticate`, boduUsuario).then(r => r.data)
    console.log(token)
}


