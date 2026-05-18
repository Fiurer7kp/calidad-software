# 📋 Informe de Proyecto — Mentes Pensantes
**Plataforma Educativa Interactiva para Niños**

| Campo | Detalle |
|---|---|
| **Proyecto** | Mentes Pensantes |
| **Autor** | Sebastián Coral |
| **Revisado por** | Richard Rodríguez |
| **Repositorio** | `git@github.com:Fiurer7kp/calidad-software.git` |
| **Fecha** | Mayo 2026 |
| **Duración** | 2 meses |
| **Estado** | En desarrollo activo |

---

## 1. Resumen Ejecutivo

**Mentes Pensantes** es una aplicación web educativa e interactiva orientada a niños en edad escolar (6–12 años). La plataforma ofrece tres módulos de aprendizaje con simulaciones 3D en tiempo real, quizzes interactivos y una mascota guía (Profe Búho) que acompaña al estudiante en cada lección.

### Objetivos del proyecto
- Crear una experiencia de aprendizaje visual e interactiva para matemáticas, ciencias naturales y ciencias sociales.
- Garantizar calidad de código mediante pruebas unitarias automatizadas.
- Implementar un pipeline CI/CD con GitHub Actions.
- Validar el rendimiento del servidor mediante pruebas de estrés con JMeter.

---

## 2. Arquitectura del Proyecto

