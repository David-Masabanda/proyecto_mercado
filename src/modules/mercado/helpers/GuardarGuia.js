import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";

//Fachada
export const saveGuia = (bodyGuia) => {
    console.log("Guardar Guia")
    guardarGuiaAPI(bodyGuia)
}

//Consumir
const guardarGuiaAPI=(bodyGuia)=>{
    const url=getApiUrl("guias/save")
    const guia=axios.post(url,bodyGuia).then(r=>r.data)
    console.log(guia)
}

export default saveGuia