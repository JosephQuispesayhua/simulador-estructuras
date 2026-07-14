// ===============================
// Nodo del Árbol Binario
// ===============================

class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.izquierda = null;
        this.derecha = null;
    }
}

// ===============================
// Árbol Binario de Búsqueda (BST)
// ===============================

class Arbol {

    constructor() {
        this.raiz = null;
    }

    // -----------------------------
    // Insertar
    // -----------------------------
    insertar(valor) {

        if (this.raiz === null) {
            this.raiz = new Nodo(valor);
            return true;
        }

        return this.#insertarRec(this.raiz, valor);
    }

    #insertarRec(nodo, valor) {

        // No permitir repetidos
        if (valor === nodo.valor)
            return false;

        if (valor < nodo.valor) {

            if (nodo.izquierda === null) {
                nodo.izquierda = new Nodo(valor);
                return true;
            }

            return this.#insertarRec(nodo.izquierda, valor);

        } else {

            if (nodo.derecha === null) {
                nodo.derecha = new Nodo(valor);
                return true;
            }

            return this.#insertarRec(nodo.derecha, valor);

        }

    }

    // -----------------------------
    // Buscar
    // -----------------------------
    buscar(valor) {
        return this.#buscarRec(this.raiz, valor);
    }

    #buscarRec(nodo, valor) {

        if (nodo === null)
            return false;

        if (valor === nodo.valor)
            return true;

        if (valor < nodo.valor)
            return this.#buscarRec(nodo.izquierda, valor);

        return this.#buscarRec(nodo.derecha, valor);

    }

    // -----------------------------
    // Eliminar
    // -----------------------------
    eliminar(valor) {

        if (!this.buscar(valor))
            return false;

        this.raiz = this.#eliminarRec(this.raiz, valor);

        return true;
    }

    #eliminarRec(nodo, valor) {

        if (nodo === null)
            return null;

        if (valor < nodo.valor) {

            nodo.izquierda =
                this.#eliminarRec(nodo.izquierda, valor);

        }

        else if (valor > nodo.valor) {

            nodo.derecha =
                this.#eliminarRec(nodo.derecha, valor);

        }

        else {

            // Caso 1: sin hijos
            if (nodo.izquierda === null &&
                nodo.derecha === null)
                return null;

            // Caso 2: un hijo derecho
            if (nodo.izquierda === null)
                return nodo.derecha;

            // Caso 2: un hijo izquierdo
            if (nodo.derecha === null)
                return nodo.izquierda;

            // Caso 3: dos hijos

            let sucesor =
                this.#minimo(nodo.derecha);

            nodo.valor = sucesor.valor;

            nodo.derecha =
                this.#eliminarRec(
                    nodo.derecha,
                    sucesor.valor
                );

        }

        return nodo;

    }

    // -----------------------------
    // Encontrar mínimo
    // -----------------------------
    #minimo(nodo) {

        while (nodo.izquierda !== null)
            nodo = nodo.izquierda;

        return nodo;

    }

    // -----------------------------
    // Limpiar árbol
    // -----------------------------
    limpiar() {
        this.raiz = null;
    }

    // -----------------------------
    // Preorden
    // -----------------------------
    preorden() {

        let resultado = [];

        this.#preordenRec(this.raiz, resultado);

        return resultado;

    }

    #preordenRec(nodo, arreglo) {

        if (nodo === null)
            return;

        arreglo.push(nodo.valor);

        this.#preordenRec(nodo.izquierda, arreglo);

        this.#preordenRec(nodo.derecha, arreglo);

    }

    // -----------------------------
    // Inorden
    // -----------------------------
    inorden() {

        let resultado = [];

        this.#inordenRec(this.raiz, resultado);

        return resultado;

    }

    #inordenRec(nodo, arreglo) {

        if (nodo === null)
            return;

        this.#inordenRec(nodo.izquierda, arreglo);

        arreglo.push(nodo.valor);

        this.#inordenRec(nodo.derecha, arreglo);

    }

    // -----------------------------
    // Postorden
    // -----------------------------
    postorden() {

        let resultado = [];

        this.#postordenRec(this.raiz, resultado);

        return resultado;

    }

    #postordenRec(nodo, arreglo) {

        if (nodo === null)
            return;

        this.#postordenRec(nodo.izquierda, arreglo);

        this.#postordenRec(nodo.derecha, arreglo);

        arreglo.push(nodo.valor);

    }

    // -----------------------------
    // Altura del árbol
    // -----------------------------
    altura() {
        return this.#alturaRec(this.raiz);
    }

    #alturaRec(nodo) {

        if (nodo === null)
            return 0;

        return 1 + Math.max(
            this.#alturaRec(nodo.izquierda),
            this.#alturaRec(nodo.derecha)
        );

    }

}