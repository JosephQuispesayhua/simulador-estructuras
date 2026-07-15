// cola.render.js
// Conecta la clase Cola (Cola.js) con lo que se ve en pantalla:
// dibuja las estructuras y actualiza el panel de explicación.
 
// 1. Creamos DOS instancias de Cola: una principal (A) y otra para comparar (B).
const colaA = new Cola();
const colaB = new Cola();
 
// 2. Referencias a los elementos del HTML.
const contenedorColaA = document.getElementById('contenedor-cola-a');
const contenedorColaB = document.getElementById('contenedor-cola-b');
const panelExplicacion = document.getElementById('explicacion');
const inputValorA = document.getElementById('valor-input-a');
const inputValorB = document.getElementById('valor-input-b');
 
// 3. Cargamos las mismas 3 elementos de ejemplo en ambas colas, así empiezan iguales.
// Los ponemos como texto ("10") y no como número (10), porque lo que el usuario
// escribe en el input SIEMPRE llega como texto — así comparaciones como equals()
// funcionan de forma consistente sin importar si el valor vino del código o del input.
colaA.enqueue("10");
colaA.enqueue("20");
colaA.enqueue("30");
colaB.enqueue("10");
colaB.enqueue("20");
colaB.enqueue("30");
 
// Dibuja (o vuelve a dibujar) una cola dentro de un contenedor dado.
// Esta función se reutiliza para la Cola A y la Cola B.
function dibujarCola(cola, contenedor) {
  contenedor.innerHTML = '';
 
  const valores = cola.mostrar();
 
  if (valores.length === 0) {
    const vacio = document.createElement('p');
    vacio.className = 'cola__vacio';
    vacio.textContent = 'La cola está vacía.';
    contenedor.appendChild(vacio);
    return;
  }
 
  valores.forEach((valor, indice) => {
    const item = document.createElement('div');
    item.className = 'cola__item';
 
    const etiqueta = document.createElement('span');
    etiqueta.className = 'cola__etiqueta';
    if (indice === 0) {
      etiqueta.textContent = 'Frente';
    } else if (indice === valores.length - 1) {
      etiqueta.textContent = 'Final';
    } else {
      etiqueta.textContent = '\u00A0';
    }
 
    const caja = document.createElement('div');
    caja.className = 'cola__caja';
    caja.textContent = valor;
    if (indice === 0) {
      caja.classList.add('cola__caja--frente');
    }
 
    item.appendChild(etiqueta);
    item.appendChild(caja);
    contenedor.appendChild(item);
 
    if (indice < valores.length - 1) {
      const flecha = document.createElement('span');
      flecha.className = 'cola__flecha';
      flecha.textContent = '→';
      contenedor.appendChild(flecha);
    }
  });
}
 
// Actualiza el texto del panel de explicación.
function actualizarExplicacion(mensaje) {
  panelExplicacion.textContent = mensaje;
}
 
/* ---------- Operaciones sobre la Cola A ---------- */
 
// Botón "Insertar" en A (enqueue).
function insertarVisualA() {
  const texto = inputValorA.value.trim();
  if (texto === '') {
    actualizarExplicacion('Escribe un valor antes de insertar en la Cola A.');
    return;
  }
  colaA.enqueue(texto);
  dibujarCola(colaA, contenedorColaA);
  actualizarExplicacion(`Se insertó "${texto}" al final de la Cola A.`);
  inputValorA.value = '';
  inputValorA.focus();
}
 
// Botón "Eliminar" en A (dequeue).
function eliminarVisualA() {
  if (colaA.estaVacia()) {
    actualizarExplicacion('La Cola A está vacía, no se puede eliminar.');
    return;
  }
  const valorEliminado = colaA.dequeue();
  dibujarCola(colaA, contenedorColaA);
  actualizarExplicacion(`Se eliminó "${valorEliminado}" del frente de la Cola A.`);
}
 
// Botón "Ver frente" (verFrente): muestra el valor del frente de la Cola A.
function verFrenteVisual() {
  if (colaA.estaVacia()) {
    actualizarExplicacion('La Cola A está vacía, no hay un frente que mostrar.');
    return;
  }
  const valor = colaA.verFrente();
  actualizarExplicacion(`El elemento en el frente de la Cola A es "${valor}".`);
}
 
