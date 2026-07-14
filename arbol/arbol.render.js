// ======================================
// arbol.render.js
// PARTE 1
// ======================================

// Crear árbol
const arbol = new Arbol();

// Elementos del HTML
const txtValor = document.getElementById("valor");

const btnInsertar = document.getElementById("btnInsertar");
const btnEliminar = document.getElementById("btnEliminar");
const btnBuscar = document.getElementById("btnBuscar");
const btnLimpiar = document.getElementById("btnLimpiar");

const explicacion = document.getElementById("explicacion");

const preorden = document.getElementById("preorden");
const inorden = document.getElementById("inorden");
const postorden = document.getElementById("postorden");

const svg = document.getElementById("svgArbol");

// ======================================
// Mostrar explicación
// ======================================

function mostrarExplicacion(texto) {

    explicacion.innerHTML = texto;

}

// ======================================
// Actualizar recorridos
// ======================================

function actualizarRecorridos() {

    preorden.textContent =
        arbol.preorden().join(" → ");

    inorden.textContent =
        arbol.inorden().join(" → ");

    postorden.textContent =
        arbol.postorden().join(" → ");

}

// ======================================
// Dibujar árbol
// ======================================

function dibujarArbol() {

    svg.innerHTML = "";

    if (arbol.raiz === null) {

        svg.innerHTML = `
        <text
            x="50%"
            y="50%"
            text-anchor="middle"
            font-size="20"
            fill="#777">

            Árbol vacío

        </text>`;

        actualizarRecorridos();

        return;
    }

    const ancho = svg.clientWidth || 900;

    dibujarNodo(
        arbol.raiz,
        ancho / 2,
        50,
        ancho / 4
    );

    actualizarRecorridos();

}

// ======================================
// BOTÓN INSERTAR
// ======================================

btnInsertar.addEventListener("click", () => {

    const valor = Number(txtValor.value);

    if (isNaN(valor)) {

        alert("Ingrese un número.");

        return;
    }

    const ok = arbol.insertar(valor);

    if (ok) {

        mostrarExplicacion(`
            <strong>Inserción realizada.</strong><br><br>

            Se insertó el valor
            <strong>${valor}</strong>.

            Durante la inserción el algoritmo
            comparó el nuevo valor con los nodos
            existentes hasta encontrar una posición
            libre respetando las reglas del Árbol
            Binario de Búsqueda.

            <br><br>

            • Menores → izquierda<br>
            • Mayores → derecha
        `);

    } else {

        mostrarExplicacion(`
            El valor
            <strong>${valor}</strong>
            ya existe dentro del árbol.

            <br><br>

            Los Árboles Binarios de Búsqueda
            utilizados en este simulador
            no permiten valores repetidos.
        `);

    }

    txtValor.value = "";

    dibujarArbol();

});

// ======================================
// BOTÓN ELIMINAR
// ======================================

btnEliminar.addEventListener("click", () => {

    const valor = Number(txtValor.value);

    if (isNaN(valor)) {

        alert("Ingrese un número.");

        return;
    }

    const ok = arbol.eliminar(valor);

    if (ok) {

        mostrarExplicacion(`
            Se eliminó correctamente
            el nodo
            <strong>${valor}</strong>.

            <br><br>

            Dependiendo de su posición,
            el algoritmo pudo aplicar uno
            de los siguientes casos:

            <br><br>

            • Nodo hoja.<br>
            • Nodo con un hijo.<br>
            • Nodo con dos hijos
            (reemplazo por sucesor).
        `);

    } else {

        mostrarExplicacion(`
            El valor
            <strong>${valor}</strong>
            no fue encontrado
            dentro del árbol.
        `);

    }

    txtValor.value = "";

    dibujarArbol();

});

// ======================================
// BOTÓN BUSCAR
// ======================================

