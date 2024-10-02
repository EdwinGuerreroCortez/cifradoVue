<template>
    <div class="layout">
      <NavBar />
      <main class="main-content">
        <router-view />
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import NavBar from './NavBar.vue';
  import Footer from './Footer.vue';
  
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
    min-height: 100vh;
  }
  
  .main-content {
    flex-grow: 1;
    padding: 1rem;
  }
  </style>
  