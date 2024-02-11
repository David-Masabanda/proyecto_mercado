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
                <InputText id="nombreB" v-model="nombre" />
                <label for="nombreB">Nombre</label>
            </FloatLabel>

            <button @click="buscarPorFechas">Buscar</button>
        </div>


        <div class="resultado">
            <DataTable :value="productos" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
                <Column field="nombre" header="Nombre" style="width: 25%"></Column>
                <Column field="cantidad" header="Cantidad" style="width: 25%"></Column>
                <Column field="presentacion" header="Presentacion" style="width: 25%"></Column>
            </DataTable>
        </div>

    </div>



  
</template>

<script>
import obtenerProductosFachada from '../helpers/BusquedaAD.js';
export default {
    data(){
        return{
            fechaInicio:'',
            fechaFin:'',
            nombre:'',
            productos:[],
        }
    },
    methods:{
        async buscarPorFechas(){
            try {
                const datosBuscar = {
                    fechaInicio: this.formatDate(this.fechaInicio),
                    fechaFin: this.formatDate(this.fechaFin, true),
                    nombre: this.nombre, 
                };
                const data = await obtenerProductosFachada(datosBuscar);
                this.productos=data;
                console.log(productos);

            } catch (error) {
                console.error('Error al consultar productos:', error);
            }
        },
        formatDate(date, isEnd = false){
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            const time = isEnd ? 'T23:59:59' : 'T00:00:00';
            return `${year}-${month}-${day}${time}`;
        }
    }
}
</script>

<style>

</style>