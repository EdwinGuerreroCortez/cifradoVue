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
          <li>Introduzca el mensaje que desea cifrar o descifrar en el campo "Mensaje".</li>
          <li>Especifique el número de columnas que desea utilizar para el cifrado en el campo "Número de columnas".</li>
          <li>Haga clic en "Cifrar" para codificar el mensaje o "Descifrar" para recuperar el mensaje original.</li>
        </ol>
      </div>

      <!-- Contenido del formulario -->
      <h2 class="mb-3 text-center">Cifrado Escítala</h2>
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
          <label for="columns">Número de columnas</label>
          <input
            type="number"
            v-model="columns"
            class="form-control"
            id="columns"
            placeholder="0"
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
    </div>

    <!-- Acordeón para preguntas -->
    <div class="accordion mt-4" id="faqAccordion">
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
                :rendimiento="8" 
                :facilidad="9" 
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
            ¿Qué es el Cifrado Escítala?
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#faqAccordion"
        >
          <div class="accordion-body">
            El Cifrado Escítala es una técnica de cifrado en la que un mensaje se escribe en filas sobre una tira enrollada en un cilindro. El mensaje cifrado se obtiene desenrollando la tira y leyendo las columnas.
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
            Para codificar, se escribe el mensaje en filas sobre un cilindro de una longitud determinada (número de columnas) y se lee por columnas. Para descifrar, se reconstruye el texto original leyendo las filas de nuevo.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/BarChart.vue';  // Importar el componente reutilizable

export default {
  components: {
    BarChart
  },
  data() {
    return {
      message: "",
      columns: 0,
      result: "",
      showHelp: false, // Control para mostrar la ayuda
    };
  },
  methods: {
    toggleHelp() {
      this.showHelp = !this.showHelp;
    },
    encrypt() {
      let cleanMessage = this.message.replace(/\s+/g, '');
      this.result = this.scytaleCipher(cleanMessage, parseInt(this.columns));
    },
    decrypt() {
      let cleanMessage = this.message.replace(/\s+/g, '');
      this.result = this.scytaleCipherDecrypt(cleanMessage, parseInt(this.columns));
    },
    scytaleCipher(text, columns) {
      let rows = Math.ceil(text.length / columns);
      let encrypted = "";
      for (let col = 0; col < columns; col++) {
        for (let row = 0; row < rows; row++) {
          let index = row * columns + col;
          if (index < text.length) {
            encrypted += text[index];
          }
        }
      }
      return encrypted;
    },
    scytaleCipherDecrypt(text, columns) {
      let rows = Math.ceil(text.length / columns);
      let decryptedArray = new Array(text.length).fill('');
      let currentIndex = 0;

      for (let col = 0; col < columns; col++) {
        for (let row = 0; row < rows; row++) {
          let index = row * columns + col;
          if (index < text.length) {
            decryptedArray[index] = text[currentIndex];
            currentIndex++;
          }
        }
      }

      return decryptedArray.join('');
    },
    copyToClipboard() {
      const el = document.createElement("textarea");
      el.value = this.result;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
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
</style>