// Botón "Tamaño" (tamano): muestra cuántos elementos hay en la Cola A.
function tamanoVisual() {
  actualizarExplicacion(`La Cola A tiene actualmente ${colaA.tamano()} elemento(s).`);
}
 
// Botón "Vaciar" (vaciar): elimina todos los elementos de la Cola A.
function vaciarVisual() {
  if (colaA.estaVacia()) {
    actualizarExplicacion('La Cola A ya está vacía.');
    return;
  }
  colaA.vaciar();
  dibujarCola(colaA, contenedorColaA);
  actualizarExplicacion('Se vació la Cola A por completo.');
}
 
// Botón "Buscar" (buscar): busca el valor del input dentro de la Cola A.
function buscarVisual() {
  const texto = inputValorA.value.trim();
  if (texto === '') {
    actualizarExplicacion('Escribe un valor en el campo de la Cola A para buscarlo.');
    return;
  }
  const existe = colaA.buscar(texto);
  actualizarExplicacion(
    existe
      ? `"${texto}" SÍ está en la Cola A.`
      : `"${texto}" NO está en la Cola A.`
  );
}
 
// Botón "Invertir" (invertir): invierte el orden de la Cola A.
function invertirVisual() {
  if (colaA.estaVacia()) {
    actualizarExplicacion('La Cola A está vacía, no hay nada que invertir.');
    return;
  }
  colaA.invertir();
  dibujarCola(colaA, contenedorColaA);
  actualizarExplicacion('Se invirtió el orden de la Cola A : el frente y el final intercambiaron de lugar.');
}
 
/* ---------- Operaciones sobre la Cola B ---------- */
 
// Botón "Insertar" en B (enqueue).
function insertarVisualB() {
  const texto = inputValorB.value.trim();
  if (texto === '') {
    actualizarExplicacion('Escribe un valor antes de insertar en la Cola B.');
    return;
  }
  colaB.enqueue(texto);
  dibujarCola(colaB, contenedorColaB);
  actualizarExplicacion(`Se insertó "${texto}" al final de la Cola B .`);
  inputValorB.value = '';
  inputValorB.focus();
}
 
// Botón "Eliminar" en B (dequeue).
function eliminarVisualB() {
  if (colaB.estaVacia()) {
    actualizarExplicacion('La Cola B está vacía, no se puede eliminar.');
    return;
  }
  const valorEliminado = colaB.dequeue();
  dibujarCola(colaB, contenedorColaB);
  actualizarExplicacion(`Se eliminó "${valorEliminado}" del frente de la Cola B .`);
}
 
/* ---------- Mostrar / ocultar la comparación ---------- */
 
// Referencia a la sección oculta de la Cola B.
const seccionComparar = document.getElementById('seccion-comparar');
const botonToggleComparar = document.getElementById('boton-toggle-comparar');
 
// Botón "Comparar con otra cola": muestra u oculta la Cola B y el botón de comparar.
function toggleComparar() {
  const estaOculta = seccionComparar.style.display === 'none';
 
  if (estaOculta) {
    seccionComparar.style.display = 'block';
    botonToggleComparar.textContent = 'Ocultar comparación';
    dibujarCola(colaB, contenedorColaB);
    actualizarExplicacion('Se activó la Cola B. Modifícala y usa "Comparar Cola A con Cola B".');
  } else {
    seccionComparar.style.display = 'none';
    botonToggleComparar.textContent = 'Comparar con otra cola';
  }
}
 
/* ---------- Comparar A y B ---------- */
 
// Botón "Comparar colas" (equals): compara la Cola A contra la Cola B.
function compararVisual() {
  const sonIguales = colaA.equals(colaB);
  actualizarExplicacion(
    sonIguales
      ? 'La Cola A y la Cola B SÍ son iguales : mismos elementos, mismo orden.'
      : 'La Cola A y la Cola B NO son iguales : tienen distinto contenido u orden.'
  );
}
 
// 4. Dibujo inicial al cargar la página. La Cola B se dibuja cuando se muestra (toggleComparar).
dibujarCola(colaA, contenedorColaA);
actualizarExplicacion('Cola A cargada con 3 elementos de ejemplo..');