<template>
  <div class="container mt-4">
    

    <!-- Formulario del Cifrado César -->
    <div style="min-height: 50px; position: relative;">
      <div
        v-if="showCopyAlert"
        class="alert alert-success fixed-alert"
        role="alert"
      >
        ¡Texto copiado al portapapeles!
      </div>

      <div
        v-if="showResultAlert"
        class="alert alert-info fixed-alert"
        role="alert"
      >
        Operación completada correctamente.
      </div>
    </div>

    <div class="card p-4">
      <h2 class="mb-3">Cifrado César</h2>
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
            El Cifrado César es una técnica de cifrado en la que cada letra en
            el texto original es sustituida por otra letra que se encuentra un
            número fijo de posiciones más adelante en el alfabeto.
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
            Para codificar, se desplaza cada letra en el mensaje original hacia
            adelante en el alfabeto según el número de desplazamiento. Para
            descifrar, se hace lo contrario, desplazando las letras hacia
            atrás.
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
      shift: 0,
      result: "",
      showCopyAlert: false,
      showResultAlert: false,
    };
  },
  methods: {
    encrypt() {
      this.result = this.caesarCipher(this.message, parseInt(this.shift));
      this.showAlert('result');
    },
    decrypt() {
      this.result = this.caesarCipher(this.message, -parseInt(this.shift));
      this.showAlert('result');
    },
    caesarCipher(text, shift) {
      return text
        .split("")
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
        .join("");
    },
    copyToClipboard() {
      const el = document.createElement("textarea");
      el.value = this.result;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.showAlert('copy');
    },
    showAlert(type) {
      if (type === 'copy') {
        this.showCopyAlert = true;
        setTimeout(() => {
          this.showCopyAlert = false;
        }, 1000); // 1 segundo
      } else if (type === 'result') {
        this.showResultAlert = true;
        setTimeout(() => {
          this.showResultAlert = false;
        }, 1000); // 1 segundo
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
}

/* Alertas que no mueven el contenido, se posicionan encima */
.fixed-alert {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 1;
  transition: opacity 0.5s ease;
  z-index: 10;
}

.fixed-alert[style*="display: none"] {
  opacity: 0;
}
</style>
