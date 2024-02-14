<template>
  <div class="datos">
    <div class="busqueda">
      <FloatLabel>
        <Calendar id="fechaInicioB" v-model="fechaInicio" />
        <label for="fechaInicioB">Fecha Inicio</label>
      </FloatLabel>

      <FloatLabel>
        <Calendar id="fechaFinB" v-model="fechaFin" />
        <label for="fechaFinB">Fecha Fin</label>
      </FloatLabel>

      <FloatLabel>
        <Dropdown
        
          v-model="selectedProducto"
          :options="productos"
          filter
          :virtualScrollerOptions="{ lazy: true, itemSize: 20, showLoader: true, loading: loading }"
          optionValue="nombre"
          optionLabel="nombre"
          placeholder="Seleccione productos"
          class="w-full md:w-14rem"
        >
        </Dropdown>

        <!-- <InputText id="nombreB" v-model="nombre" /> -->
        <!-- <label for="nombreB">Nombre</label> -->
      </FloatLabel>

      <Button @click="buscarPorFechas">Buscar</Button>
    </div>

    <div class="resultado">
      <DataTable
        :value="productosFecha"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        tableStyle="min-width: 50rem"
      >
        <Column field="nombre" header="Nombre" style="width: 25%"></Column>
        <Column field="cantidad" header="Cantidad" style="width: 25%"></Column>
        <Column
          field="presentacion"
          header="Presentacion"
          style="width: 25%"
        ></Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import {obtenerProductosFachada} from "../helpers/productoUtils.js";
import {obtenerProductosFechaFachada} from "../helpers/BusquedaAD.js";
export default {
  data() {
    return {
      fechaInicio: "",
      fechaFin: "",
      nombre: "",
      selectedProducto:null,
      productos: [],
      productosFecha: [],

    };
  },
  mounted() {
    this.obtenerProductos()
  },
  methods: {
    async obtenerProductos(){
        await obtenerProductosFachada().then((data)=>{
            this.productos=data
        })
    },
    async buscarPorFechas() {
      try {
        const datosBuscar = {
          fechaInicio: this.formatDate(this.fechaInicio),
          fechaFin: this.formatDate(this.fechaFin, true),
          nombre: this.selectedProducto,
        };
            const data = await obtenerProductosFechaFachada(datosBuscar);
            this.productosFecha = data;

       
          
        
      } catch (error) {
        console.error("Error al consultar productos:", error);
      }
    },
    formatDate(date, isEnd = false) {
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const time = isEnd ? "T23:59:59" : "T00:00:00";
      return `${year}-${month}-${day}${time}`;
    },
  },
};
</script>

<style></style>
