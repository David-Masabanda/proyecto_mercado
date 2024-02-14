<template>
  <div class="container">
    <h1>Bienvenido</h1>
    <p>Gracias por visitar la pagina del Mercado Mayorista</p>
    <img src="https://www.barcelo.com/guia-turismo/wp-content/uploads/2021/01/sevilla_mercados_pal.jpg" alt="">
    <router-link to="/login"> Regresar </router-link>
    <router-link to="/guia"> Nueva Guia </router-link>
    <router-link to="/busquedaAD" v-if="userRole==ADMINISTRADOR"> Buscar Guias </router-link>

  </div>
</template>

<script>
import * as jose from "jose";

import { validarToken } from '../helpers/ValidarToken'

export default {
  data() {
    return {

      errorMensaje: null,
      userRole:null
    }
  },
  created(){
    this.userRole = this.getUserRole();

  },
  mounted() {
    //this.verificar()
  },
  methods: {
    getUserRole() {
      const token = localStorage.getItem('token'); // Suponiendo que el token está almacenado en el localStorage
      // Decodificar el token y extraer el rol del usuario (puedes implementar tu lógica de decodificación aquí)
      // Por ejemplo, si el token es JWT:
      const decodedToken = jose.decodeJwt(token);
      return decodedToken.role; // Devuelve el rol del usuario
    },
    async verificar() {
      const token = localStorage.getItem('token');
      const valido=await validarToken(JSON.parse(token))
      console.log(valido)
      if(valido){

      }
      else{
        this.$router.push('/login')
      }
    },

    mostrarAlertaError(mensaje) {
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
.container {
  display: grid;
  justify-content: center;
  text-align: center;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
}

h1 {
  color: #3498db;
}

p {
  color: #555;
  font-size: 1.2em;
  line-height: 1.6;
}

img {
  margin-bottom: 20px;
}
</style>