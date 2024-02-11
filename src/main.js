import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import 'primevue/resources/themes/lara-light-green/theme.css'

import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import FloatLabel from 'primevue/floatlabel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const app=createApp(App)

app.use(PrimeVue);
app.component("Dialog",Dialog)
app.component("Button",Button)
app.component("InputText",InputText)
app.component("Dropdown",Dropdown)
app.component("Calendar",Calendar)
app.component("FloatLabel",FloatLabel)
app.component("DataTable",DataTable)
app.component("Column",Column)

app.use(router).mount('#app')

