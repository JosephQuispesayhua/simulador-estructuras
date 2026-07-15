/* =========================================================
   pila.render.js — Conecta Pila.js con la interfaz visual
   -----------------------------------------------------------
   IMPORTANTE sobre el orden de dibujo:
   Pila.js (versión con lista enlazada) devuelve obtenerElementos()
   en orden TOPE -> BASE. Por eso el contenedor .torre-pila usa
   flex-direction: column (normal) + justify-content: flex-end
   en pila.css: así el PRIMER elemento del arreglo (el tope) se
   dibuja arriba de la torre, y la torre entera se ancla abajo
   (como si tuviera piso). Insertar y eliminar siempre ocurre
   arriba, nunca abajo.
   ========================================================= */

// Pila principal del simulador
const miPila = new Pila();
// Pila secundaria, solo para el módulo de comparación
const pilaSecundaria = new Pila();

// ---------- Referencias: pila principal ----------
const $torre = document.getElementById('torre-pila');
const $contador = document.getElementById('contador-pila');
const $explicacion = document.getElementById('explicacion');

const $input = document.getElementById('valor-input');
const $btnPush = document.getElementById('btn-push');
const $btnPop = document.getElementById('btn-pop');

const $btnVerTope = document.getElementById('btn-ver-tope');
const $btnTamano = document.getElementById('btn-tamano');
const $btnInvertir = document.getElementById('btn-invertir');
const $btnVaciar = document.getElementById('btn-vaciar');

const $inputBuscar = document.getElementById('buscar-input');
const $btnBuscar = document.getElementById('btn-buscar');

const $btnToggleComparar = document.getElementById('btn-toggle-comparar');
const $seccionComparar = document.getElementById('seccion-comparar');

// ---------- Referencias: pila secundaria (comparación) ----------
const $torreSec = document.getElementById('torre-pila-secundaria');
const $contadorSec = document.getElementById('contador-pila-secundaria');
const $explicacionComparacion = document.getElementById('explicacion-comparacion');

const $inputSec = document.getElementById('valor-input-secundaria');
const $btnPushSec = document.getElementById('btn-push-secundaria');
const $btnPopSec = document.getElementById('btn-pop-secundaria');
const $btnVaciarSec = document.getElementById('btn-vaciar-secundaria');
const $btnComparar = document.getElementById('btn-comparar');


/**
 * Dibuja una pila dentro de un contenedor dado.
 * elementos[0] es el TOPE (así lo entrega Pila.js), por lo que
 * se dibuja primero => queda arriba de la torre.
 */
function dibujarPila(pila, contenedorEl, contadorEl) {
  contenedorEl.innerHTML = '';
  const elementos = pila.obtenerElementos(); // [tope, ..., base]

  if (elementos.length === 0) {
    const vacio = document.createElement('p');
    vacio.className = 'torre-pila__vacio';
    vacio.textContent = 'Pila vacía.';
    contenedorEl.appendChild(vacio);
  } else {
    elementos.forEach((valor, indice) => {
      const esTope = indice === 0; // el primer elemento del arreglo ES el tope
      const caja = document.createElement('div');
      caja.className = 'caja-pila' + (esTope ? ' caja-pila--tope' : '');
      caja.textContent = valor;
      if (esTope) {
        const etiqueta = document.createElement('span');
        etiqueta.className = 'caja-pila__etiqueta';
        etiqueta.textContent = 'TOPE';
        caja.appendChild(etiqueta);
      }
      contenedorEl.appendChild(caja);
    });
  }

  contadorEl.textContent = `Tamaño actual: ${pila.tamano()} elemento${pila.tamano() === 1 ? '' : 's'}`;
}

function animarCajaNueva(contenedorEl) {
  // El tope siempre es el PRIMER hijo dibujado (ver dibujarPila)
  const primera = contenedorEl.querySelector('.caja-pila');
  if (primera) {
    primera.classList.add('caja-pila--animando');
    setTimeout(() => primera.classList.remove('caja-pila--animando'), 300);
  }
}

