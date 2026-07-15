// Instancia global
const miLista = new ListaEnlazada();

// Elementos iniciales de prueba
miLista.insertarAlFinal(10);
miLista.insertarAlFinal(20);
miLista.insertarAlFinal(30);

function renderizarLista() {
    const contenedor = document.getElementById('contenedor-lista');
    contenedor.innerHTML = '';

    if (miLista.cabeza === null) {
        contenedor.innerHTML = '<p class="lista__vacio">La lista está vacía actualmente.</p>';
        return;
    }

    let actual = miLista.cabeza;
    let esPrimero = true;

    while (actual !== null) {
        // Contenedor del elemento (Badge + Nodo)
        const item = document.createElement('div');
        item.className = 'lista__item';

        // Etiqueta superior
        const etiqueta = document.createElement('div');
        etiqueta.className = 'lista__etiqueta';
        if (esPrimero) {
            etiqueta.textContent = 'Cabeza';
        } else if (actual.siguiente === null) {
            etiqueta.textContent = 'Fin';
        }
        item.appendChild(etiqueta);

        // Estructura del Nodo (Valor y Siguiente)
        const nodoCuerpo = document.createElement('div');
        nodoCuerpo.className = esPrimero ? 'lista__nodo-cuerpo lista__nodo-cuerpo--cabeza' : 'lista__nodo-cuerpo';

        const valorDiv = document.createElement('div');
        valorDiv.className = 'lista__valor';
        valorDiv.textContent = actual.valor;

        const punteroDiv = document.createElement('div');
        punteroDiv.className = 'lista__puntero-sig';
        punteroDiv.textContent = actual.siguiente !== null ? 'next' : 'null';

        nodoCuerpo.appendChild(valorDiv);
        nodoCuerpo.appendChild(punteroDiv);
        item.appendChild(nodoCuerpo);

        contenedor.appendChild(item);

        // Flecha conectora (si hay un elemento siguiente)
        if (actual.siguiente !== null) {
            const flecha = document.createElement('div');
            flecha.className = 'lista__flecha';
            flecha.innerHTML = '→';
            contenedor.appendChild(flecha);
        }

        actual = actual.siguiente;
        esPrimero = false;
    }
}

function obtenerValorInput() {
    const input = document.getElementById('valor-input');
    const valor = parseInt(input.value);
    if (isNaN(valor)) {
        alert('Por favor, ingresa un valor numérico válido.');
        return null;
    }
    return valor;
}

function generarNuevoAleatorio() {
    document.getElementById('valor-input').value = Math.floor(Math.random() * 90) + 10;
}

function insertarAlFinalVisual() {
    const valor = obtenerValorInput();
    if (valor === null) return;

    miLista.insertarAlFinal(valor);
    renderizarLista();

    document.getElementById('explicacion').innerHTML = `
        <p><strong>Inserción al Final (push back) efectuada:</strong> Se creó un nuevo nodo con el valor <code>${valor}</code>.</p>
        <p>El algoritmo recorrió la lista desde la <em>cabeza</em> hasta encontrar el nodo terminal cuyo puntero era <code>null</code>, y lo redirigió apuntando hacia el nuevo elemento instanciado.</p>
    `;
    generarNuevoAleatorio();
}

function insertarAlInicioVisual() {
    const valor = obtenerValorInput();
    if (valor === null) return;

    miLista.insertarAlInicio(valor);
    renderizarLista();

    document.getElementById('explicacion').innerHTML = `
        <p><strong>Inserción al Inicio (push front) efectuada:</strong> Se generó el nodo con el valor <code>${valor}</code>.</p>
        <p>El puntero <code>siguiente</code> del nuevo elemento fue configurado para apuntar a la dirección original de la <em>Cabeza</em>. Posteriormente, se actualizó la variable de la cabeza para apuntar hacia este nuevo nodo.</p>
    `;
    generarNuevoAleatorio();
}

function eliminarVisual() {
    const valor = obtenerValorInput();
    if (valor === null) return;

    const exito = miLista.eliminarPorValor(valor);

    if (exito) {
        renderizarLista();
        document.getElementById('explicacion').innerHTML = `
            <p><strong>Eliminación de nodo exitosa:</strong> Se buscó y eliminó secuencialmente el nodo con valor <code>${valor}</code>.</p>
            <p>El nodo anterior al elemento encontrado desvió su puntero <code>siguiente</code> apuntando directamente hacia el nodo que le sucedía al eliminado, saltándolo y liberando la memoria asignada en el recolector de basura.</p>
        `;
    } else {
        document.getElementById('explicacion').innerHTML = `
            <p style="color: var(--granate-mid);"><strong>No se encontró el valor:</strong> Se ha recorrido secuencialmente la lista y no existe un elemento con el valor <code>${valor}</code> para eliminar.</p>
        `;
    }
}

function vaciarVisual() {
    miLista.vaciar();
    renderizarLista();
    document.getElementById('explicacion').innerHTML = `
        <p><strong>Lista vaciada:</strong> Se eliminaron todas las referencias asignadas a la cabeza, restaurando la estructura inicial de la lista.</p>
    `;
}

// Renderizado de inicio
window.onload = function() {
    renderizarLista();
    generarNuevoAleatorio();
};