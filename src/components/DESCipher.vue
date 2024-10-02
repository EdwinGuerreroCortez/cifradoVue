<template>
  <div class="container mt-4">
    <!-- Formulario con el ícono de ayuda -->
    <div class="card p-4 position-relative">
      <!-- Icono de ayuda en la esquina superior izquierda dentro del formulario -->
      <div 
        class="help-icon"
        @click="toggleHelp"
        @mouseenter="showHelp = true"
        @mouseleave="showHelp = false"
      >
        <i class="bi bi-question-circle-fill"></i> <!-- Ícono de Bootstrap -->
      </div>

      <!-- Ayuda emergente (solo visible cuando showHelp es true) -->
      <div v-if="showHelp" class="help-text position-absolute">
        <h4>¿Cómo usar el formulario?</h4>
        <ol>
          <li>Introduzca el mensaje que desea cifrar o el texto cifrado que desea descifrar en el campo "Mensaje".</li>
          <li>Escriba la clave secreta (mínimo 8 caracteres) para el cifrado o descifrado.</li>
          <li>Haga clic en "Cifrar" para codificar el mensaje o "Descifrar" para recuperar el mensaje original.</li>
        </ol>
      </div>

      <!-- Contenido del formulario -->
      <h2 class="mb-3 text-center">Cifrado DES</h2>
      <form @submit.prevent="encrypt">
        <div class="form-group">
          <label for="message">Mensaje</label>
          <input
            type="text"
            v-model="message"
            class="form-control"
            id="message"
            placeholder="Escribe el mensaje o el texto cifrado"
            required
          />
        </div>
        <div class="form-group mt-3">
          <label for="key">Clave Secreta</label>
          <!-- Se oculta la clave con type="password" -->
          <input
            type="password"
            v-model="key"
            class="form-control"
            id="key"
            placeholder="Escribe la clave secreta (mínimo 8 caracteres)"
            required
          />
        </div>
        <div class="mt-3">
          <button
            class="btn btn-primary"
            @click="encrypt"
            type="button"
          >
            CIFRAR
          </button>
          <button
            class="btn btn-secondary ms-2"
            @click="decrypt"
            type="button"
          >
            DESCIFRAR
          </button>
        </div>
      </form>
      <div class="mt-4">
        <h5>Resultado:</h5>
        <p class="form-control">{{ result }}</p>
        <button
          class="btn btn-outline-primary"
          v-if="result"
          @click="copyToClipboard"
        >
          Copiar
        </button>
      </div>

      <!-- Alertas de éxito -->
      <div v-if="showAlert" class="alert alert-info mt-2">
        {{ alertMessage }}
      </div>
    </div>

    <!-- Acordeón para preguntas -->
    <div class="accordion mt-4" id="faqAccordion">
  <!-- Acordeón 1: Gráfico de Rendimiento y Facilidad -->
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
        Ver gráfico de Rendimiento y Facilidad
      </button>
    </h2>
    <div
      id="collapseOne"
      class="accordion-collapse collapse"
      aria-labelledby="headingOne"
      data-bs-parent="#faqAccordion"
    >
      <div class="accordion-body">
        <div>
          <BarChart 
            title="Rendimiento y Facilidad de Implementación Cifrado de Escítala" 
            :rendimiento="5" 
            :facilidad="6" 
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Acordeón 2: ¿Qué es el cifrado DES? -->
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseTwo"
        aria-expanded="false"
        aria-controls="collapseTwo"
      >
        ¿Qué es el cifrado DES?
      </button>
    </h2>
    <div
      id="collapseTwo"
      class="accordion-collapse collapse"
      aria-labelledby="headingTwo"
      data-bs-parent="#faqAccordion"
    >
      <div class="accordion-body">
        El Cifrado DES (Data Encryption Standard) es un algoritmo de cifrado simétrico que usa una clave secreta de 56 bits para convertir texto plano en texto cifrado.
      </div>
    </div>
  </div>

  <!-- Acordeón 3: ¿Cómo se codifica y descifra? -->
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseThree"
        aria-expanded="false"
        aria-controls="collapseThree"
      >
        ¿Cómo se codifica y descifra?
      </button>
    </h2>
    <div
      id="collapseThree"
      class="accordion-collapse collapse"
      aria-labelledby="headingThree"
      data-bs-parent="#faqAccordion"
    >
      <div class="accordion-body">
        Para codificar, ingrese el mensaje y la clave secreta y haga clic en "Cifrar". Para descifrar, ingrese el mensaje cifrado y la misma clave secreta, y haga clic en "Descifrar".
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script>
// Necesitarás importar una biblioteca de cifrado para DES, como CryptoJS o similar.
import CryptoJS from "crypto-js"; // Asegúrate de tener instalada la librería
import BarChart from '@/components/BarChart.vue';  // Importar el componente reutilizable
export default {
  components: {
    BarChart
  },
  data() {
    return {
      message: "",
      key: "",
      result: "",
      encryptedMessage: "", // Almacena el mensaje cifrado
      showHelp: false, // Control para mostrar la ayuda
      showAlert: false, // Control para mostrar alertas
      alertMessage: "", // Mensaje de alerta
    };
  },
  methods: {
    toggleHelp() {
      this.showHelp = !this.showHelp;
    },
    showAlertMessage(message) {
      this.alertMessage = message;
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 2000); // Alerta visible por 2 segundos
    },
    encrypt() {
      // Encriptar usando DES
      if (this.key.length !== 8) {
        alert("La clave debe tener exactamente 8 caracteres.");
        return;
      }
      const encrypted = CryptoJS.DES.encrypt(this.message, this.key).toString();
      this.encryptedMessage = encrypted; // Guardamos el mensaje cifrado
      this.result = encrypted;
      this.showAlertMessage("Mensaje cifrado correctamente.");
    },
    decrypt() {
      // El descifrado solo es posible si el mensaje coincide con el mensaje cifrado
      if (this.message !== this.encryptedMessage) {
        alert("El mensaje ingresado no coincide con el cifrado original.");
        return;
      }
      try {
        const decrypted = CryptoJS.DES.decrypt(this.message, this.key).toString(CryptoJS.enc.Utf8);
        if (!decrypted) throw new Error("Clave incorrecta");
        this.result = decrypted;
        this.showAlertMessage("Mensaje descifrado correctamente.");
      } catch (error) {
        alert("Clave incorrecta o mensaje corrupto.");
      }
    },
    copyToClipboard() {
      const el = document.createElement("textarea");
      el.value = this.result;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.showAlertMessage("Resultado copiado al portapapeles.");
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
}

.card {
  position: relative; /* Necesario para que el ícono esté dentro del formulario */
}

.help-icon {
  position: absolute;
  top: 10px; /* Ajuste la posición del ícono dentro del formulario */
  left: 10px;
  font-size: 24px;
  color: #007bff;
  cursor: pointer;
}

.help-text {
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  top: 40px; /* Ajuste según la posición */
  left: 50px;
  z-index: 100;
  max-width: 300px;
}

.help-text h4 {
  margin-top: 0;
}

.position-absolute {
  position: absolute;
}

.alert {
  margin-top: 20px;
}
</style>