```
Pruebas_unitarias_jest/
├── .github/
│   └── workflows/
│       └── ci.yml              ← Pipeline CI/CD
├── public/
│   └── formula_celsius.jpg
├── src/
│   ├── components/             ← Componentes reutilizables
│   │   ├── GuideMascot.tsx     ← Mascota Profe Búho
│   │   ├── Layout.tsx          ← Layout principal
│   │   ├── Navbar.tsx          ← Barra de navegación superior
│   │   ├── Quiz.tsx            ← Sistema de quizzes
│   │   └── Sidebar.tsx         ← Menú lateral de materias
│   ├── routes/
│   │   └── AppRoutes.tsx       ← Definición de rutas
│   ├── views/                  ← Páginas/vistas
│   │   ├── HomePage.tsx        ← Página de inicio
│   │   ├── Descomposicion.tsx  ← Módulo Matemáticas (3D)
│   │   ├── CienciasNaturalesPage.tsx ← Landing Ciencias
│   │   ├── CicloDelAgua.tsx    ← Simulación ciclo del agua
│   │   └── CienciasSociales.tsx ← Globo terráqueo 3D
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── jest.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

### Stack Tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Framework UI | React | 19.1 |
| Lenguaje | TypeScript | 5.8 |
| Estilos | TailwindCSS | 4.1 |
| Animaciones | Framer Motion | 12.23 |
| 3D / WebGL | Three.js | 0.179 |
| Enrutamiento | React Router DOM | 7.8 |
| Íconos | React Icons | 5.5 |
| Build | Vite | 7.1 |
| Testing | Jest + ts-jest | 29.7 |
| Test DOM | jest-environment-jsdom | 30.1 |
| CI/CD | GitHub Actions | — |
| Fuente | Nunito (Google Fonts) | — |

---

## 3. Módulos Desarrollados

### 3.1 Módulo de Matemáticas — Figuras 3D
**Ruta:** `/matematicas/descomposicion`

Permite al estudiante explorar figuras geométricas tridimensionales (cubo, pirámide triangular y cono) desde cuatro ángulos de cámara simultáneos.

**Características:**
- Renderizado 3D en tiempo real con **Three.js** y material `MeshStandardMaterial`
- 4 mini-vistas simultáneas: Frontal, Lateral, Superior y Perspectiva (con rotación automática)
- Selector de figura con transición instantánea de geometría
- Panel de elementos: caras, aristas y vértices con contadores animados
- Verificación visual de la **Fórmula de Euler**: `C - A + V = 2`
- Wireframe overlay sobre cada figura para visualizar bordes
- Quiz de 4 preguntas sobre figuras 3D

**Figuras disponibles:**

| Figura | Caras | Aristas | Vértices | Euler |
|---|---|---|---|---|
| Cubo | 6 | 12 | 8 | 6-12+8=2 ✓ |
| Pirámide Triangular | 4 | 6 | 4 | 4-6+4=2 ✓ |
| Cono | 2 | 1 | 1 | 2-1+1=2 ✓ |

---

### 3.2 Módulo de Ciencias Naturales — Ciclo del Agua
**Rutas:** `/ciencias-naturales` (landing) → `/ciclo-del-agua` (simulación)

Simulación 3D interactiva del ciclo hidrológico con 200 partículas animadas.

**Características:**
- **200 partículas** instanciadas (`InstancedMesh`) para máximo rendimiento
- 4 fases del ciclo: evaporación → condensación → precipitación → acumulación
- Paleta de colores dinámica por partícula (azul, cian, teal, lavanda, blanco)
- Sol animado con corona de luz
- Plano de agua con líneas de ola
- **Controles interactivos:**
  - Pausar / Reanudar simulación
  - Velocidad: 0.5x, 1x, 1.5x, 2x
  - Rotación horizontal y vertical (sliders)
  - Reiniciar vista
- Estadísticas en tiempo real: partículas activas y ciclos completados
- Quiz de 4 preguntas sobre el ciclo del agua

---

### 3.3 Módulo de Ciencias Sociales — Nuestro Planeta
**Ruta:** `/ciencias-sociales`

Globo terráqueo interactivo 3D con textura real de la Tierra.

**Características:**
- Globo con textura HD de la Tierra cargada desde Three.js CDN
- Atmósfera translúcida con efecto rim
- **3000 estrellas** de fondo generadas proceduralmente
- Labels de continentes como sprites 3D (visibles solo en la cara frontal)
- **Foco por continente:** botones para centrar el globo en América, Europa, África, Asia, Oceanía
- Toggle **Día/Noche** con ajuste de intensidad de luz
- Botón de **Música** (interfaz preparada)
- Rotación automática suave con interpolación `lerp`
- Quiz de 4 preguntas sobre geografía

---

## 4. Mejoras Visuales Aplicadas

Durante el proceso de revisión de calidad se identificaron y corrigieron las siguientes deficiencias visuales:

### 4.1 index.html
| Antes | Después |
|---|---|
| `lang="en"` | `lang="es"` |
| Título: `"Vite + TS"` | Título: `"Mentes Pensantes — ¡Aprende y Diviértete!"` |
| Sin fuente personalizada | Fuente **Nunito** (Google Fonts) — redonda y amigable |

### 4.2 HomePage
| Antes | Después |
|---|---|
| Título: "Bienvenido a React 🚀" | Título: "¡Mentes Pensantes! 🚀" |
| Subtítulo: "ejemplo simple de landing page" | Subtítulo orientado a niños |
| Botones sin funcionalidad | 3 tarjetas de navegación con enlace directo a cada materia |
| Sin guía de uso | Sección "¿Cómo usar la plataforma?" con 4 tips |
| Spinner sin sentido | Profe Búho animado |

### 4.3 Navbar
| Antes | Después |
|---|---|
| Inicial estática `"S"` | Búho animado con gradiente morado/rosa |
| Texto: `"API para Niños"` | Texto: `"¡Aprende y Diviértete!"` |
| Botón `"Tema"` sin ícono | Botón ☀️/🌙 con animación de rotación |

### 4.4 Sidebar
| Antes | Después |
|---|---|
| Íconos de emoji simples | Íconos con fondo degradado por materia |
| Acordeón sin animación | Acordeón con `AnimatePresence` (slide) |
| Footer de texto plano | Profe Búho animado con fondo amarillo |

### 4.5 Quiz
| Antes | Después |
|---|---|
| Sin feedback visual al acertar | Explosión de ⭐🌟✨💫🎉🏆 al responder correcto |
| Resultados en texto plano | Sistema de 3 estrellas animadas según porcentaje |
| Barra de progreso gris | Barra con gradiente morado/rosa |
| Botones sin hover | Hover con scale + deslizamiento |

### 4.6 GuideMascot (Profe Búho)
| Antes | Después |
|---|---|
| Emoji `text-4xl` estático | Emoji `text-5xl` con rebote y rotación continuos |
| Fondo amarillo fijo | 4 colores por mood: amarillo/azul/rosa/morado |
| Botón cerrar estático | Botón cerrar con rotación 90° en hover |

---

## 5. Pruebas Unitarias (Jest)

### Configuración
```js
// jest.config.js
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.(css|scss|sass|less)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { useESM: true }],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};
```

### Archivos de Test Existentes

| Archivo | Componente | Cobertura |
|---|---|---|
| `App.test.tsx` | App principal | Renderizado básico |
| `ClickCounter.test.tsx` | ClickCounter | Clics e incremento |
| `MultiplicationTable.test.tsx` | MultiplicationTable | Generación de tabla |
| `NumAleatorio.test.tsx` | NumAleatorio | Generación de número |
| `PasswordValidator.test.tsx` | PasswordValidator | Validación de contraseña |
| `RegisterForm.test.tsx` | RegisterForm | Formulario de registro |
| `ShoppingCart.test.tsx` | ShoppingCart | Carrito de compras |
| `Survey.test.tsx` | Survey | Encuesta |
| `TodoList.test.tsx` | TodoList | Lista de tareas |
| `Navbar.test.tsx` | Navbar | Barra de navegación |

### Ejecutar Pruebas

```bash
# Pruebas básicas
npm test

