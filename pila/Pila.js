/* =========================================================
   Pila.js — Lógica de la estructura de datos PILA (Stack)
   -----------------------------------------------------------
   Este archivo NO debe tener nada de HTML ni manipulación de
   pantalla. Solo la clase y sus métodos, igual que se haría
   en C++, pero en JavaScript.
   ========================================================= */

class Pila {
  constructor() {
    // Usamos un arreglo como almacenamiento interno.
    // El final del arreglo (items[items.length - 1]) representa el TOPE de la pila.
    this.items = [];
  }

  /**
   * Inserta un elemento en el tope de la pila.
   * Complejidad: O(1)
   */
  push(valor) {
    this.items.push(valor);
  }

  /**
   * Elimina y retorna el elemento que está en el tope de la pila.
   * Si la pila está vacía, retorna null en vez de lanzar un error.
   * Complejidad: O(1)
   */
  pop() {
    if (this.estaVacia()) {
      return null;
    }
    return this.items.pop();
  }

  /**
   * Retorna el valor del tope sin eliminarlo.
   */
  verTope() {
    if (this.estaVacia()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  /**
   * Indica si la pila no tiene elementos.
   */
  estaVacia() {
    return this.items.length === 0;
  }

  /**
   * Cantidad de elementos actuales en la pila.
   */
  tamano() {
    return this.items.length;
  }

  /**
   * Retorna una copia del arreglo interno, ordenado de la BASE al TOPE.
   * Se usa solo para dibujar la pila en pantalla (pila.render.js),
   * nunca para modificar el estado real de la estructura.
   */
  obtenerElementos() {
    return [...this.items];
  }
}
