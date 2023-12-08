<template>
    <div class="contenedor">
        
        <div class="datos">
            <h1>Datos Personales</h1>
            <label for="">Nombres</label>
            <input v-model="nombres" type="text">
            <label for="">Apellidos</label>
            <input v-model="apellidos" type="text">
            <label for="">Numero de cedula</label>
            <input v-model="cedula" type="text">
            <label for="">Password</label>
            <input v-model="password" type="password">
            <label for="">Destino</label>
            <input v-model="destino" type="text">
            <label for="">Local</label>
            <input v-model="local" type="text">
            <label for="">Plataforma</label>
            <input v-model="plataforma" type="text">
  
            <label for="">Rol</label>
            <input v-model="rol" type="text">

            <button @click="guardarDatos">Guardar</button>
            <router-link to="/login"> Iniciar Sesion </router-link>
        </div>
    </div>
  
</template>

<script>
import {registrarUsuario} from '../helpers/ClienteRegistroAPI'
export default {
    data(){
        return{
            nombres:null,
            apellidos:null,
            cedula:null,
            destino:null,
            local:null,
            plataforma:null,
            password:null,
            rol:null
        }
    },
    methods:{
        async guardarDatos(){
            const data={
                nombres:this.nombres,
                apellidos:this.apellidos,
                cedula:this.cedula,
                destino:this.destino,
                local:this.local,
                plataforma:this.plataforma,
                password:this.password,
                rol:this.rol
            }

            await registrarUsuario(data)
        }
    }
}
</script>

<style scoped>
.contenedor{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.datos{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 10px;
    width: 400px;
    margin-top: 20px;
    padding-bottom: 20px;
}
button{
    margin-top: 10px;
    margin-bottom: 20px;
}
button:hover{
    background-color: rgb(163, 207, 192);
}

</style>