# Con cobertura
npm test -- --coverage

# Modo watch (desarrollo)
npm test -- --watch

# Un archivo específico
npm test -- Quiz.test.tsx
```

---

## 6. CI/CD con GitHub Actions

### Archivo: `.github/workflows/ci.yml`

```yaml
name: CI — Pruebas Unitarias

on:
  push:
    branches: [master, main]
  pull_request:
    branches: [master, main]

jobs:
  test:
    name: Pruebas Unitarias (Node 20)
    runs-on: ubuntu-latest

    steps:
      - name: Checkout del repositorio
        uses: actions/checkout@v4

      - name: Configurar Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
          cache-dependency-path: package-lock.json

      - name: Instalar dependencias
        run: npm ci

      - name: Verificar tipos (TypeScript)
        run: npm run type-check

      - name: Ejecutar pruebas unitarias
        run: npm test -- --coverage --coverageReporters=text --coverageReporters=lcov

      - name: Subir reporte de cobertura
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/
          retention-days: 7
```

### Flujo del Pipeline

```
Git Push / Pull Request
         │
         ▼
  ① Checkout (actions/checkout@v4)
         │
         ▼
  ② Setup Node 20 + caché npm
         │
         ▼
  ③ npm ci (instalación reproducible)
         │
         ▼
  ④ npm run type-check (TypeScript)
         │  ← Falla si hay errores de tipos
         ▼
  ⑤ npm test --coverage (Jest)
         │  ← Falla si algún test falla
         ▼
  ⑥ Upload artifact: coverage/ (7 días)
```

### Dónde ver los resultados
- **GitHub Actions:** `https://github.com/Fiurer7kp/calidad-software/actions`
- **Artefacto de cobertura:** disponible en cada ejecución durante 7 días

---

## 7. Pruebas de Estrés con JMeter

### Objetivo
Validar que el servidor de desarrollo (Vite) y el servidor de producción (build estático) soporten carga concurrente de usuarios sin degradación significativa de rendimiento.

### Instalación de JMeter
```bash
# Descargar Apache JMeter 5.6+
# https://jmeter.apache.org/download_jmeter.cgi
# Ejecutar:
./bin/jmeter.sh   # Linux/Mac
bin\jmeter.bat    # Windows
```

