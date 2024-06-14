// mostrar y ocultar divs
function form_oculto(id) {
    var divToShow = document.getElementById(id);
    const allDivs = document.querySelectorAll('.content');
    allDivs.forEach(div => div.classList.remove('active'));
    divToShow.classList.add('active');
  }

  window.onload = function() {
    form_oculto('int');
  };
  
// funcion de intervalo
function calcularIntervalo() {
    const media = parseFloat(document.getElementById('media').value);
    const tamanio = parseFloat(document.getElementById('tamanio').value);
    const desviacion = parseFloat(document.getElementById('desviacion').value);
    const confianza = parseFloat(document.getElementById('confianza').value) / 100;
    const z = calcularZ(confianza);
    const error = z * (desviacion / Math.sqrt(tamanio));
    const intervaloInferior = media - error;
    const intervaloSuperior = media + error;
    document.getElementById('resultado').innerText = `Intervalo de confianza: [${intervaloInferior} - ${intervaloSuperior}]`;
}

        function calcularZ(confianza) {
            if (confianza === 99) return 2.58;
            if (confianza === 95) return 1.96;
            if (confianza === 90) return 1.645;
            return 1.96;
        }

// Obtener los radio buttons
const opciones = document.querySelectorAll('input[type="radio"]');

// Agregar evento al cambio de selección
opciones.forEach(opcion => {
    opcion.addEventListener('change', () => {
        console.log(`Seleccionaste: ${opcion.value}`);
        // Aquí puedes realizar otras acciones según la opción seleccionada
    });
});

/// codigo de calculadora puntual

function calculate() {
  const type = document.getElementById('calculationType').value;
  const data = document.getElementById('dataInput').value.split(',').map(Number).filter(n => !isNaN(n));
  let result;
  switch (type) {
      case 'mean':
          result = calculateMean(data);
          break;
      case 'median':
          result = calculateMedian(data);
          break;
      case 'mode':
          result = calculateMode(data);
          break;
      case 'stdDev':
          result = calculateStdDev(data);
          break;
      case 'variance':
          result = calculateVariance(data);
          break;
  }
  document.getElementById('result').innerText = `Resultado: ${result}`;
}

function calculateMean(data) {
  const sum = data.reduce((acc, val) => acc + val, 0);
  return sum / data.length;
}

function calculateMedian(data) {
  data.sort((a, b) => a - b);
  const midIndex = Math.floor(data.length / 2);
  return data.length % 2 !== 0 ? data[midIndex] : (data[midIndex - 1] + data[midIndex]) / 2;
}

function calculateMode(data) {
  const modeObj = {};
  data.forEach(num => {
      if (!modeObj[num]) modeObj[num] = 0;
      modeObj[num]++;
  });

  let maxFrequency = 0;
  let modes = [];
  for (const num in modeObj) {
      if (modeObj[num] > maxFrequency) {
          modes = [num];
          maxFrequency = modeObj[num];
      } else if (modeObj[num] === maxFrequency) {
          modes.push(num);
      }
  }

  return modes.length === data.length ? 'No hay moda' : modes.join(', ');
}

function calculateStdDev(data) {
  const mean = calculateMean(data);
  const squareDiffs = data.map(num => Math.pow(num - mean, 2));
  const avgSquareDiff = calculateMean(squareDiffs);
  return Math.sqrt(avgSquareDiff);
}

function calculateVariance(data) {
  const mean = calculateMean(data);
  const squareDiffs = data.map(num => Math.pow(num - mean, 2));
  return calculateMean(squareDiffs);
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('myModal').style.display = 'block';
});

function mostrarNombre() {
  const nombre = document.getElementById('nombre').value;
  document.getElementById('bienvenido').textContent = `¡Bienvenido, ${nombre}!`;
  document.getElementById('myModal').style.display = 'none'; // Ocultar la ventana emergente
}
