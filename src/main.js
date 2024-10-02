import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Importa el archivo del router

// Importa Bootstrap 5 CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Importa el JavaScript de Bootstrap (opcional, solo si necesitas los componentes interactivos de Bootstrap)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';



const app = createApp(App);

app.use(router);  // Agrega el router a la aplicación

app.mount('#app');