### Plan de Prueba — Test Plan Principal

#### Escenario 1: Carga Normal (Smoke Test)
| Parámetro | Valor |
|---|---|
| Usuarios concurrentes | 10 |
| Ramp-up | 30 segundos |
| Duración | 2 minutos |
| URL base | `http://localhost:4173` (preview) |

#### Escenario 2: Carga Media (Load Test)
| Parámetro | Valor |
|---|---|
| Usuarios concurrentes | 50 |
| Ramp-up | 60 segundos |
| Duración | 5 minutos |
| URL base | `http://localhost:4173` |

#### Escenario 3: Carga Alta (Stress Test)
| Parámetro | Valor |
|---|---|
| Usuarios concurrentes | 200 |
| Ramp-up | 120 segundos |
| Duración | 10 minutos |
| URL base | `http://localhost:4173` |

### Rutas a Probar

```
GET  /                              ← HomePage
GET  /matematicas/descomposicion    ← Figuras 3D
GET  /ciencias-naturales            ← Landing Ciencias
GET  /ciclo-del-agua                ← Simulación partículas
GET  /ciencias-sociales             ← Globo terráqueo
GET  /assets/*.js                   ← Bundle JavaScript
GET  /assets/*.css                  ← Estilos
```

### Configuración del Thread Group (JMeter GUI)

```
Test Plan
└── Thread Group
    ├── Number of Threads: 50
    ├── Ramp-Up Period: 60
    ├── Loop Count: Forever
    ├── Duration: 300 (segundos)
    │
    ├── HTTP Request Defaults
    │   ├── Server: localhost
    │   └── Port: 4173
    │
    ├── HTTP Request: GET /
    ├── HTTP Request: GET /matematicas/descomposicion
    ├── HTTP Request: GET /ciencias-naturales
    ├── HTTP Request: GET /ciclo-del-agua
    ├── HTTP Request: GET /ciencias-sociales
    │
    ├── Response Assertion (Status 200)
    │
    └── Listeners
        ├── Summary Report
        ├── View Results Tree
        └── Response Time Graph
```

### Preparar servidor para JMeter
```bash
# 1. Construir la app
npm run build

# 2. Levantar servidor de preview (producción local)
npm run preview
# → Listening on http://localhost:4173

# 3. Abrir JMeter y ejecutar el plan
```

### Métricas Esperadas (Objetivos de Calidad)

| Métrica | Objetivo |
|---|---|
| Tiempo de respuesta promedio | < 500 ms |
| Percentil 95 (P95) | < 1000 ms |
| Tasa de error | < 1% |
| Throughput | > 30 req/s |
| Tiempo de respuesta máximo | < 3000 ms |

### Exportar Resultados
```
JMeter → File → Save Test Results → stress_test_results.jtl
JMeter → Generate HTML Dashboard Report → reports/jmeter/
```

---

## 8. Plan de Desarrollo — 8 Semanas (2 Meses)

### Cronograma General

```
Semana 1 │ Epic 1: Configuración inicial
Semana 1 │ Epic 2: Diseño visual y UX
Semana 2 │ Epic 3: Módulo Matemáticas
Semana 3 │ Epic 4: Módulo Ciencias Naturales
Semana 4 │ Epic 5: Módulo Ciencias Sociales
Semana 5 │ Epic 6: Quiz y Gamificación
Semana 6 │ Epic 7: CI/CD y Pruebas
Semana 7 │ Epic 8: Optimización y Despliegue
Semana 8 │ Buffer: corrección de bugs y entrega
```

### Epic 1 — Configuración Inicial y Arquitectura
> **Sprint 1 · Semana 1**

