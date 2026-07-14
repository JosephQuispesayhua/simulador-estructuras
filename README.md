# Simulador de Estructuras de Datos

Trabajo Final del Curso (TIF) — **Estructura de Datos y Algoritmos**
Universidad Nacional de San Agustín de Arequipa · Escuela Profesional de Ingeniería de Sistemas · 2026-A

<!-- PLACEHOLDER: completar con los datos reales del grupo -->
**Docente:** [Nombre del docente]
**Grupo:** [Nombre o número de grupo]
**Integrantes:**
- [Nombre completo 1 — Código] — Pila
- [Nombre completo 2 — Código] — Cola
- [Nombre completo 3 — Código] — Lista enlazada
- [Nombre completo 4 — Código] — Árbol binario

---

## 📌 Descripción

Simulador web que permite visualizar gráficamente el funcionamiento de cuatro
estructuras de datos: **pila**, **cola**, **lista enlazada** y **árbol binario**,
mostrando paso a paso las operaciones de insertar y eliminar, junto con una
explicación en texto de lo que ocurre en cada acción.

Construido con **HTML, CSS y JavaScript puro** (sin frameworks, sin backend),
por lo que corre directo en el navegador, **sin necesidad de internet ni de
instalar nada**.

---

## 🗂️ Estructura del proyecto

```
/simulador-tif
├── index.html          → página principal (menú hacia las 4 estructuras)
├── style.css            → estilos compartidos (colores, tipografía, botones)
├── README.md
│
├── /pila
│   ├── pila.html
│   ├── Pila.js           → lógica de la estructura (push/pop)
│   ├── pila.render.js     → conecta la lógica con el HTML (dibujo + explicación)
│   └── pila.css
│
├── /cola
│   ├── cola.html
│   ├── Cola.js            → lógica de la estructura (enqueue/dequeue)
│   ├── cola.render.js
│   └── cola.css
│
├── /lista
│   ├── lista.html
│   ├── Lista.js           → lógica de la estructura (insertar/eliminar nodos)
│   ├── lista.render.js
│   └── lista.css
│
└── /arbol
    ├── arbol.html
    ├── Arbol.js            → lógica de la estructura (insertar/eliminar nodos)
    ├── arbol.render.js
    └── arbol.css
```

**Regla del equipo:** cada integrante trabaja únicamente dentro de su propia
carpeta. Los archivos `index.html`, `style.css` y este `README.md` son
compartidos y se coordinan entre todos antes de modificarlos.

---

## 🚀 Cómo probar el proyecto localmente

No requiere instalación ni servidor. Basta con:

1. Clonar el repositorio:
   ```
   git clone https://github.com/PLACEHOLDER/simulador-tif.git
   ```
2. Abrir `index.html` directamente en el navegador (doble clic, o clic derecho → "Abrir con").
3. Desde ahí se puede navegar a cada estructura.

También puede probarse cada módulo por separado abriendo, por ejemplo,
`pila/pila.html` directamente.

<!-- Cada integrante puede agregar aquí una línea sobre cómo probar su propio módulo -->
- **Pila:** [instrucciones específicas si aplica]
- **Cola:** [instrucciones específicas si aplica]
- **Lista enlazada:** [instrucciones específicas si aplica]
- **Árbol binario:** [instrucciones específicas si aplica]

---

## 🌐 Versión publicada (GitHub Pages)

<!-- PLACEHOLDER: activar GitHub Pages sobre la rama main y pegar el link aquí -->
🔗 [PLACEHOLDER: link a GitHub Pages]

---

## 🔀 Flujo de trabajo del equipo (Git)

- `main` — rama principal, solo recibe código ya revisado y funcionando.
- Cada integrante trabaja en su propia rama:
  - `feature/pila`
  - `feature/cola`
  - `feature/lista`
  - `feature/arbol`
- Al terminar su parte, cada quien abre un **Pull Request** hacia `main`,
  que debe ser revisado por otro integrante antes de fusionarse.
- Nadie hace `push` directo a `main`.

---

## 🎨 Guía visual (para mantener consistencia entre los 4 módulos)

- **Colores:** definidos como variables CSS en `style.css` (paleta granate + blanco).
  No redefinir colores base dentro de `pila.css`, `cola.css`, `lista.css` ni `arbol.css`.
- **Tipografía:** también definida en `style.css` (una fuente para títulos, otra para texto).
- **Componentes reutilizables ya disponibles en `style.css`:**
  - `.tarjeta` — contenedor tipo card
  - `.boton--primario` / `.boton--secundario` — botones
  - `.panel-explicacion` — panel de texto explicativo de cada operación
  - `.controles` — fila de inputs/botones para insertar y eliminar
  - `.lienzo` — contenedor donde se dibuja la estructura
  - `.estado--pendiente` / `.estado--listo` — etiqueta de estado del módulo

Cada integrante debe reutilizar estas clases dentro de su `xxx.html` en vez
de crear estilos nuevos desde cero, para que las 4 páginas se vean como un
solo producto.

---

## ✅ Checklist de entrega por integrante

- [ ] Clase de la estructura (`Xxx.js`) con insertar y eliminar, comentada.
- [ ] `xxx.render.js` que conecte la lógica con el dibujo en pantalla.
- [ ] `xxx.html` funcional: botones, representación gráfica y panel de explicación.
- [ ] Manejo del caso "estructura vacía" sin romper la página.
- [ ] Al menos 2-3 elementos de ejemplo cargados al abrir la página.
- [ ] Cambiar su etiqueta de `estado--pendiente` a `estado--listo` en `index.html` al terminar.
- [ ] Rama en GitHub con commits de avance y Pull Request abierto a tiempo.
- [ ] Su sección del documento escrito (definición breve de su estructura).

---

## 📚 Referencia del curso

- **Asignatura:** Estructura de Datos y Algoritmos (2502116)
- **Sílabo:** 2026-A, Departamento Académico de Ingeniería de Sistemas e Informática — UNSA
