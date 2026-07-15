/* =========================================================
   Cola.js
   ---------------------------------------------------------
   Implementación de una COLA (Queue) utilizando una
   lista enlazada simple.
   ========================================================= */
 
// Clase Nodo
class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}
 
// Clase Cola
class Cola {
  constructor() {
    this.frenteNodo = null; // primer nodo (el próximo en salir)
    this.finalNodo = null;  // último nodo (el último en entrar)
    this.cantidad = 0;
  }
 
  // Inserta un elemento al final de la cola - Complejidad: O(1)
  enqueue(valor) {
    const nuevo = new Nodo(valor);
    if (this.estaVacia()) {
      this.frenteNodo = nuevo;
      this.finalNodo = nuevo;
    } else {
      this.finalNodo.siguiente = nuevo;
      this.finalNodo = nuevo;
    }
    this.cantidad++;
  }
 
  // Elimina el elemento del frente y lo retorna - Complejidad: O(1)
  dequeue() {
    if (this.estaVacia()) {
      return null;
    }
    const valor = this.frenteNodo.valor;
    this.frenteNodo = this.frenteNodo.siguiente;
    if (this.frenteNodo === null) {
      this.finalNodo = null;
    }
    this.cantidad--;
    return valor;
  }
 
  // Devuelve el elemento del frente sin eliminarlo.
  verFrente() {
    if (this.estaVacia()) {
      return null;
    }
    return this.frenteNodo.valor;
  }
 
  // Indica si la cola está vacía.
  estaVacia() {
    return this.frenteNodo === null;
  }
 
  // Retorna la cantidad de elementos en la cola.
  tamano() {
    return this.cantidad;
  }
 
  // Elimina todos los elementos de la cola de una sola vez.
  vaciar() {
    this.frenteNodo = null;
    this.finalNodo = null;
    this.cantidad = 0;
  }
 
  // Busca un valor dentro de la cola sin alterar el orden - Retorna true si existe.
  buscar(valor) {
    let actual = this.frenteNodo;
    while (actual !== null) {
      if (actual.valor === valor) {
        return true;
      }
      actual = actual.siguiente;
    }
    return false;
  }
 
  // Convierte la cola en un arreglo - Orden: FRENTE -> FINAL. Útil para dibujar en pantalla.
  mostrar() {
    const elementos = [];
    let actual = this.frenteNodo;
    while (actual !== null) {
      elementos.push(actual.valor);
      actual = actual.siguiente;
    }
    return elementos;
  }
 
  // Devuelve una copia exacta de la cola (mismos valores, mismo orden).
  clonar() {
    const copia = new Cola();
    const valores = this.mostrar();
    for (const valor of valores) {
      copia.enqueue(valor);
    }
    return copia;
  }
 
  // Compara esta cola con otra - Retorna true si tienen los mismos elementos en el mismo orden.
  equals(otraCola) {
    if (!(otraCola instanceof Cola)) {
      return false;
    }
    if (this.tamano() !== otraCola.tamano()) {
      return false;
    }
    let actual1 = this.frenteNodo;
    let actual2 = otraCola.frenteNodo;
    while (actual1 !== null) {
      if (actual1.valor !== actual2.valor) {
        return false;
      }
      actual1 = actual1.siguiente;
      actual2 = actual2.siguiente;
    }
    return true;
  }
 
  // Invierte el orden de la cola (el frente pasa a ser el final y viceversa).
  invertir() {
    let anterior = null;
    let actual = this.frenteNodo;
    this.finalNodo = this.frenteNodo;
    while (actual !== null) {
      const siguiente = actual.siguiente;
      actual.siguiente = anterior;
      anterior = actual;
      actual = siguiente;
    }
    this.frenteNodo = anterior;
  }
}