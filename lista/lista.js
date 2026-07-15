// Definición del Nodo
class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}

// Clase de Lista Enlazada
class ListaEnlazada {
    constructor() {
        this.cabeza = null;
        this.tamanio = 0;
    }

    insertarAlFinal(valor) {
        const nuevoNodo = new Nodo(valor);
        if (this.cabeza === null) {
            this.cabeza = nuevoNodo;
        } else {
            let actual = this.cabeza;
            while (actual.siguiente !== null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
        }
        this.tamanio++;
    }

    insertarAlInicio(valor) {
        const nuevoNodo = new Nodo(valor);
        nuevoNodo.siguiente = this.cabeza;
        this.cabeza = nuevoNodo;
        this.tamanio++;
    }

    eliminarPorValor(valor) {
        if (this.cabeza === null) return false;

        if (this.cabeza.valor === valor) {
            this.cabeza = this.cabeza.siguiente;
            this.tamanio--;
            return true;
        }

        let actual = this.cabeza;
        let anterior = null;

        while (actual !== null && actual.valor !== valor) {
            anterior = actual;
            actual = actual.siguiente;
        }

        if (actual !== null) {
            anterior.siguiente = actual.siguiente;
            this.tamanio--;
            return true;
        }

        return false;
    }

    vaciar() {
        this.cabeza = null;
        this.tamanio = 0;
    }
}