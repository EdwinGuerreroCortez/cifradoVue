<template>
  <footer class="bg-custom text-center text-lg-start">
    <div class="text-center p-3 bg-custom">
      © 2024 Cifrados. Todos los derechos reservados.
      <br />
      Edwin Guerrero Cortez - Ingeniería en Desarrollo y Gestión de Software - 7° "B"
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
};
</script>

<style scoped>
footer {
  position: relative;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  margin-top: 20px; /* Añadir margen superior */
  background-color: #2E8B57; /* Verde azulado */
  color: white; /* Texto en blanco para contraste */
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1); /* Añadir sombra para resaltar */
}

.bg-custom {
  background-color: #2E8B57; /* Verde azulado */
}

p {
  margin: 0;
}
</style>