function actualizarExplicacion(mensaje, tipo = 'info') {
  $explicacion.textContent = mensaje;
  $explicacion.dataset.tipo = tipo;
}

function actualizarExplicacionComparacion(mensaje, tipo = 'info') {
  $explicacionComparacion.textContent = mensaje;
  $explicacionComparacion.dataset.tipo = tipo;
}

// ======================================================
// Acciones sobre la pila PRINCIPAL
// ======================================================

function manejarPush() {
  const valor = $input.value.trim();
  if (valor === '') {
    actualizarExplicacion('Escribe un valor antes de insertar.', 'advertencia');
    $input.focus();
    return;
  }
  miPila.push(valor);
  dibujarPila(miPila, $torre, $contador);
  animarCajaNueva($torre);
  actualizarExplicacion(`PUSH: se insertó "${valor}" en el tope. Ahora "${valor}" es el único elemento accesible directamente.`, 'exito');
  $input.value = '';
  $input.focus();
}

function manejarPop() {
  if (miPila.estaVacia()) {
    actualizarExplicacion('POP no realizado: la pila está vacía.', 'advertencia');
    return;
  }
  const eliminado = miPila.pop();
  dibujarPila(miPila, $torre, $contador);
  const nuevoTope = miPila.verTope();
  actualizarExplicacion(
    `POP: se eliminó "${eliminado}", que era el tope. ${nuevoTope !== null ? `Ahora el tope es "${nuevoTope}".` : 'La pila quedó vacía.'}`,
    'exito'
  );
}

function manejarVerTope() {
  if (miPila.estaVacia()) {
    actualizarExplicacion('La pila está vacía: no hay ningún elemento en el tope.', 'advertencia');
    return;
  }
  actualizarExplicacion(`VER TOPE: el elemento del tope es "${miPila.verTope()}".`, 'info');
}

function manejarTamano() {
  actualizarExplicacion(`TAMAÑO: la pila tiene actualmente ${miPila.tamano()} elemento${miPila.tamano() === 1 ? '' : 's'}.`, 'info');
}

function manejarBuscar() {
  const valor = $inputBuscar.value.trim();
  if (valor === '') {
    actualizarExplicacion('Escribe un valor en el campo de búsqueda.', 'advertencia');
    $inputBuscar.focus();
    return;
  }
  const existe = miPila.buscar(valor);
  if (existe) {
    const pos = miPila.posicion(valor);
    actualizarExplicacion(`BUSCAR: "${valor}" sí está en la pila, en la posición ${pos} contando desde el tope (tope = posición 0).`, 'exito');
  } else {
    actualizarExplicacion(`BUSCAR: "${valor}" no se encuentra en la pila.`, 'advertencia');
  }
}

function manejarInvertir() {
  if (miPila.estaVacia()) {
    actualizarExplicacion('No hay nada que invertir: la pila está vacía.', 'advertencia');
    return;
  }
  miPila.invertir();
  dibujarPila(miPila, $torre, $contador);
  actualizarExplicacion('INVERTIR: se invirtió el orden de la pila completa. Lo que antes era la base ahora es el tope.', 'exito');
}

function manejarVaciar() {
  if (miPila.estaVacia()) {
    actualizarExplicacion('La pila ya está vacía.', 'advertencia');
    return;
  }
  miPila.vaciar();
  dibujarPila(miPila, $torre, $contador);
  actualizarExplicacion('VACIAR: se eliminaron todos los elementos de la pila.', 'exito');
}

// ======================================================
// Mostrar / ocultar la sección de comparación
// ======================================================

function manejarToggleComparar() {
  const estaOculta = $seccionComparar.style.display === 'none';

  if (estaOculta) {
    $seccionComparar.style.display = '';
    $btnToggleComparar.textContent = 'Ocultar comparación';
    $seccionComparar.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    $seccionComparar.style.display = 'none';
    $btnToggleComparar.textContent = 'Comparar con otra pila';
  }
}

// ======================================================
// Acciones sobre la pila SECUNDARIA (para comparar)
// ======================================================

