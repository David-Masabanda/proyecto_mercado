<template>
    <div class="contenedor">
      <div class="datos1">
          <h1>Guia Remision</h1>
          <label for="">Fecha</label>
          <span>{{ fecha}}</span>
  
          <label for="">Nombre</label>
          <input v-model="nombre" type="text">
          <label for="">Cedula</label>
          <input v-model="cedula" type="text">
  
          <label for="">Destino</label>
          <input v-model="destino" type="text">
          <label for="">Local</label>
          <input v-model="local" type="text">
          <label for="">Plataforma</label>
          <input v-model="plataforma" type="text">
      </div>
      <div class="datos2">
          <h1>Punto de partida</h1>
          <label for="">Provincia</label>
            <select v-model="provincia" @change="actualizarCantones">
            <option v-for="p in provincias" :key="p.codigo">{{ p.nombre }}</option>
            </select>
          <label for="">Canton</label>
            <select v-model="canton" @change="actualizarParroquias" :disabled="!provincia">
            <option v-for="c in cantones" :key="c.codigo">{{ c.nombre }}</option>
            </select>
          <label for="">Parroquia</label>
            <select v-model="parroquia" :disabled="!canton">
            <option v-for="a in parroquias" :key="a.codigo">{{ a.nombre }}</option>
            </select>
      </div>

      <div class="datos3">
          <table class="tabla">
                  <thead>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Presentacion</th>
                      <th><button>Añadir</button></th>
                  </thead>
                  <tbody>
                      <tr v-for="producto in productos" :key="producto.id">
                          <td>{{ producto.nombre }}</td>
                          <td>{{ producto.cantidad }}</td>
                          <td>{{ producto.presentacion }}</td>
                      </tr>
                  </tbody>
  
              </table>
      </div>
  
      <button>Guardar</button>
    </div>
  </template>
  
  <script>
  import moment from 'moment';
  import datosjs from '../store/datos.json' 


  export default {
      data(){
          return{
              fecha:null,
              nombre:null,
              cedula:null,

              destino:"Mercado Mayorista Quito",
              local:"HOR-22",
              plataforma:"PLA-01",

              parroquia:"",
              canton:"",
              provincia:"",

              productos:[],
              datosJson: datosjs,

              provincias: [],
              cantones: [],
              parroquias: [],
              datosProvincia:null,
              datosCanton:null,
          }
      },

      methods:{

        actualizarCantones() {
            console.log('Provincia seleccionada:', this.provincia);
            this.datosProvincia = this.datosJson.find(p => p.nombre === this.provincia);
            this.cantones = this.datosProvincia?.cantones ? Object.values(this.datosProvincia.cantones) : [];
            console.log('Prueba:', this.datosProvincia);
        },

        actualizarParroquias() {
            console.log('Cantón seleccionado:', this.canton);
            this.datosCanton = Object.values(this.datosProvincia.cantones).find(c => c.nombre === this.canton);     
            this.parroquias = this.datosCanton?.parroquias ? Object.values(this.datosCanton.parroquias) : [];
            console.log('Prueba 2:', this.datosCanton);
        },

        listaDatos() {
            this.provincias = this.datosJson.map(p => ({ codigo: p.codigo, nombre: p.nombre }));
        }

    },

      mounted(){
          this.fecha= moment().format('YYYY-MM-DD HH:mm:ss');
          this.listaDatos(); 
      }
      
}
  </script>
  
  <style scoped>
  .datos1, .datos2{
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
   
      h1{
        grid-column: span 2;
        text-align: center;
      }
      label{
          font-size: 18px;
          padding: 0px;
      }
      .datos3{
        display: flex;
        flex-direction: column;
        margin-left: 200px;
        margin-right: 200px;
      }

      .tabla {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        }

        /* Estilo de las celdas de la tabla */
        .tabla th, .tabla td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
        }

        /* Cambio de color en filas alternas */
        .tabla tr:nth-child(even) {
        background-color: #f2f2f2;
        }
  
  </style>