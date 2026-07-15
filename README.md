# Simulador de Estructuras de Datos

Trabajo Final del Curso (TIF) — **Estructura de Datos y Algoritmos**
Universidad Nacional de San Agustín de Arequipa · Escuela Profesional de Ingeniería de Sistemas · 2026-A

<!-- PLACEHOLDER: completar con los datos reales del grupo -->
**Docente:** RONI GUILLERMO APAZA ACEITUNO
**Integrantes:**
- QUISPE RUPAYLLA FABRIZIO ALONSO — Pila
- QUISPESAYHUA HANCCO JOSEPH BRAYAN — Cola
- SARMIENTO TICO LIMBERG — Lista enlazada
- HUAYTA CHOQUEPATA ABEL ALEXANDER — Árbol binario

---

## 📌 Descripción

Simulador web que permite visualizar gráficamente el funcionamiento de cuatro
estructuras de datos: **pila**, **cola**, **lista enlazada** y **árbol binario**,
mostrando paso a paso las operaciones de insertar y eliminar, junto con una
explicación en texto de lo que ocurre en cada acción.

Construido con **HTML, CSS y JavaScript puro**,
por lo que corre directo en el navegador, **sin necesidad de internet ni de
instalar complementos**.

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

---

## 🌐 Versión publicada (GitHub Pages)

<!-- PLACEHOLDER: activar GitHub Pages sobre la rama main y pegar el link aquí -->
🔗 https://josephquispesayhua.github.io/simulador-estructuras/

---


## 📚 Referencia del curso

- **Asignatura:** Estructura de Datos y Algoritmos (2502116)
- **Sílabo:** 2026-A, Departamento Académico de Ingeniería de Sistemas e Informática — UNSA
