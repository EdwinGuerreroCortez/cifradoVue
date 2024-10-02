<template>
  <div class="container mt-4">
    <div class="card p-3 position-relative form-container">
      <!-- Help Icon with hover functionality -->
      <i class="bi bi-question-circle-fill help-icon"
         @mouseover="showHelp"
         @mouseleave="hideHelp">
      </i>

      <!-- Help message that appears when hovering -->
      <div v-if="helpVisible" class="help-message">
        <h4>¿Cómo usar el Generador SHA-1?</h4>
        <p>Ingresa un mensaje en el campo de texto y presiona "Generar SHA-1" para obtener el hash.</p>
      </div>

      <h2 class="text-center">Generador de SHA-1</h2>

      <!-- Input for message -->
      <label for="mensaje">Mensaje</label>
      <input type="text" v-model="mensaje" id="mensaje" class="form-control" placeholder="Escribe el mensaje" required>
      
      <!-- Alert Message -->
      <div v-if="alertMessage" class="alert" :class="`alert-${alertType}`" role="alert">
        {{ alertMessage }}
      </div>

      <!-- Button to generate SHA-1 -->
      <button class="btn btn-primary mt-3" @click="generarSHA1">Generar SHA-1</button>

      <!-- Display the result -->
      <div class="mt-3">
        <h5>Resultado:</h5>
        <input type="text" class="form-control" :value="resultado" readonly>
      </div>
    </div>

    <!-- Accordion for additional info -->
    <div class="accordion mt-4 accordion-container" id="faqAccordion">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
            Ver gráfico de Rendimiento y Facilidad
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
          <div class="accordion-body">
            <div>              
              <BarChart 
                title="Rendimiento y Facilidad de Implementación Cifrado de SHA-1" 
                :rendimiento="7" 
                :facilidad="6" 
                />
          </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            ¿Qué es el Cifrado SHA-1?
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
          <div class="accordion-body">
            El SHA-1 (Secure Hash Algorithm 1) es una función de hash criptográfica que toma un mensaje y genera un valor hash de 160 bits (20 bytes).
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            ¿Cómo funciona SHA-1?
          </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
          <div class="accordion-body">
            SHA-1 toma como entrada un mensaje de longitud variable y lo procesa en bloques de 512 bits, generando un hash único de 160 bits.
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
      mensaje: '',
      resultado: '',
      helpVisible: false,
      alertMessage: '',  // Message for the alert
      alertType: '',  // Type of the alert (e.g., success, danger, warning)
    };
  },
  methods: {
    showHelp() {
      this.helpVisible = true;
    },
    hideHelp() {
      this.helpVisible = false;
    },
    generarSHA1() {
      // Check if the input is empty
      if (!this.mensaje) {
        this.showAlert('El campo de mensaje no debe estar vacío.', 'danger');
        return;
      }

      // Clear alert message if there's input
      this.alertMessage = '';
      
      // Create SHA-1 hash of the message
      const encoder = new TextEncoder();
      const data = encoder.encode(this.mensaje);

      crypto.subtle.digest('SHA-1', data).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        this.resultado = hashHex;

        // Success message
        this.showAlert('SHA-1 generado correctamente.', 'success');
      }).catch(error => {
        console.error('Error generando el SHA-1:', error);
        this.resultado = 'Error al generar el SHA-1';
        this.showAlert('Error al generar el SHA-1.', 'danger');
      });
    },
    showAlert(message, type) {
      this.alertMessage = message;
      this.alertType = type;

      // Hide the alert after 1 second
      setTimeout(() => {
        this.alertMessage = '';
      }, 1000);
    }
  }
};
</script>

<style scoped>
/* Reduces the size of the form */
.form-container {
  width: 50%; /* Set a smaller width */
  margin: 0 auto; /* Center it horizontally */
}

/* Reduces the size of the accordion */
.accordion-container {
  width: 50%; /* Set a smaller width for the accordion */
  margin: 0 auto; /* Center it horizontally */
}

.card {
  position: relative;
}

.help-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
  font-size: 1.5em;
  color: #007bff;
}

.help-message {
  position: absolute;
  top: 40px;
  left: 10px;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
  z-index: 10;
  width: 200px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.alert {
  position: fixed;
  top: 10px; /* Ajusta esta posición según tus necesidades */
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999; /* Asegura que esté por encima del contenido */
  width: 300px; /* Ajusta el ancho de la alerta si es necesario */
  text-align: center; /* Centra el texto de la alerta */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* Agrega una sombra para que destaque */
}
</style>
