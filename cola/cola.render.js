// cola.render.js
// Conecta la clase Cola (Cola.js) con lo que se ve en pantalla:
// dibuja la estructura y actualiza el panel de explicación.
 
// 1. Creamos una instancia de la cola que vamos a usar en toda la página.
const miCola = new Cola();
 
// 2. Referencias a los elementos del HTML.
const contenedorCola = document.getElementById('contenedor-cola');
const panelExplicacion = document.getElementById('explicacion');
const inputValor = document.getElementById('valor-input');
 
// 3. Cargamos 3 elementos de ejemplo para que la página no se vea vacía al abrir.
miCola.enqueue(10);
miCola.enqueue(20);
miCola.enqueue(30);
 
// Dibuja (o vuelve a dibujar) toda la cola dentro del contenedor.
function actualizarDibujo() {
  // Limpiamos el contenedor y lo volvemos a construir desde cero.
  contenedorCola.innerHTML = '';
 
  const valores = miCola.mostrar();
 
  if (valores.length === 0) {
    const vacio = document.createElement('p');
    vacio.className = 'cola__vacio';
    vacio.textContent = 'La cola está vacía.';
    contenedorCola.appendChild(vacio);
    return;
  }
 
  valores.forEach((valor, indice) => {
    // Contenedor vertical: etiqueta arriba + caja abajo.
    const item = document.createElement('div');
    item.className = 'cola__item';
 
    const etiqueta = document.createElement('span');
    etiqueta.className = 'cola__etiqueta';
    if (indice === 0) {
      etiqueta.textContent = 'Frente';
    } else if (indice === valores.length - 1) {
      etiqueta.textContent = 'Final';
    } else {
      etiqueta.textContent = '\u00A0'; // espacio para mantener alineadas las cajas
    }
 
    const caja = document.createElement('div');
    caja.className = 'cola__caja';
    caja.textContent = valor;
    if (indice === 0) {
      caja.classList.add('cola__caja--frente');
    }
 
    item.appendChild(etiqueta);
    item.appendChild(caja);
    contenedorCola.appendChild(item);
 
    // Flecha entre cajas, menos después de la última.
    if (indice < valores.length - 1) {
      const flecha = document.createElement('span');
      flecha.className = 'cola__flecha';
      flecha.textContent = '→';
      contenedorCola.appendChild(flecha);
    }
  });
}
 
// Actualiza el texto del panel de explicación.
function actualizarExplicacion(mensaje) {
  panelExplicacion.textContent = mensaje;
}
 
// Botón "Insertar" (enqueue): agrega el valor del input al final de la cola.
function insertarVisual() {
  const texto = inputValor.value.trim();
 
  if (texto === '') {
    actualizarExplicacion('Escribe un valor antes de insertar.');
    return;
  }
 
  miCola.enqueue(texto);
  actualizarDibujo();
  actualizarExplicacion(`Se insertó "${texto}" al final de la cola (enqueue).`);
 
  inputValor.value = '';
  inputValor.focus();
}
 
// Botón "Eliminar" (dequeue): quita el elemento del frente de la cola.
function eliminarVisual() {
  if (miCola.estaVacia()) {
    actualizarExplicacion('La cola está vacía, no se puede eliminar.');
    return;
  }
 
  const valorEliminado = miCola.dequeue();
  actualizarDibujo();
  actualizarExplicacion(`Se eliminó "${valorEliminado}" del frente de la cola (dequeue).`);
}
 
// 4. Dibujo inicial al cargar la página, con los elementos de ejemplo ya puestos.
actualizarDibujo();
actualizarExplicacion('Cola cargada con 3 elementos de ejemplo. Prueba insertar o eliminar.');