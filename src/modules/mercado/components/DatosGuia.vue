<template>
  <div class="contenedor">
    <div class="datos1">
      <h1>Guia Remision</h1>
      <label for="">Fecha</label>
      <span>{{ fecha }}</span>

      <label for="">Nombre</label>
      <input v-model="nombre" type="text" />
      <label for="">Cedula</label>
      <input v-model="cedula" type="text" />

      <label for="">Destino</label>
      <input v-model="destino" type="text" />
      <label for="">Local</label>
      <input v-model="local" type="text" />
      <label for="">Plataforma</label>
      <input v-model="plataforma" type="text" />
    </div>
    <div class="datos2">
      <h1>Punto de partida</h1>
      <label for="">Provincia</label>
      <select v-model="provincia" @change="actualizarCantones">
        <option v-for="p in provincias" :key="p.codigo">{{ p.nombre }}</option>
      </select>
      <label for="">Canton</label>
      <select
        v-model="canton"
        @change="actualizarParroquias"
        :disabled="!provincia"
      >
        <option v-for="c in cantones" :key="c.codigo">{{ c.nombre }}</option>
      </select>
      <label for="">Parroquia</label>
      <select v-model="parroquia" :disabled="!canton">
        <option v-for="a in parroquias" :key="a.codigo">{{ a.nombre }}</option>
      </select>
    </div>

    <div class="datos3">
      <Button label="Agregar Producto" @click="visible = true"></Button>

      <Dialog
        v-model:visible="visible"
        modal
        header="Agregar Producto"
        :style="{ width: '25rem' }"
        @hide="cleanDialog"
      >
        <!-- Sección de búsqueda -->
        <div>
          <div>
            <InputText id="productSearch" v-model="productSearch" />
          </div>
          <div>
            <Button
              type="button"
              label="Buscar"
              @click="consultarProducto"
              :loading="buscandoProducto"
            ></Button>
          </div>
        </div>

        <!-- Sección de resultados de búsqueda -->
        <div class="resultados">
          <div v-if="listaProductos.length > 0">
            <label for="selectedProduct">Nombre</label>
            <div>
              <Dropdown
                id="selectedProduct"
                v-model="selectedProduct"
                :options="listaProductos"
                placeholder="Seleccionar"
              />
            </div>
          </div>

          <!-- Sección de cantidad -->
          <div v-if="selectedProduct">
            <label for="quantity">Cantidad</label>
            <div>
              <InputText id="quantity" v-model="quantity" autocomplete="off" />
            </div>
          </div>

          <!-- Sección de tipo de presentación -->
          <div v-if="selectedProduct">
            <label for="presentationType">Presentación</label>
            <div>
              <Dropdown
                v-model="selectedPresentation"
                :options="presentationOptions"
                placeholder="Seleccionar"
              />
            </div>
          </div>
        </div>
        <!-- Botones de acciones -->
        <div>
          <Button
            type="button"
            label="Cancelar"
            class="p-button-secondary"
            @click="visible = false"
          ></Button>
          <Button
            type="button"
            label="Guardar"
            class="p-button-primary"
            @click="guardarProducto"
          ></Button>
        </div>
      </Dialog>

      <DataTable :value="productosG" tableStyle="min-width: 50rem">
        <Column field="nombre" header="Producto"></Column>
        <Column field="cantidad" header="Cantidad"></Column>
        <Column field="presentacion" header="Presentacion"></Column>
      </DataTable>
    </div>
    <div>
      <Button @click="guardarGuia" class="text-center" :loading="guardandoGuia"
        >Guardar</Button
      >
    </div>
  </div>
  <Toast />

</template>

<script>
import moment from "moment";
import datosjs from "../store/datos.json";
import usuarioService from "@/modules/utils/tokenUtils";
import {obtenerProductosNombreFachada} from "../helpers/productoUtils.js";
import saveGuia from "../helpers/GuardarGuia.js";