| # | Tarea | Tipo | Estado |
|---|---|---|---|
| 1 | Inicializar proyecto con Vite + React + TypeScript | Tarea | ✅ Hecho |
| 2 | Configurar TailwindCSS v4 y sistema de temas dark/light | Tarea | ✅ Hecho |
| 3 | Implementar React Router con estructura de rutas | Tarea | ✅ Hecho |
| 4 | Configurar ESLint, Prettier y tsconfig estricto | Tarea | ✅ Hecho |
| 5 | Crear estructura base: Layout, Navbar, Sidebar, Footer | Tarea | ✅ Hecho |

### Epic 2 — Diseño Visual y UX para Niños
> **Sprint 1 · Semana 1-2**

| # | Tarea | Tipo | Estado |
|---|---|---|---|
| 1 | Seleccionar e integrar fuente Nunito para tipografía amigable | Tarea | ✅ Hecho |
| 2 | Definir paleta de colores y sistema de gradientes por materia | Tarea | ✅ Hecho |
| 3 | Rediseñar HomePage con tarjetas de navegación interactivas | Tarea | ✅ Hecho |
| 4 | Mejorar Navbar con branding correcto e ícono de búho animado | Tarea | ✅ Hecho |
| 5 | Mejorar Sidebar con acordeón animado y gradientes de color | Tarea | ✅ Hecho |

### Epic 3 — Módulo de Matemáticas (Figuras 3D)
> **Sprint 2 · Semana 2-3**

| # | Tarea | Tipo | Estado |
|---|---|---|---|
| 1 | Integrar Three.js y configurar escena, cámara y renderer | Tarea | ✅ Hecho |
| 2 | Implementar selector de figuras (cubo, pirámide, cono) | Tarea | ✅ Hecho |
| 3 | Crear componente MiniView con 4 ángulos de cámara simultáneos | Tarea | ✅ Hecho |
| 4 | Mostrar elementos (caras, aristas, vértices) con iconos y descripción | Tarea | ✅ Hecho |
| 5 | BUG: Wireframe no se actualiza al cambiar de figura sin desmontar | Bug | ✅ Resuelto |

### Epic 4 — Módulo de Ciencias Naturales (Ciclo del Agua)
> **Sprint 2-3 · Semana 3-4**

| # | Tarea | Tipo | Estado |
|---|---|---|---|
| 1 | Crear simulación 3D con 200 partículas instanciadas (InstancedMesh) | Tarea | ✅ Hecho |
| 2 | Implementar 4 fases del ciclo con trayectorias matemáticas | Tarea | ✅ Hecho |
| 3 | Agregar controles: pausa, velocidad (0.5x–2x), rotación H/V | Tarea | ✅ Hecho |
| 4 | Mostrar estadísticas en tiempo real (ciclos completados) | Tarea | ✅ Hecho |
| 5 | BUG: Partículas presentan z-fighting en fase de acumulación | Bug | ✅ Resuelto |

### Epic 5 — Módulo de Ciencias Sociales (Globo Terráqueo)
> **Sprint 3 · Semana 4-5**

| # | Tarea | Tipo | Estado |
|---|---|---|---|
| 1 | Integrar globo 3D con textura HD de la Tierra y campo de estrellas | Tarea | ✅ Hecho |
| 2 | Implementar labels de continentes como sprites 3D en la superficie | Tarea | ✅ Hecho |
| 3 | Agregar foco por continente con rotación interpolada (lerp) | Tarea | ✅ Hecho |
| 4 | Implementar toggle día/noche con cambio de intensidad de luz | Tarea | ✅ Hecho |
| 5 | BUG: Labels de continentes visibles a través del globo (culling) | Bug | ✅ Resuelto |

### Epic 6 — Sistema de Quiz y Gamificación
> **Sprint 4 · Semana 5-6**

| # | Tarea | Tipo | Estado |
|---|---|---|---|
| 1 | Crear componente Quiz reutilizable con QuizQuestion interface | Tarea | ✅ Hecho |
| 2 | Implementar flujo: inicio → preguntas → resultados con reinicio | Tarea | ✅ Hecho |
| 3 | Agregar sistema de 3 estrellas animadas según porcentaje de aciertos | Tarea | ✅ Hecho |
| 4 | Implementar animación de explosión de emojis al acertar | Tarea | ✅ Hecho |
| 5 | Crear GuideMascot (Profe Búho) con 4 moods y colores distintos | Tarea | ✅ Hecho |

