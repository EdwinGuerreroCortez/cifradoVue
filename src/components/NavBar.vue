<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-teal">
    <div class="container-fluid">
      <!-- Logo con icono -->
      <a class="navbar-brand fw-bold" href="#">
        <i class="bi bi-shield-lock-fill"></i> Cifrados Pro
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <!-- Menú desplegable para los cifrados con iconos -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="cifradosDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-lock"></i> Cifrados
            </a>
            <ul class="dropdown-menu" aria-labelledby="cifradosDropdown">
              <li>
                <router-link class="dropdown-item" to="/caesar">
                  <i class="bi bi-arrow-right-circle"></i> Cifrado César
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/scytale">
                  <i class="bi bi-arrow-right-circle"></i> Cifrado Escítala
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/des">
                  <i class="bi bi-arrow-right-circle"></i> Cifrado DES
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/sha1">
                  <i class="bi bi-arrow-right-circle"></i> Cifrado SHA-1
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/rsa-signature">
                  <i class="bi bi-arrow-right-circle"></i> Firma Digital DSA
                </router-link>
              </li>
            </ul>
          </li>

          <!-- Link "Acerca de" con icono -->
          <li class="nav-item">
            <router-link class="nav-link" to="/about">
              <i class="bi bi-info-circle"></i> Acerca de
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style scoped>
/* Estilo para el fondo de la barra de navegación en verde azulado (teal) */
.bg-teal {
  background-color: #008080; /* Verde azulado */
}

/* Ajusta el color de los enlaces */
.nav-link {
  color: rgba(255, 255, 255, 0.8) !important;
  transition: color 0.3s ease;
}

/* Cambia el color cuando se hace hover en los enlaces */
.nav-link:hover {
  color: #f0f8ff !important; /* Un color más claro (AliceBlue) */
}

/* Dropdown Menu */
.dropdown-menu {
  background-color: #004d4d; /* Un tono más oscuro de teal */
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Color del dropdown items */
.dropdown-item {
  color: white;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dropdown-item:hover {
  background-color: #008080;
  color: white;
}

/* Estilo para el botón de toggle en móvil */
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba%28255, 255, 255, 0.5%29' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}
</style>