export default {
  data() {
    return {
      buscandoProducto: false,
      guardandoGuia: false,

      visible: false,

      fecha: null,
      nombre: null,
      cedula: null,
      usuario: null,

      destino: "Mercado Mayorista Quito",
      local: "HOR-22",
      plataforma: "PLA-01",

      parroquia: "",
      canton: "",
      provincia: "",

      productosG: [],
      datosJson: datosjs,

      provincias: [],
      cantones: [],
      parroquias: [],
      datosProvincia: null,
      datosCanton: null,

      productSearch: "",
      selectedProduct: "",
      quantity: "",
      selectedPresentation: "",
      presentationOptions: ["Libra", "Kilo"],
      listaProductos: [],
    };
  },

  methods: {
    cleanDialog() {
      this.productSearch = "";
      this.selectedProduct = "";
      this.quantity = "";
      this.selectedPresentation = "";
      this.listaProductos = [];
    },
    async consultarProducto() {
      try {
        this.buscandoProducto = true;
        const data = await obtenerProductosNombreFachada(this.productSearch);

        // Limpiar la lista de productos
        this.listaProductos = [];

        // Agregar los nombres de los productos a la lista
        data.forEach((producto) => {
          this.listaProductos.push(producto.nombre);
        });
        this.buscandoProducto = false;
      } catch (error) {
        this.buscandoProducto = true;

        this.buscandoProducto = false;
      }
    },

    seleccionarProducto(productoSeleccionado) {
      // Buscamos el producto seleccionado en los resultados originales
      const producto = this.searchResults.find(
        (producto) => producto.nombre === productoSeleccionado
      );
      if (producto) {
        // Asignamos los detalles del producto seleccionado a los campos correspondientes
        this.selectedResult = producto;
        this.quantity = producto.cantidad; // Suponiendo que 'cantidad' es un campo del producto
        this.selectedPresentation = producto.presentacion; // Suponiendo que 'presentacion' es un campo del producto
      }
    },

    guardarProducto() {
      // Agregar el nuevo producto a la lista
      this.productosG.push({
        nombre: this.selectedProduct,
        cantidad: this.quantity,
        presentacion: this.selectedPresentation,
      });

      // Limpiar los campos después de guardar
      this.selectedProduct = "";
      this.quantity = "";
      this.selectedPresentation = "";

      // Cerrar el diálogo
      this.visible = false;
      this.productSearch = "";
      this.listaProductos = "";
    },

    async guardarGuia() {
      const guia = {
        //nombre: this.nombre,
        cedula: this.cedula,
        productos: this.productosG,
      };
      if (this.productosG.length>0) {
        try {
          this.guardandoGuia = true;
          await saveGuia(guia);
          this.guardandoGuia = false;
          this.$toast.add({
            severity: "success",
            summary: "Correcto",
            detail: "La guia se inserto correctamente",
            life: 3000,
          });
        } catch (error) {
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "La guia no se inserto",
            life: 3000,
          });
          console.error("Guia no guardada");
        }
      }
      else{
        console.error("guia sin productos")
        this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "La guia debe contener productos",
            life: 3000,
          });
      }

      this.productosG = [];
    },

    actualizarCantones() {
      console.log("Provincia seleccionada:", this.provincia);
      this.datosProvincia = this.datosJson.find(
        (p) => p.nombre === this.provincia
      );
      this.cantones = this.datosProvincia?.cantones
        ? Object.values(this.datosProvincia.cantones)
        : [];
      console.log("Prueba:", this.datosProvincia);
      this.parroquias = null;
    },

    actualizarParroquias() {
      this.datosCanton = Object.values(this.datosProvincia.cantones).find(
        (c) => c.nombre === this.canton
      );
      this.parroquias = this.datosCanton?.parroquias
        ? Object.values(this.datosCanton.parroquias)
        : [];
    },

    listaDatos() {
      this.provincias = this.datosJson.map((p) => ({
        codigo: p.codigo,
        nombre: p.nombre,
      }));
    },
  },

  mounted() {
    this.fecha = moment().format("YYYY-MM-DD HH:mm:ss");
    this.listaDatos();
    this.usuario = usuarioService.getUsuario();
    this.cedula = this.usuario;
  },
};
</script>

<style scoped>
.resultados span {
  width: 100%;
}
.datos1,
.datos2 {
  display: grid;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: repeat(2, 1fr);
  width: 30%;
}

button {
  margin-top: 10px;
  margin-bottom: 10px;
  grid-column: span 2;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

h1 {
  grid-column: span 2;
  text-align: center;
}
label {
  font-size: 18px;
  padding: 0px;
}
.datos3 {
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
.tabla th,
.tabla td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

/* Cambio de color en filas alternas */
.tabla tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
