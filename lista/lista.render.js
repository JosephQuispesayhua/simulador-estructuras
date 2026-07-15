// Instanciar la Lista Enlazada global
const miLista = new ListaEnlazada();

// Inicializamos la lista con unos valores de ejemplo para que no se vea vacía al cargar
miLista.insertarAlFinal(10);
miLista.insertarAlFinal(20);
miLista.insertarAlFinal(30);

// Función principal para dibujar los nodos en pantalla
function renderizarLista() {
    const visualArea = document.getElementById('visual-area');
    visualArea.innerHTML = ''; // Limpiar el lienzo visual

    let actual = miLista.cabeza;
    
    if (actual === null) {
        visualArea.innerHTML = '<span style="color: #9ca3af; font-style: italic;">La lista está vacía</span>';
        return;
    }

    while (actual !== null) {
        // Crear el bloque de representación visual del nodo
        const nodeContainer = document.createElement('div');
        nodeContainer.className = 'node';

        // Parte del Valor
        const valDiv = document.createElement('div');
        valDiv.className = 'node-val';
        valDiv.textContent = actual.valor;

        // Parte del Puntero Siguiente
        const nextDiv = document.createElement('div');
        nextDiv.className = 'node-next';
        nextDiv.textContent = actual.siguiente !== null ? '•next' : 'null';

        // Unimos el nodo
        nodeContainer.appendChild(valDiv);
        nodeContainer.appendChild(nextDiv);
        visualArea.appendChild(nodeContainer);

        // Si hay un nodo siguiente, agregamos una flecha visual
        if (actual.siguiente !== null) {
            const arrowDiv = document.createElement('div');
            arrowDiv.className = 'arrow';
            arrowDiv.textContent = '→';
            visualArea.appendChild(arrowDiv);
        }

        actual = actual.siguiente;
    }
}

// Acción: Agregar al Final
function agregarAlFinal() {
    const input = document.getElementById('node-value');
    const valor = parseInt(input.value);

    if (isNaN(valor)) {
        alert("Por favor ingresa un número válido.");
        return;
    }

    miLista.insertarAlFinal(valor);
    renderizarLista();

    // Actualizar la explicación lógica en pantalla
    document.getElementById('explanation-text').innerHTML = `
        <p><strong>Operación:</strong> Insertar al Final (${valor})</p>
        <p>Se ha instanciado un nuevo <span class="highlight">Nodo(${valor})</span>. El programa recorrió toda la lista desde la cabeza hasta el último elemento y asignó su puntero <code>siguiente</code> para apuntar a la dirección en memoria del nuevo nodo.</p>
    `;
    
    generarNuevoValorAleatorio();
}

// Acción: Agregar al Inicio (Cabeza)
function agregarAlInicio() {
    const input = document.getElementById('node-value');
    const valor = parseInt(input.value);

    if (isNaN(valor)) {
        alert("Por favor ingresa un número válido.");
        return;
    }

    miLista.insertarAlInicio(valor);
    renderizarLista();

    document.getElementById('explanation-text').innerHTML = `
        <p><strong>Operación:</strong> Insertar al Inicio (${valor})</p>
        <p>Se creó el <span class="highlight">Nodo(${valor})</span>. Su puntero <code>siguiente</code> se asignó inmediatamente para apuntar a lo que era la antigua <code>cabeza</code> de la lista. Finalmente, la referencia global de la cabeza se actualizó hacia este nuevo nodo.</p>
    `;

    generarNuevoValorAleatorio();
}

// Acción: Eliminar por Valor
function eliminarNodo() {
    const input = document.getElementById('node-value');
    const valor = parseInt(input.value);

    if (isNaN(valor)) {
        alert("Por favor ingresa un número válido.");
        return;
    }

    const exito = miLista.eliminarPorValor(valor);
    
    if (exito) {
        renderizarLista();
        document.getElementById('explanation-text').innerHTML = `
            <p><strong>Operación:</strong> Eliminar Nodo (${valor})</p>
            <p>Se realizó una búsqueda secuencial. Al localizar el <span class="highlight">Nodo(${valor})</span>, tomamos el puntero del nodo anterior y lo conectamos directamente con el nodo posterior al que íbamos a eliminar. El recolector de basura de JavaScript libera la memoria del nodo desligado automáticamente.</p>
        `;
    } else {
        document.getElementById('explanation-text').innerHTML = `
            <p style="color: #ef4444;"><strong>Error:</strong> No se pudo eliminar el valor ${valor}.</p>
            <p>Se recorrió secuencialmente toda la lista comparando elemento por elemento y no se encontró ningún nodo que contuviera ese valor específico.</p>
        `;
    }
}

// Genera un número aleatorio útil para evitar reescribir manualmente cada número
function generarNuevoValorAleatorio() {
    document.getElementById('node-value').value = Math.floor(Math.random() * 90) + 10;
}

// Renderizado inicial al cargar la página
window.onload = function() {
    renderizarLista();
    generarNuevoValorAleatorio();
};