### Epic 7 — CI/CD y Pruebas Unitarias
> **Sprint 5 · Semana 6-7**

| # | Tarea | Tipo | Estado |
|---|---|---|---|
| 1 | Configurar Jest con ts-jest, jsdom e identity-obj-proxy para CSS | Tarea | ✅ Hecho |
| 2 | Escribir tests unitarios para componentes: Quiz, Sidebar, Navbar, etc. | Tarea | ✅ Hecho |
| 3 | Crear workflow GitHub Actions con type-check + jest + coverage | Tarea | ✅ Hecho |
| 4 | Configurar upload de reporte de cobertura como artefacto (7 días) | Tarea | ✅ Hecho |
| 5 | BUG: ESM interop con ts-jest requiere extensionsToTreatAsEsm | Bug | ✅ Resuelto |

### Epic 8 — Optimización, JMeter y Despliegue
> **Sprint 6 · Semana 7-8**

| # | Tarea | Tipo | Estado |
|---|---|---|---|
| 1 | Configurar caché de npm en pipeline CI para reducir tiempo de build | Tarea | ✅ Hecho |
| 2 | Crear plan de pruebas JMeter: Smoke, Load y Stress (10–200 usuarios) | Tarea | 🔄 En progreso |
| 3 | Documentar métricas objetivo: P95 < 1s, error rate < 1%, throughput > 30 req/s | Tarea | 🔄 En progreso |
| 4 | BUG: InstancedMesh consume 60%+ GPU en dispositivos de gama baja | Bug | 🔄 En progreso |
| 5 | Generar informe final del proyecto y documentación de entrega | Tarea | ✅ Hecho |

---

## 9. Historial de Commits Relevantes

```
265099c ci: agregar GitHub Actions para pruebas unitarias
fabcfd0 feat: mejorar GuideMascot con animaciones y colores por mood
fa0390a feat: mejorar Quiz con celebración de estrellas y diseño más vivo
3cdcb50 feat: rediseñar Sidebar con colores y animaciones kid-friendly
98020b8 feat: mejorar Navbar con búho animado y botón de tema mejorado
9deec67 feat: rediseño completo de HomePage para niños
544016c feat: mejorar estilos base en index.css
e8bc815 feat: actualizar index.html con título, idioma y fuente Nunito
```

---

## 10. Conclusiones

### Logros alcanzados
- ✅ Plataforma educativa funcional con 3 módulos interactivos en 3D
- ✅ UX completamente rediseñada para audiencia infantil (6–12 años)
- ✅ Pipeline CI/CD automatizado con GitHub Actions
- ✅ Suite de 10 archivos de pruebas unitarias con Jest
- ✅ Fuente tipográfica Nunito integrada para mejor legibilidad
- ✅ Mascota guía (Profe Búho) con 4 estados emocionales

### Deuda técnica identificada
- ⚠️ Optimización de `InstancedMesh` para dispositivos de gama baja
- ⚠️ Tests unitarios para los módulos 3D (requieren mock de Three.js)
- ⚠️ Modo responsive móvil (sidebar oculto, sin menú hamburguesa)
- ⚠️ Funcionalidad de música en Ciencias Sociales (botón preparado)
- ⚠️ Ejecución formal del plan JMeter con resultados documentados

### Próximos pasos
1. Ejecutar y documentar resultados de pruebas JMeter
2. Agregar menu hamburguesa para dispositivos móviles
3. Implementar sistema de progreso/logros del estudiante
4. Agregar más materias: Lenguaje, Inglés, Historia
5. Despliegue en plataforma de producción (Vercel / Netlify)

---

*Documento generado: Mayo 2026 · Mentes Pensantes v0.1.0*
