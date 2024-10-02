<template>
  <div class="container mt-4">
    <h2 class="text-center">Firma Digital DSA</h2>

    <!-- Alertas de Bootstrap -->
    <div v-if="alertMessage" class="alert" :class="`alert-${alertType}`" role="alert">
      {{ alertMessage }}
    </div>

    <!-- Grilla de tres columnas -->
    <div class="row">
      <!-- Columna Izquierda: Generar Claves -->
      <div class="col-md-4">
        <div class="card p-3 position-relative" style="padding-top: 50px;">
          <div class="position-relative">
            <!-- Icono de ayuda -->
            <i class="bi bi-question-circle-fill help-icon" @click="toggleHelp"></i>
            <!-- Mensaje de ayuda -->
            <div v-if="helpVisible" class="help-message">
              <h4>¿Cómo usar el formulario?</h4>
              <p>1. En "Firmar Mensaje", ingresa el mensaje y clave privada para firmar.<br>
                 2. En "Verificar Firma", ingresa el mensaje, la firma generada y la clave pública para verificar.</p>
            </div>
          </div>

          <h5>Generar Claves</h5>
          
          <div v-if="clavePublica" class="mt-3">
            <h6>Clave Pública:</h6>
            <div class="d-flex align-items-center">
              <p class="flex-grow-1">{{ clavePublica.slice(0, 30) }}...</p>
              <i class="bi bi-clipboard" @click="copiarAlPortapapeles(clavePublica)" title="Copiar Clave Pública"></i>
            </div>
          </div>

          <div v-if="clavePrivada" class="mt-3">
            <h6>Clave Privada:</h6>
            <div class="d-flex align-items-center">
              <p class="flex-grow-1">{{ clavePrivada.slice(0, 30) }}...</p>
              <i class="bi bi-clipboard" @click="copiarAlPortapapeles(clavePrivada)" title="Copiar Clave Privada"></i>
            </div>
          </div>

          <!-- Botón de generar claves siempre debajo de las claves generadas -->
          <button class="btn btn-primary mt-3" @click="generarClaves">Generar Claves DSA</button>
        </div>
      </div>

      <!-- Columna del Medio: Firmar Mensaje -->
      <div class="col-md-4">
        <div class="card p-3">
          <h5>Firmar Mensaje</h5>
          <label for="mensajeFirmar">Mensaje a Firmar</label>
          <input type="text" v-model="mensajeFirmar" class="form-control mt-2" id="mensajeFirmar" placeholder="Escribe el mensaje" required>
          
          <label for="clavePrivadaInput" class="mt-3">Clave Privada</label>
          <textarea v-model="clavePrivadaInput" class="form-control mt-2" id="clavePrivadaInput" placeholder="Escribe la clave privada (debe ser válida)" rows="4" required></textarea>
          
          <button class="btn btn-primary mt-3" @click="firmarMensaje">Firmar Mensaje</button>
          
          <div v-if="firma" class="mt-3">
            <h6>Firma Generada:</h6>
            <div class="d-flex align-items-center">
              <p class="flex-grow-1">{{ firma.slice(0, 30) }}...</p>
              <i class="bi bi-clipboard" @click="copiarAlPortapapeles(firma)" title="Copiar Firma"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna Derecha: Verificar Firma -->
      <div class="col-md-4">
        <div class="card p-3">
          <h5>Verificar Firma</h5>
          <label for="mensajeVerificar">Mensaje a Verificar</label>
          <input type="text" v-model="mensajeVerificar" class="form-control mt-2" id="mensajeVerificar" placeholder="Escribe el mensaje a verificar" required>
          
          <label for="clavePublicaInput" class="mt-3">Clave Pública</label>
          <textarea v-model="clavePublicaInput" class="form-control mt-2" id="clavePublicaInput" placeholder="Escribe la clave pública (debe ser válida)" rows="4" required></textarea>
          
          <button class="btn btn-primary mt-3" @click="verificarFirma">Verificar Firma</button>

          <div v-if="firmaValida !== null" class="mt-3">
            <p :class="{'text-success': firmaValida, 'text-danger': !firmaValida}">
              {{ firmaValida ? 'Firma válida' : 'Firma no válida' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Acordeón para gráfico y preguntas -->
    <div class="accordion mt-4" id="faqAccordion">
      <div class="accordion-item">
        <h2 class="accordion-accordion-header" id="headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
            Ver gráfico de Rendimiento y Facilidad
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse">
          <div class="accordion-body">
            <div>              
              <BarChart 
                title="Rendimiento y Facilidad de Implementación Cifrado de DSA" 
                :rendimiento="4" 
                :facilidad="5" 
                />
          </div>
          </div>
        </div>
      </div>
      
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            ¿Qué es el DSA?
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse">
          <div class="accordion-body">
            El DSA (Algoritmo de Firma Digital) es un estándar de firma digital basado en criptografía asimétrica.
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            ¿Cómo funciona el DSA?
          </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse">
          <div class="accordion-body">
            El DSA utiliza dos claves: una clave privada para firmar y una clave pública para verificar. 
            La clave privada genera una firma digital única para un mensaje, mientras que la clave pública permite verificar esa firma.
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
      mensajeFirmar: '',
      mensajeVerificar: '',
      clavePrivadaInput: '',
      clavePublicaInput: '',
      clavePrivada: '',
      clavePublica: '',
      firma: '',
      firmaValida: null,
      helpVisible: false,
      alertMessage: '',
      alertType: '',

      series: [
        {
          name: 'Cifrado DES',
          data: [7, 5]
        }
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 250,
          toolbar: {
            show: false
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val;
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        xaxis: {
          categories: ['Rendimiento', 'Facilidad de Implementación'],
          axisBorder: {
            show: true
          },
          axisTicks: {
            show: true
          }
        },
        yaxis: {
          min: 0,
          max: 10,
          tickAmount: 10,
          labels: {
            formatter: function (val) {
              return val.toFixed(0);
            }
          },
          title: {
            text: 'Escala (1-10)',
          }
        },
        title: {
          text: 'Rendimiento y Facilidad de Implementación de Cifrado DES',
          align: 'center',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
          }
        },
        fill: {
          opacity: 0.9,
          colors: ['#68d8d6']
        },
        tooltip: {
          enabled: true
        }
      }
    };
  },
  methods: {
    toggleHelp() {
      this.helpVisible = !this.helpVisible;
    },
    async generarClaves() {
      try {
        const keyPair = await window.crypto.subtle.generateKey(
          {
            name: 'RSASSA-PKCS1-v1_5',
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: { name: 'SHA-256' }
          },
          true,
          ['sign', 'verify']
        );

        const exportedPublicKey = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
        const exportedPrivateKey = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

        this.clavePublica = this.convertToPem(exportedPublicKey, 'PUBLIC KEY');
        this.clavePrivada = this.convertToPem(exportedPrivateKey, 'PRIVATE KEY');
        this.showAlert('Claves generadas correctamente', 'success');
      } catch (error) {
        this.showAlert('Error al generar las claves', 'danger');
        console.error('Error al generar las claves', error);
      }
    },
    async firmarMensaje() {
      if (!this.mensajeFirmar || !this.clavePrivadaInput) {
        this.showAlert('Por favor, ingrese el mensaje y la clave privada.', 'warning');
        return;
      }
      try {
        const key = await this.importPrivateKey(this.clavePrivadaInput);
        const enc = new TextEncoder();
        const signature = await window.crypto.subtle.sign(
          { name: 'RSASSA-PKCS1-v1_5' },
          key,
          enc.encode(this.mensajeFirmar)
        );
        this.firma = this.arrayBufferToHex(signature);
        this.showAlert('Mensaje firmado correctamente', 'success');
      } catch (error) {
        this.showAlert('Error al firmar el mensaje', 'danger');
        console.error('Error al firmar el mensaje', error);
      }
    },
    async verificarFirma() {
      if (!this.mensajeVerificar || !this.clavePublicaInput || !this.firma) {
        this.showAlert('Por favor, ingrese el mensaje, la firma y la clave pública.', 'warning');
        return;
      }
      try {
        const key = await this.importPublicKey(this.clavePublicaInput);
        const enc = new TextEncoder();
        const valid = await window.crypto.subtle.verify(
          { name: 'RSASSA-PKCS1-v1_5' },
          key,
          this.hexToArrayBuffer(this.firma),
          enc.encode(this.mensajeVerificar)
        );
        this.firmaValida = valid;
        if (valid) {
          this.showAlert('Firma válida', 'success');
        } else {
          this.showAlert('Firma no válida', 'danger');
        }
      } catch (error) {
        this.showAlert('Error al verificar la firma', 'danger');
        console.error('Error al verificar la firma', error);
      }
    },
    copiarAlPortapapeles(texto) {
      navigator.clipboard.writeText(texto).then(() => {
        this.showAlert('Texto copiado al portapapeles', 'info');
      });
    },
    showAlert(message, type) {
      this.alertMessage = message;
      this.alertType = type;
      setTimeout(() => {
        this.alertMessage = '';
      }, 3000); // Oculta la alerta después de 3 segundos
    },
    convertToPem(buffer, label) {
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
      const pem = `-----BEGIN ${label}-----\n${base64.match(/.{1,64}/g).join('\n')}\n-----END ${label}-----`;
      return pem;
    },
    async importPrivateKey(pem) {
      const binaryDerString = window.atob(pem.split('\n').filter(line => line && !line.startsWith('-----')).join(''));
      const binaryDer = new Uint8Array([...binaryDerString].map(char => char.charCodeAt(0)));
      return window.crypto.subtle.importKey(
        'pkcs8',
        binaryDer,
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        true,
        ['sign']
      );
    },
    async importPublicKey(pem) {
      const binaryDerString = window.atob(pem.split('\n').filter(line => line && !line.startsWith('-----')).join(''));
      const binaryDer = new Uint8Array([...binaryDerString].map(char => char.charCodeAt(0)));
      return window.crypto.subtle.importKey(
        'spki',
        binaryDer,
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        true,
        ['verify']
      );
    },
    arrayBufferToHex(buffer) {
      return [...new Uint8Array(buffer)].map(x => x.toString(16).padStart(2, '0')).join('');
    },
    hexToArrayBuffer(hex) {
      return new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16))).buffer;
    }
  }
};
</script>

<style scoped>
.chart-container {
  max-width: 500px;
  margin: 0 auto;
}

.help-icon {
  position: absolute;
  top: -18px; /* Ajusta esto para colocarlo mejor */
  left: -10px; /* Ajusta esto para alinearlo correctamente */
  font-size: 24px;
  color: #007bff;
  cursor: pointer;
  z-index: 10; /* Asegura que el ícono esté por encima del contenido */
}



.help-message {
  position: absolute;
  top: 40px;
  left: 10px;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
  z-index: 10;
}

.bi-clipboard {
  cursor: pointer;
  font-size: 1.2em;
  margin-left: 10px;
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
h5 {
  margin-left: 15px; /* Aumenta este valor si es necesario */
}


</style>
