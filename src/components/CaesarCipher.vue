<template>
  <div class="container mt-4">
    <h2 class="text-center">Cifrado César</h2>

    <!-- Alertas de Bootstrap -->
    <div v-if="alertMessage" class="alert" :class="`alert-${alertType}`" role="alert">
      {{ alertMessage }}
    </div>

    <div class="card p-4 position-relative">
      <!-- Icono de ayuda -->
      <i class="bi bi-question-circle-fill help-icon" @click="toggleHelp"></i>

      <!-- Mensaje de ayuda -->
      <div v-if="helpVisible" class="help-message">
        <h4>¿Cómo usar el formulario?</h4>
        <p>
          1. Ingrese el mensaje en el campo "Mensaje".<br />
          2. Ingrese el número de desplazamiento en el campo "Desplazamiento".<br />
          3. Presione "CIFRAR" para cifrar el mensaje o "DESCIFRAR" para recuperar el mensaje original.
        </p>
      </div>

      <form @submit.prevent="encrypt">
        <div class="form-group">
          <label for="message">Mensaje</label>
          <input
            type="text"
            v-model="message"
            class="form-control"
            id="message"
            placeholder="Escribe el mensaje"
            required
          />
        </div>
        <div class="form-group mt-3">
          <label for="shift">Desplazamiento</label>
          <input
            type="number"
            v-model="shift"
            class="form-control"
            id="shift"
            placeholder="0"
            required
          />
        </div>
        <div class="mt-3">
          <button class="btn btn-primary" @click="encrypt" type="button">
            CIFRAR
          </button>
          <button class="btn btn-secondary ms-2" @click="decrypt" type="button">
            DESCIFRAR
          </button>
        </div>
      </form>
      <div class="mt-4">
        <h5>Resultado:</h5>
        <p class="form-control">{{ result }}</p>
        <button class="btn btn-outline-primary" v-if="result" @click="copyToClipboard">
          Copiar
        </button>
      </div>
    </div>

    <!-- Acordeón para preguntas -->
    <div class="accordion mt-4" id="faqAccordion">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
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
                title="Rendimiento y Facilidad de Implementación del Cifrado de César"
                :rendimiento="10"
                :facilidad="10"
              />
            </div>
          </div>
        </div>
      </div>
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
            ¿Qué es el Cifrado César?
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#faqAccordion"
        >
          <div class="accordion-body">
            El Cifrado César es una técnica de cifrado antigua que consiste en desplazar cada letra del alfabeto un
            número fijo de posiciones. Es uno de los cifrados más sencillos y fue usado por Julio César para proteger
            sus mensajes.
          </div>
        </div>
      </div>
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
            <strong>Codificación:</strong><br />
            - Cada letra del mensaje se desplaza un número fijo de posiciones en el alfabeto.<br />
            <strong>Descifrado:</strong><br />
            - Se realiza el desplazamiento inverso para recuperar el mensaje original.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/BarChart.vue'; // Importar el componente reutilizable

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      message: '',
      shift: '',
      result: '',
      alertMessage: '',
      alertType: '',
      helpVisible: false, // Controla la visibilidad del mensaje de ayuda
    };
  },
  methods: {
    toggleHelp() {
      this.helpVisible = !this.helpVisible; // Alterna la visibilidad de la ayuda
    },
    encrypt() {
      if (!this.message) {
        this.showAlert('El campo de mensaje no puede estar vacío.', 'warning');
        return;
      }
      if (!this.shift) {
        this.showAlert('Debe elegir un número de desplazamiento.', 'warning');
        return;
      }
      this.result = this.caesarCipher(this.message, parseInt(this.shift));
      this.showAlert('Texto cifrado correctamente.', 'success');
    },
    decrypt() {
      if (!this.message) {
        this.showAlert('El campo de mensaje no puede estar vacío.', 'warning');
        return;
      }
      if (!this.shift) {
        this.showAlert('Debe elegir un número de desplazamiento.', 'warning');
        return;
      }
      this.result = this.caesarCipher(this.message, -parseInt(this.shift));
      this.showAlert('Texto descifrado correctamente.', 'success');
    },
    caesarCipher(text, shift) {
      return text
        .split('')
        .map((char) => {
          const code = char.charCodeAt(0);
          if (code >= 65 && code <= 90) {
            // Mayúsculas
            return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
          } else if (code >= 97 && code <= 122) {
            // Minúsculas
            return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
          } else {
            // Otros caracteres no se cifran
            return char;
          }
        })
        .join('');
    },
    copyToClipboard() {
      const el = document.createElement('textarea');
      el.value = this.result;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.showAlert('Texto copiado al portapapeles', 'info');
    },
    showAlert(message, type) {
      this.alertMessage = message;
      this.alertType = type;
      setTimeout(() => {
        this.alertMessage = '';
      }, 3000); // Oculta la alerta después de 3 segundos
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
}

/* Alertas que no mueven el contenido, se posicionan encima */
.alert {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 300px;
  text-align: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

/* Estilos para el ícono de ayuda */
.help-icon {
  position: absolute;
  top: 1px;
  left: 5px; /* Cambia 'right' por 'left' */
  font-size: 1.5rem;
  cursor: pointer;
  color: #007bff;
}


/* Estilos para el mensaje de ayuda */
.help-message {
  position: absolute;
  top: 40px;
  left: 10px;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
  z-index: 10;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 300px;
}
</style>
