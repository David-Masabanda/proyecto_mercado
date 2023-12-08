<template>
    <div class="contenedor">
        <div class="datos">
            <h1>Iniciar Sesión</h1>
            <img src="https://cdn-icons-png.flaticon.com/512/6073/6073873.png" alt="">
            <label for="">Usuario</label>
            <input v-model="userName" type="text">
            <label for="">Contraseña</label>
            <input v-model="password" type="text">
            
            <button @click="verificar">Ingresar</button>
            <router-link to="/registro"> Registrarse </router-link>
        </div>
    </div>
  
</template>

<script>
import Swal from 'sweetalert2';
import router from '@/router'
import{verificarUsuario} from '../helpers/ClienteIngresarAPI'
export default {
    data(){
        return{
            userName:null,
            password:null,
            errorMensaje:null,
        }
    },
    methods:{
        async verificar(){
            const data={
                userName:this.userName,
                password:this.password,
            }
            try {
                const esperar=await verificarUsuario(data)
                console.log("Login exitoso")
                router.push('/inicio')
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    this.mostrarAlertaError(this.errorMessage);                
                } else {
                    this.errorMessage = 'Error al intentar iniciar sesión';
                }
            }
        },

        mostrarAlertaError(mensaje){
            Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Credenciales erroneas',
            });
        }
    }

}
</script>

<style scoped>
    .datos{
        display: grid;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        grid-template-columns: repeat(2, 1fr);
        width: 30%;
    }

    button{
        margin-top: 10px;
        margin-bottom: 10px;
        grid-column: span 2;
        width: 50%;
        margin-left: auto;
        margin-right: auto;    
      }
    img{
      grid-column: span 2;
      max-width: 50%;
      margin-bottom: 10px;
      margin-left: auto;
      margin-right: auto;
      padding-bottom: 10px;

    }
    h1{
      grid-column: span 2;
      text-align: center;
    }
    label{
        font-size: 18px;
        padding: 0px;
    }
</style>