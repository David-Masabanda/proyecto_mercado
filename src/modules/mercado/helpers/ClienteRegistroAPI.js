import axios from "axios";

//Fachada
export const registrarUsuario = (bodyUsuario) => {
    console.log("Registrar Usuario")
    registrarUsuarioAPI(bodyUsuario)
}

//Consumir
const registrarUsuarioAPI=(bodyUsuario)=>{
    const usuario=axios.post(`http://localhost:8080/usuario/registro`,bodyUsuario).then(r=>r.data)
    console.log(usuario)
}