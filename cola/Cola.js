// Cola.js
// Lógica pura de la estructura de datos "Cola" (FIFO: First In, First Out).
// No debe contener nada de HTML ni manipulación de la pantalla.
 
class Cola {
  constructor() {
    // Guardamos los elementos en un arreglo normal.
    // El primer elemento del arreglo (índice 0) es el "frente" de la cola.
    this.elementos = [];
  }
 
  // Agrega un valor al final de la cola.
  enqueue(valor) {
    this.elementos.push(valor);
  }
 
  // Quita y devuelve el elemento del frente de la cola.
  // Si la cola está vacía, devuelve null en vez de romper el programa.
  dequeue() {
    if (this.estaVacia()) {
      return null;
    }
    return this.elementos.shift();
  }
 
  // Devuelve el valor que está en el frente sin quitarlo.
  frente() {
    if (this.estaVacia()) {
      return null;
    }
    return this.elementos[0];
  }
 
  // Indica si la cola no tiene elementos.
  estaVacia() {
    return this.elementos.length === 0;
  }
 
  // Devuelve cuántos elementos hay en la cola.
  tamano() {
    return this.elementos.length;
  }
 
  // Devuelve una copia del arreglo interno, útil para dibujar en pantalla.
  mostrar() {
    return [...this.elementos];
  }
}