btnBuscar.addEventListener("click", () => {

    const valor = Number(txtValor.value);

    if (isNaN(valor)) {

        alert("Ingrese un número.");

        return;
    }

    if (arbol.buscar(valor)) {

        mostrarExplicacion(`
            El valor
            <strong>${valor}</strong>
            sí pertenece al árbol.

            <br><br>

            La búsqueda comenzó desde la raíz
            comparando el valor con cada nodo
            hasta encontrarlo.
        `);

    } else {

        mostrarExplicacion(`
            El valor
            <strong>${valor}</strong>
            no se encuentra en el árbol.
        `);

    }

});

// ======================================
// BOTÓN LIMPIAR
// ======================================

btnLimpiar.addEventListener("click", () => {

    if (!confirm("¿Desea eliminar todo el árbol?"))
        return;

    arbol.limpiar();

    mostrarExplicacion(`
        El árbol fue reiniciado.

        <br><br>

        Ahora no contiene ningún nodo.
    `);

    dibujarArbol();

});

// ======================================
// DIBUJO INICIAL
// ======================================

dibujarArbol();

// ======================================
// PARTE 2
// Dibujo del Árbol Binario en SVG
// ======================================

function dibujarNodo(nodo, x, y, separacion) {

    if (nodo === null)
        return;

    const siguienteY = y + 90;

    // ------------------------------
    // Hijo izquierdo
    // ------------------------------

    if (nodo.izquierda !== null) {

        const hijoX = x - separacion;

        // Línea
        const linea = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );

        linea.setAttribute("x1", x);
        linea.setAttribute("y1", y);

        linea.setAttribute("x2", hijoX);
        linea.setAttribute("y2", siguienteY);

        linea.setAttribute("stroke", "#7A0026");
        linea.setAttribute("stroke-width", "2");

        svg.appendChild(linea);

        dibujarNodo(
            nodo.izquierda,
            hijoX,
            siguienteY,
            separacion / 2
        );

    }

    // ------------------------------
    // Hijo derecho
    // ------------------------------

    if (nodo.derecha !== null) {

        const hijoX = x + separacion;

        const linea = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );

        linea.setAttribute("x1", x);
        linea.setAttribute("y1", y);

        linea.setAttribute("x2", hijoX);
        linea.setAttribute("y2", siguienteY);

        linea.setAttribute("stroke", "#7A0026");
        linea.setAttribute("stroke-width", "2");

        svg.appendChild(linea);

        dibujarNodo(
            nodo.derecha,
            hijoX,
            siguienteY,
            separacion / 2
        );

    }

    // ------------------------------
    // Nodo (círculo)
    // ------------------------------

    const circulo = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
    );

    circulo.setAttribute("cx", x);
    circulo.setAttribute("cy", y);

    circulo.setAttribute("r", "22");

    circulo.setAttribute("fill", "#7A0026");
    circulo.setAttribute("stroke", "#4E0018");
    circulo.setAttribute("stroke-width", "3");

    svg.appendChild(circulo);

    // ------------------------------
    // Valor del nodo
    // ------------------------------

    const texto = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
    );

    texto.setAttribute("x", x);
    texto.setAttribute("y", y + 6);

    texto.setAttribute("text-anchor", "middle");

    texto.setAttribute("font-size", "16");
    texto.setAttribute("font-weight", "bold");

    texto.setAttribute("fill", "white");

    texto.textContent = nodo.valor;

    svg.appendChild(texto);

}

// ======================================
// Ajustar dibujo cuando cambia
// el tamaño de la ventana
// ======================================

window.addEventListener("resize", () => {

    dibujarArbol();

});

// ======================================
// Enter para ejecutar insertar
// ======================================

txtValor.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        btnInsertar.click();

    }

});

// ======================================
// Mensaje inicial
// ======================================

mostrarExplicacion(`
    <strong>Bienvenido al simulador del Árbol Binario de Búsqueda.</strong>

    <br><br>

    Puede realizar las siguientes operaciones:

    <ul>

        <li>Insertar un nodo.</li>

        <li>Eliminar un nodo.</li>

        <li>Buscar un valor.</li>

        <li>Visualizar los recorridos del árbol.</li>

    </ul>

    Ingrese un número y presione alguno de los botones.
`);

// ======================================
// Dibujar por primera vez
// ======================================

dibujarArbol();