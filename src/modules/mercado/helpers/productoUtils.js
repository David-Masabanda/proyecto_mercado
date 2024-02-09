import axios from "axios"

export const obtenerProductosFachada = async (nombre) => {
    console.log("AXIOS")
    return await obtenerProductosAPI(nombre);

}

const obtenerProductosAPI = async (nombre) => {
    console.log("AXIOS 2")
    const data = axios.get(`http://localhost:8080/API/v1.0/Mercado/productos/${nombre}`).then(r => r.data);
    console.log(data);
    return data;
}

export default obtenerProductosFachada;