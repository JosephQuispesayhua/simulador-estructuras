// Definición del Nodo de la lista enlazada
class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null; // Puntero al siguiente nodo
    }
}

// Clase que gestiona la Lista Enlazada
class ListaEnlazada {
    constructor() {
        this.cabeza = null; // Primer nodo de la lista
        this.tamanio = 0;
    }

    // Insertar un nuevo nodo al final de la lista
    insertarAlFinal(valor) {
        const nuevoNodo = new Nodo(valor);
        
        if (this.cabeza === null) {
            this.cabeza = nuevoNodo;
        } else {
            let actual = this.cabeza;
            // Recorremos la lista hasta llegar al último nodo
            while (actual.siguiente !== null) {
                actual = actual.siguiente;
            }
            // Conectamos el último nodo con el nuevo
            actual.siguiente = nuevoNodo;
        }
        this.tamanio++;
    }

    // Insertar un nuevo nodo al inicio (Cabeza) de la lista
    insertarAlInicio(valor) {
        const nuevoNodo = new Nodo(valor);
        
        // El nuevo nodo apunta al que antes era el primero
        nuevoNodo.siguiente = this.cabeza;
        // Ahora la cabeza de la lista es nuestro nuevo nodo
        this.cabeza = nuevoNodo;
        this.tamanio++;
    }

    // Eliminar un nodo por su valor específico
    eliminarPorValor(valor) {
        if (this.cabeza === null) return false; // Lista vacía

        // Caso especial: El nodo a eliminar es la cabeza (primer nodo)
        if (this.cabeza.valor === valor) {
            this.cabeza = this.cabeza.siguiente;
            this.tamanio--;
            return true;
        }

        let actual = this.cabeza;
        let anterior = null;

        // Buscamos el nodo con el valor solicitado
        while (actual !== null && actual.valor !== valor) {
            anterior = actual;
            actual = actual.siguiente;
        }

        // Si encontramos el nodo, reajustamos los punteros para "saltarlo"
        if (actual !== null) {
            anterior.siguiente = actual.siguiente;
            this.tamanio--;
            return true;
        }

        return false; // Valor no encontrado en la lista
    }

    // Convierte la estructura a un array simple para facilitar la renderización
    toArray() {
        const elementos = [];
        let actual = this.cabeza;
        while (actual !== null) {
            elementos.push(actual.valor);
            actual = actual.siguiente;
        }
        return elementos;
    }
}