function manejarPushSecundaria() {
  const valor = $inputSec.value.trim();
  if (valor === '') {
    actualizarExplicacionComparacion('Escribe un valor antes de insertar en la pila secundaria.', 'advertencia');
    $inputSec.focus();
    return;
  }
  pilaSecundaria.push(valor);
  dibujarPila(pilaSecundaria, $torreSec, $contadorSec);
  animarCajaNueva($torreSec);
  actualizarExplicacionComparacion(`Se insertó "${valor}" en la pila secundaria.`, 'info');
  $inputSec.value = '';
  $inputSec.focus();
}

function manejarPopSecundaria() {
  if (pilaSecundaria.estaVacia()) {
    actualizarExplicacionComparacion('La pila secundaria está vacía.', 'advertencia');
    return;
  }
  const eliminado = pilaSecundaria.pop();
  dibujarPila(pilaSecundaria, $torreSec, $contadorSec);
  actualizarExplicacionComparacion(`Se eliminó "${eliminado}" de la pila secundaria.`, 'info');
}

function manejarVaciarSecundaria() {
  if (pilaSecundaria.estaVacia()) {
    actualizarExplicacionComparacion('La pila secundaria ya está vacía.', 'advertencia');
    return;
  }
  pilaSecundaria.vaciar();
  dibujarPila(pilaSecundaria, $torreSec, $contadorSec);
  actualizarExplicacionComparacion('Se vació la pila secundaria.', 'info');
}

function manejarComparar() {
  const sonIguales = miPila.equals(pilaSecundaria);
  const elementosPrincipal = miPila.obtenerElementos().join(', ') || 'vacía';
  const elementosSecundaria = pilaSecundaria.obtenerElementos().join(', ') || 'vacía';

  if (sonIguales) {
    actualizarExplicacionComparacion(
      `COMPARAR: las dos pilas son IGUALES (mismos elementos, mismo orden desde el tope). Principal: [${elementosPrincipal}] · Secundaria: [${elementosSecundaria}].`,
      'exito'
    );
  } else {
    actualizarExplicacionComparacion(
      `COMPARAR: las pilas son DIFERENTES. Principal: [${elementosPrincipal}] · Secundaria: [${elementosSecundaria}].`,
      'advertencia'
    );
  }
}

// ======================================================
// Eventos
// ======================================================

$btnPush.addEventListener('click', manejarPush);
$btnPop.addEventListener('click', manejarPop);
$btnVerTope.addEventListener('click', manejarVerTope);
$btnTamano.addEventListener('click', manejarTamano);
$btnInvertir.addEventListener('click', manejarInvertir);
$btnVaciar.addEventListener('click', manejarVaciar);
$btnBuscar.addEventListener('click', manejarBuscar);
$btnToggleComparar.addEventListener('click', manejarToggleComparar);

$input.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    evento.preventDefault();
    manejarPush();
  }
});
$inputBuscar.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    evento.preventDefault();
    manejarBuscar();
  }
});

$btnPushSec.addEventListener('click', manejarPushSecundaria);
$btnPopSec.addEventListener('click', manejarPopSecundaria);
$btnVaciarSec.addEventListener('click', manejarVaciarSecundaria);
$btnComparar.addEventListener('click', manejarComparar);
$inputSec.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    evento.preventDefault();
    manejarPushSecundaria();
  }
});

// ======================================================
// Estado inicial de ejemplo
// ======================================================
['A', 'B', 'C'].forEach((valor) => miPila.push(valor));
['A', 'B', 'C'].forEach((valor) => pilaSecundaria.push(valor));

dibujarPila(miPila, $torre, $contador);
dibujarPila(pilaSecundaria, $torreSec, $contadorSec);

actualizarExplicacion('Pila cargada con 3 elementos de ejemplo (A, B, C). "C" es el tope actual. Prueba los botones de arriba.');
actualizarExplicacionComparacion('La pila secundaria se cargó igual que la principal (A, B, C), para que puedas probar "Comparar" de una vez.');