import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import 'primevue/resources/themes/lara-light-green/theme.css'

import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

const app=createApp(App)

app.use(PrimeVue);
app.component("Dialog",Dialog)
app.component("Button",Button)
app.component("InputText",InputText)
app.component("Dropdown",Dropdown)

app.use(router).mount('#app')

