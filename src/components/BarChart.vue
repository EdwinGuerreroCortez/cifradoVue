<template>
    <div class="chart-container">
      <apexchart type="bar" :options="chartOptions" :series="series" />
    </div>
  </template>
  
  <script>
  import VueApexCharts from "vue3-apexcharts";
  
  export default {
    components: {
      apexchart: VueApexCharts,
    },
    props: {
      title: {
        type: String,
        required: true
      },
      rendimiento: {
        type: Number,
        required: true
      },
      facilidad: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        series: [
          {
            name: 'Cifrado DES',
            data: [this.rendimiento, this.facilidad]  // Los valores de rendimiento y facilidad provienen de props
          }
        ],
        chartOptions: {
          chart: {
            type: 'bar',
            height: 250,
            width: '100%',  // Ajusta el ancho al 100% del contenedor
            toolbar: {
              show: false  // Deshabilitar la opción de descargar el gráfico
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',  // Ajusta el ancho de las barras
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
            position: 'bottom',
            labels: {
              offsetY: 0,
            },
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
                return val.toFixed(0);  // Mostrar valores enteros en el eje Y
              }
            },
            title: {
              text: 'Escala (1-10)',
              style: {
                color: '#444'
              }
            }
          },
          title: {
            text: this.title,  // El título ahora proviene de props
            align: 'center',
            offsetY: 0,
            style: {
              fontSize: '14px',  // Ajuste del tamaño del texto del título
              fontWeight: 'bold',
              color: '#444',
              padding: {
                top: 20
              }
            }
          },
          fill: {
            opacity: 0.9,
            colors: ['#68d8d6']
          },
          tooltip: {
            enabled: true  // Mantener los tooltips para mejorar la experiencia de usuario
          }
        }
      };
    }
  };
  </script>
  
  <style scoped>
  .chart-container {
    max-width: 500px;  /* Aumenta el tamaño máximo del contenedor */
    margin: 0 auto;    /* Centra el gráfico */
  }
  </style>
  