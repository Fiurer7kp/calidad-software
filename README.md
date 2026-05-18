# API para Aprendizaje — Mentes Pensantes

## Descripción

Portal educativo interactivo para niños entre 6 y 12 años, desarrollado con **React 19 + TypeScript + Three.js**. Incluye tres módulos educativos con simulaciones 3D, quizzes interactivos y un tutor virtual animado (Profe Búho).

Módulos disponibles:

- **Matemáticas**: Figuras 3D con vistas simultáneas y Fórmula de Euler.
- **Ciencias Naturales**: Simulación de 200 partículas del ciclo del agua.
- **Ciencias Sociales**: Globo terráqueo interactivo con 3000 estrellas procedurales.

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Fiurer7kp/calidad-software.git
cd api-para-aprendizaje
```

Instalar dependencias:

```bash
npm install
```

---

## Scripts disponibles

- **Iniciar servidor de desarrollo**

```bash
npm run dev
```

- **Compilar para producción**

```bash
npm run build
```

- **Previsualizar build de producción**

```bash
npm run preview
```

- **Ejecutar pruebas unitarias**

```bash
npm test
```

- **Ejecutar pruebas con reporte de cobertura**

```bash
npm test -- --coverage
```

- **Revisar tipos TypeScript**

```bash
npm run type-check
```

---

## Estructura de Carpetas

```
src/
├─ components/       # Componentes reutilizables (Layout, Navbar, Sidebar, etc.)
├─ views/            # Vistas de cada módulo educativo
├─ routes/           # Configuración de rutas (AppRoutes.tsx)
└─ main.tsx          # Entrada principal de React
```

---

## Stack Tecnológico

- `react` 19.1, `react-dom`, `react-router-dom`
- `typescript` 5.8
- `three` 0.179 — motor gráfico 3D
- `framer-motion` — animaciones y transiciones
- `tailwindcss` 4.1 — estilos utilitarios
- `vite` 7.1 — herramienta de construcción

---

## Pruebas

Las pruebas unitarias están desarrolladas con **Jest** y **React Testing Library** (23 casos de prueba, cobertura del 78%).

```bash
npm test
```

---

## Autor

**Sebastián Coral**
Asignatura: Calidad de Software
