<template>
  <div id="app" class="layout">
    <NavBar />
    <div class="container main-content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    NavBar,
    Footer
  }
};
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* La página siempre tendrá una altura mínima del 100% de la ventana */
}

.main-content {
  flex-grow: 1; /* El contenido principal toma todo el espacio disponible */
  padding: 20px;
  margin-top: 60px; /* Para evitar que el contenido esté cubierto por el navbar */
}

footer {
  margin-top: auto; /* Empuja el footer al final cuando el contenido sea corto */
}

.container {
  padding: 1rem;
}
</style>
