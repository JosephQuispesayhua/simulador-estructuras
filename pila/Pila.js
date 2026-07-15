/*=========================================================
  Pila.js
  ---------------------------------------------------------
  Implementación completa de una PILA (Stack)
  utilizando una lista enlazada simple.
  ========================================================= */

//Clase Nodo
class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}

//Clase Pila
class Pila {

  constructor() {
    this.tope = null;
    this.cantidad = 0;
  }

  //Inserta un elemento en el tope - Complejidad: O(1)
  push(valor) {
    const nuevo = new Nodo(valor);

    nuevo.siguiente = this.tope;
    this.tope = nuevo;

    this.cantidad++;
  }

  //Elimina el elemento del tope y lo retorna - Complejidad: O(1)
  pop() {
    if (this.estaVacia()) {
      return null;
    }

    const valor = this.tope.valor;

    this.tope = this.tope.siguiente;
    this.cantidad--;

    return valor;
  }

  //Devuelve el elemento del tope sin eliminarlo.
  verTope() {
    if (this.estaVacia()) {
      return null;
    }

    return this.tope.valor;
  }

  // Indica si la pila está vacía.
  estaVacia() {
    return this.tope === null;
  }

  //Retorna la cantidad de elementos.
  tamano() {
    return this.cantidad;
  }

  //Elimina todos los elementos de la pila.
  vaciar() {
    this.tope = null;
    this.cantidad = 0;
  }

  //Busca un elemento dentro de la pila - Retorna true si existe.
  buscar(valor) {

    let actual = this.tope;

    while (actual !== null) {

      if (actual.valor === valor) {
        return true;
      }

      actual = actual.siguiente;
    }

    return false;
  }

  //Retorna la posición del elemento - contando desde el TOPE. - TOPE = posición 0
  posicion(valor) {

    let actual = this.tope;
    let posicion = 0;

    while (actual !== null) {

      if (actual.valor === valor) {
        return posicion;
      }

      actual = actual.siguiente;
      posicion++;
    }

    return -1;
  }

  //Convierte la pila en un arreglo - Orden: TOPE -> BASE
  obtenerElementos() {

    const elementos = [];

    let actual = this.tope;

    while (actual !== null) {

      elementos.push(actual.valor);

      actual = actual.siguiente;
    }

    return elementos;
  }

  //Devuelve una copia exacta de la pila
  clonar() {

    const copia = new Pila();

    const valores = this.obtenerElementos().reverse();

    for (const valor of valores) {
      copia.push(valor);
    }

    return copia;
  }

  //Compara dos pilas - Retorna true si tienen los mismos elementos en el mismo orden.
  equals(otraPila) {

    if (!(otraPila instanceof Pila)) {
      return false;
    }

    if (this.tamano() !== otraPila.tamano()) {
      return false;
    }

    let actual1 = this.tope;
    let actual2 = otraPila.tope;

    while (actual1 !== null) {

      if (actual1.valor !== actual2.valor) {
        return false;
      }

      actual1 = actual1.siguiente;
      actual2 = actual2.siguiente;
    }

    return true;
  }

  //Invierte completamente la pila
  invertir() {

    let anterior = null;
    let actual = this.tope;

    while (actual !== null) {

      const siguiente = actual.siguiente;

      actual.siguiente = anterior;

      anterior = actual;
      actual = siguiente;
    }

    this.tope = anterior;
  }

  //Retorna una representación en texto
  toString() {

    if (this.estaVacia()) {
      return "Pila vacía";
    }

    return this.obtenerElementos().join(" -> ");
  }

}
