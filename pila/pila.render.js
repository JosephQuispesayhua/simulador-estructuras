/* =========================================================
   pila.render.js — Conecta Pila.js con la interfaz visual
   -----------------------------------------------------------
   Aquí SÍ se toca el DOM: dibujar las cajas, actualizar el
   panel de explicación y reaccionar a los botones.
   ========================================================= */

// Instancia única de la estructura para esta página
const miPila = new Pila();

// Referencias a elementos del HTML
const $torre = document.getElementById('torre-pila');
const $explicacion = document.getElementById('explicacion');
const $input = document.getElementById('valor-input');
const $btnPush = document.getElementById('btn-push');
const $btnPop = document.getElementById('btn-pop');
const $contador = document.getElementById('contador-pila');

/**
 * Vuelve a dibujar todas las cajas de la pila en pantalla,
 * a partir del estado actual de miPila.
 */
function actualizarDibujo() {
  $torre.innerHTML = '';
  const elementos = miPila.obtenerElementos(); // [base, ..., tope]

  if (elementos.length === 0) {
    const vacio = document.createElement('p');
    vacio.className = 'torre-pila__vacio';
    vacio.textContent = 'La pila está vacía.';
    $torre.appendChild(vacio);
  } else {
    elementos.forEach((valor, indice) => {
      const esTope = indice === elementos.length - 1;
      const caja = document.createElement('div');
      caja.className = 'caja-pila' + (esTope ? ' caja-pila--tope' : '');
      caja.textContent = valor;
      if (esTope) {
        const etiqueta = document.createElement('span');
        etiqueta.className = 'caja-pila__etiqueta';
        etiqueta.textContent = 'TOPE';
        caja.appendChild(etiqueta);
      }
      $torre.appendChild(caja);
    });
  }

  $contador.textContent = `Tamaño actual: ${miPila.tamano()} elemento${miPila.tamano() === 1 ? '' : 's'}`;
}

/**
 * Actualiza el panel de texto que explica la última operación realizada.
 * tipo: 'info' | 'exito' | 'advertencia' (cambia el color del panel)
 */
function actualizarExplicacion(mensaje, tipo = 'info') {
  $explicacion.textContent = mensaje;
  $explicacion.dataset.tipo = tipo;
}

/**
 * Anima brevemente la caja que acaba de insertarse (la del tope).
 */
function animarCajaNueva() {
  const cajas = $torre.querySelectorAll('.caja-pila');
  const ultima = cajas[cajas.length - 1];
  if (ultima) {
    ultima.classList.add('caja-pila--animando');
    setTimeout(() => ultima.classList.remove('caja-pila--animando'), 300);
  }
}

/**
 * Maneja el click / Enter para insertar (PUSH).
 */
function manejarPush() {
  const valor = $input.value.trim();

  if (valor === '') {
    actualizarExplicacion('Escribe un valor en el campo de texto antes de insertar.', 'advertencia');
    $input.focus();
    return;
  }

  miPila.push(valor);
  actualizarDibujo();
  animarCajaNueva();
  actualizarExplicacion(`PUSH: se insertó "${valor}" en el tope de la pila. Ahora es el único elemento accesible directamente.`, 'exito');

  $input.value = '';
  $input.focus();
}

/**
 * Maneja el click para eliminar (POP).
 */
function manejarPop() {
  if (miPila.estaVacia()) {
    actualizarExplicacion('POP no realizado: la pila está vacía, no hay ningún elemento en el tope para eliminar.', 'advertencia');
    return;
  }

  const valorEliminado = miPila.pop();
  actualizarDibujo();
  actualizarExplicacion(`POP: se eliminó "${valorEliminado}", que era el elemento del tope. Ahora el tope pasa a ser el siguiente elemento de abajo.`, 'exito');
}

// ---------- Eventos ----------
$btnPush.addEventListener('click', manejarPush);
$btnPop.addEventListener('click', manejarPop);
$input.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    evento.preventDefault();
    manejarPush();
  }
});

// ---------- Estado inicial de ejemplo ----------
// Para que la página no se vea vacía al abrirla.
['A', 'B', 'C'].forEach((valor) => miPila.push(valor));
actualizarDibujo();
actualizarExplicacion('Pila cargada con 3 elementos de ejemplo (A, B, C). "C" es el tope actual. Prueba PUSH y POP.');
