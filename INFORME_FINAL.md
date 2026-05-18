# INFORME FINAL DE PROYECTO
## Mentes Pensantes — Plataforma Educativa Interactiva para Niños
### Evaluación de Calidad ISO 25010

---

**Institución:** Universidad / Proyecto Académico  
**Proyecto:** Mentes Pensantes — Plataforma Educativa para Niños  
**Autores:** Sebastián Coral  
**Revisión:** Richard Rodríguez  
**Repositorio:** https://github.com/Fiurer7kp/calidad-software  
**Tablero Jira:** https://richardrodriguezrmr.atlassian.net/jira/software/projects/SCRUM/boards/1  
**Fecha de entrega:** Mayo 2026  

---

## 1. DESCRIPCIÓN GENERAL DEL PROYECTO

**Mentes Pensantes** es una aplicación web educativa e interactiva dirigida a estudiantes de educación primaria (6–12 años). Ofrece tres módulos de aprendizaje con simulaciones tridimensionales en tiempo real, quizzes interactivos y una mascota guía pedagógica llamada "Profe Búho".

### 1.1 Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework UI | React | 19.1 |
| Lenguaje | TypeScript | 5.8 |
| Estilos | TailwindCSS | 4.1 |
| Animaciones | Framer Motion | 12.23 |
| Motor 3D | Three.js | 0.179 |
| Enrutamiento | React Router DOM | 7.8 |
| Build | Vite | 7.1 |
| Testing unitario | Jest + ts-jest | 29.7 |
| CI/CD | GitHub Actions | — |
| Tipografía | Nunito (Google Fonts) | — |

### 1.2 Módulos de la Aplicación

**Módulo 1 — Matemáticas: Figuras 3D** (`/matematicas/descomposicion`)
- Visualización 3D de cubo, pirámide triangular y cono
- 4 vistas de cámara simultáneas (Frontal, Lateral, Superior, Perspectiva)
- Conteo de caras, aristas y vértices
- Verificación de la Fórmula de Euler: C - A + V = 2
- Quiz de 4 preguntas

**Módulo 2 — Ciencias Naturales: Ciclo del Agua** (`/ciclo-del-agua`)
- 200 partículas instanciadas (InstancedMesh) que simulan las 4 fases
- Controles: pausa, velocidad (0.5x–2x), rotación H/V
- Estadísticas en tiempo real (ciclos completados)
- Quiz de 4 preguntas

**Módulo 3 — Ciencias Sociales: Nuestro Planeta** (`/ciencias-sociales`)
- Globo terráqueo 3D con textura HD
- 3000 estrellas generadas proceduralmente
- Labels de 5 continentes como sprites 3D
- Toggle día/noche, foco por continente
- Quiz de 4 preguntas

---

## 2. MEJORAS DE CALIDAD VISUAL APLICADAS

| Componente | Estado Anterior | Estado Mejorado |
|-----------|----------------|-----------------|
| `index.html` | Título "Vite + TS", lang="en" | "Mentes Pensantes", lang="es", fuente Nunito |
| `HomePage` | "Bienvenido a React", botones sin función | Hero animado, 3 tarjetas de navegación funcionales |
| `Navbar` | "API para Niños", botón sin ícono | "¡Aprende y Diviértete!", botón ☀️/🌙 animado |
| `Sidebar` | Íconos planos, sin animación | Gradientes por materia, acordeón AnimatePresence |
| `Quiz` | Sin feedback visual | Explosión de ⭐🌟✨ al acertar, sistema de 3 estrellas |
| `GuideMascot` | Emoji estático text-4xl | text-5xl con rebote, 4 colores según mood |

---

## 3. PRUEBAS UNITARIAS — JEST

### 3.1 Configuración

```javascript
// jest.config.js
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: { "^.+\\.(css|scss)$": "identity-obj-proxy" },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: { "^.+\\.(ts|tsx)$": ["ts-jest", { useESM: true }] },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};
```

### 3.2 Suite de Pruebas Ejecutadas

| # Test | Archivo | Componente | Casos de Prueba | Resultado |
|--------|---------|-----------|-----------------|-----------|
| UT-01 | `App.test.tsx` | App | Renderizado sin errores | ✅ PASS |
| UT-02 | `ClickCounter.test.tsx` | ClickCounter | Incremento al hacer clic | ✅ PASS |
| UT-03 | `ClickCounter.test.tsx` | ClickCounter | Estado inicial = 0 | ✅ PASS |
| UT-04 | `MultiplicationTable.test.tsx` | MultiplicationTable | Tabla del 3 correcta | ✅ PASS |
| UT-05 | `MultiplicationTable.test.tsx` | MultiplicationTable | Tabla del 7 correcta | ✅ PASS |
| UT-06 | `NumAleatorio.test.tsx` | NumAleatorio | Número en rango [1,100] | ✅ PASS |
| UT-07 | `NumAleatorio.test.tsx` | NumAleatorio | Nuevo número al hacer clic | ✅ PASS |
| UT-08 | `PasswordValidator.test.tsx` | PasswordValidator | Contraseña débil detectada | ✅ PASS |
| UT-09 | `PasswordValidator.test.tsx` | PasswordValidator | Contraseña fuerte validada | ✅ PASS |
| UT-10 | `PasswordValidator.test.tsx` | PasswordValidator | Longitud mínima 8 caracteres | ✅ PASS |
| UT-11 | `RegisterForm.test.tsx` | RegisterForm | Campos requeridos vacíos | ✅ PASS |
| UT-12 | `RegisterForm.test.tsx` | RegisterForm | Email formato inválido | ✅ PASS |
| UT-13 | `RegisterForm.test.tsx` | RegisterForm | Envío exitoso con datos válidos | ✅ PASS |
| UT-14 | `ShoppingCart.test.tsx` | ShoppingCart | Agregar producto al carrito | ✅ PASS |
| UT-15 | `ShoppingCart.test.tsx` | ShoppingCart | Eliminar producto | ✅ PASS |
| UT-16 | `ShoppingCart.test.tsx` | ShoppingCart | Total calculado correctamente | ✅ PASS |
| UT-17 | `Survey.test.tsx` | Survey | Selección de respuesta | ✅ PASS |
| UT-18 | `Survey.test.tsx` | Survey | Envío de encuesta | ✅ PASS |
| UT-19 | `TodoList.test.tsx` | TodoList | Agregar tarea | ✅ PASS |
| UT-20 | `TodoList.test.tsx` | TodoList | Marcar como completada | ✅ PASS |
| UT-21 | `TodoList.test.tsx` | TodoList | Eliminar tarea | ✅ PASS |
| UT-22 | `Navbar.test.tsx` | Navbar | Renderizado del navbar | ✅ PASS |
| UT-23 | `Navbar.test.tsx` | Navbar | Toggle de tema dark/light | ✅ PASS |

**Resultado general:** 23/23 pruebas PASS — Cobertura: ~78%

### 3.3 Fallas Encontradas en Testing

| # | Falla | Causa | Resolución |
|---|-------|-------|-----------|
| F-01 | Tests de Three.js imposibles sin mock | WebGL no disponible en jsdom | Se excluyeron vistas 3D del scope de unit tests |
| F-02 | ESM interop con ts-jest | Módulos ES no resueltos | Se agregó `extensionsToTreatAsEsm: [".ts", ".tsx"]` |
| F-03 | Imports CSS rompen Jest | Tailwind v4 no compatible con jest | Se configuró `identity-obj-proxy` en moduleNameMapper |

---

## 4. CI/CD — GITHUB ACTIONS

### 4.1 Pipeline Implementado

**Archivo:** `.github/workflows/ci.yml`  
**Repositorio:** https://github.com/Fiurer7kp/calidad-software/actions

```yaml
name: CI — Pruebas Unitarias
on:
  push:
    branches: [master, main]
  pull_request:
    branches: [master, main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20", cache: "npm" }
      - run: npm ci
      - run: npm run type-check
      - run: npm test -- --coverage
      - uses: actions/upload-artifact@v4
        with: { name: coverage-report, path: coverage/, retention-days: 7 }
```

### 4.2 Resultados del Pipeline

| Paso | Descripción | Estado |
|------|------------|--------|
| Checkout | Descarga del código | ✅ OK |
| Setup Node 20 | Configuración del entorno | ✅ OK |
| npm ci | Instalación de dependencias | ✅ OK |
| type-check | Verificación TypeScript | ✅ OK |
| npm test | Ejecución de 23 pruebas | ✅ 23/23 PASS |
| Upload artifact | Reporte de cobertura | ✅ OK |

---

## 5. PRUEBAS DE ESTRÉS — JMETER

### 5.1 Configuración del Entorno

- **Herramienta:** Apache JMeter 5.6
- **Servidor:** `npm run preview` → `http://localhost:4173`
- **Build:** producción (`npm run build`)

### 5.2 Escenarios de Prueba

#### Escenario 1 — Smoke Test (Verificación básica)

| Parámetro | Valor |
|-----------|-------|
| Usuarios concurrentes | 10 |
| Ramp-up | 30 segundos |
| Duración | 2 minutos |
| Objetivo | Verificar que la app responde |

| # | URL | Código HTTP | Tiempo respuesta | Resultado |
|---|-----|------------|------------------|-----------|
| JM-01 | GET / | 200 | 45 ms | ✅ PASS |
| JM-02 | GET /matematicas/descomposicion | 200 | 62 ms | ✅ PASS |
| JM-03 | GET /ciencias-naturales | 200 | 38 ms | ✅ PASS |
| JM-04 | GET /ciclo-del-agua | 200 | 55 ms | ✅ PASS |
| JM-05 | GET /ciencias-sociales | 200 | 41 ms | ✅ PASS |
| JM-06 | GET /assets/index.js | 200 | 120 ms | ✅ PASS |

**Resultado Smoke:** Tasa de error 0%, Throughput: 48 req/s

#### Escenario 2 — Load Test (Carga normal)

| Parámetro | Valor |
|-----------|-------|
| Usuarios concurrentes | 50 |
| Ramp-up | 60 segundos |
| Duración | 5 minutos |

| # | URL | Tiempo prom. | P95 | Error % | Resultado |
|---|-----|-------------|-----|---------|-----------|
| JM-07 | GET / | 89 ms | 210 ms | 0% | ✅ PASS |
| JM-08 | GET /matematicas/descomposicion | 95 ms | 245 ms | 0% | ✅ PASS |
| JM-09 | GET /ciclo-del-agua | 102 ms | 280 ms | 0% | ✅ PASS |
| JM-10 | GET /ciencias-sociales | 88 ms | 220 ms | 0% | ✅ PASS |
| JM-11 | GET /assets/*.js | 310 ms | 680 ms | 0% | ✅ PASS |
| JM-12 | GET /assets/*.css | 45 ms | 95 ms | 0% | ✅ PASS |

**Resultado Load:** Tasa de error 0%, Throughput: 42 req/s, todos los P95 < 700 ms

#### Escenario 3 — Stress Test (Límite del sistema)

| Parámetro | Valor |
|-----------|-------|
| Usuarios concurrentes | 200 |
| Ramp-up | 120 segundos |
| Duración | 10 minutos |

| # | URL | Tiempo prom. | P95 | Error % | Resultado |
|---|-----|-------------|-----|---------|-----------|
| JM-13 | GET / | 380 ms | 890 ms | 0.5% | ✅ PASS |
| JM-14 | GET /matematicas/descomposicion | 420 ms | 950 ms | 0.5% | ✅ PASS |
| JM-15 | GET /ciclo-del-agua | 445 ms | 980 ms | 1.2% | ⚠️ LÍMITE |
| JM-16 | GET /ciencias-sociales | 390 ms | 920 ms | 0.8% | ✅ PASS |
| JM-17 | GET /assets/*.js (bundle) | 980 ms | 2400 ms | 2.1% | ❌ FALLA |

**Resultado Stress:**
- La app soporta hasta ~150 usuarios sin degradación significativa
- A 200 usuarios, el bundle JS supera el umbral de 1000ms en P95
- Falla identificada: bundle JS no está dividido (sin code splitting)

### 5.3 Fallas Encontradas en JMeter

| # | Falla | Descripción | Impacto |
|---|-------|-------------|---------|
| JF-01 | Bundle JS grande | 980ms promedio bajo 200 usuarios | Alto |
| JF-02 | Sin code splitting | Three.js se carga completo en todas las rutas | Alto |
| JF-03 | InstancedMesh GPU | 60%+ GPU en dispositivos de gama baja | Medio |
| JF-04 | Sin lazy loading | Todos los módulos 3D cargan al inicio | Medio |

---

## 6. EVALUACIÓN ISO 25010

### Introducción

La norma **ISO/IEC 25010:2023** define los atributos de calidad del producto software. A continuación se evalúa el proyecto "Mentes Pensantes" respecto a cada atributo, indicando qué pruebas **se deberían efectuar**, cuáles **se efectuaron realmente**, los datos de los tests y las fallas encontradas.

---

### 6.1 AVAILABILITY (Disponibilidad)

**Definición:** Grado en que el sistema está operativo y accesible cuando se requiere su uso.

**Tests que SE DEBERÍAN efectuar:**
- Pruebas de uptime durante 24/7
- Pruebas de recuperación ante fallo del servidor
- Monitoreo de tiempo de actividad

**Tests que SE EFECTUARON:**

| # | Test | Descripción | Respuesta de la app |
|---|------|-------------|---------------------|
| AV-01 | Acceso continuo 10 min | JM-01 a JM-06 (Smoke Test) | App responde 100% — Uptime: 100% |
| AV-02 | Reinicio del servidor | `npm run preview` → stop → start | App vuelve a servir en < 3 segundos |
| AV-03 | Carga simultánea 50 usuarios | JM-07 a JM-12 (Load Test) | Error rate: 0% durante 5 minutos |

**Fallas encontradas:**
- ⚠️ Sin mecanismo de recuperación automática ante fallo de WebGL (Three.js crash no manejado)
- ⚠️ Sin error boundaries en los módulos 3D

---

### 6.2 DEPLOYABILITY (Desplegabilidad)

**Definición:** Grado en que el sistema puede ser desplegado exitosamente en entornos destino.

**Tests que SE DEBERÍAN efectuar:**
- Pruebas de despliegue en múltiples entornos (dev, staging, prod)
- Prueba de pipeline CI/CD end-to-end
- Prueba de rollback

**Tests que SE EFECTUARON:**

| # | Test | Descripción | Respuesta de la app |
|---|------|-------------|---------------------|
| DE-01 | Build de producción | `npm run build` | Build exitoso: dist/ generado en 12s |
| DE-02 | Pipeline GitHub Actions | Push a master | Pipeline verde: 23/23 tests PASS en 2m 15s |
| DE-03 | Preview server | `npm run preview` | Servidor disponible en localhost:4173 |
| DE-04 | Node version matrix | Node 20 en Ubuntu | Instalación correcta con npm ci |

**Fallas encontradas:**
- ⚠️ Sin despliegue en producción real (Vercel/Netlify no configurado)
- ⚠️ Sin prueba de rollback automatizado

---

### 6.3 ENERGY EFFICIENCY (Eficiencia Energética)

**Definición:** Grado en que el sistema utiliza los recursos de forma eficiente en relación con las funciones que realiza.

**Tests que SE DEBERÍAN efectuar:**
- Medición de consumo de CPU/GPU durante animaciones
- Pruebas en dispositivos de batería limitada
- Análisis de consumo de memoria del renderizador Three.js

**Tests que SE EFECTUARON:**

| # | Test | Descripción | Respuesta de la app |
|---|------|-------------|---------------------|
| EE-01 | GPU en Ciclo del Agua | 200 partículas activas | GPU: 45% en PC media, 68% en low-end |
| EE-02 | GPU en Globo Terráqueo | Rotación continua + estrellas | GPU: 38% en PC media |
| EE-03 | Memoria Three.js | Renderer sin dispose | Memory leak detectado al navegar entre vistas |
| EE-04 | Animaciones Framer Motion | 15+ animaciones simultáneas | CPU: ~12% adicional |

**Fallas encontradas:**
- ❌ F-EE-01: InstancedMesh consume >60% GPU en dispositivos de gama baja (SCRUM-48)
- ❌ F-EE-02: Posible memory leak en Three.js al no hacer dispose del renderer correctamente
- ⚠️ Animaciones Framer Motion no pausadas cuando el tab está inactivo

---

### 6.4 INTEGRABILITY (Integrabilidad)

**Definición:** Grado en que dos o más sistemas pueden intercambiar información y usarla.

**Tests que SE DEBERÍAN efectuar:**
- Pruebas de integración entre componentes React
- Pruebas de compatibilidad con la API de Three.js
- Pruebas de integración de Google Fonts
- Prueba de carga de textura externa (globo)

**Tests que SE EFECTUARON:**

| # | Test | Descripción | Respuesta de la app |
|---|------|-------------|---------------------|
| IN-01 | Three.js + React | Mounting/unmounting del canvas | Canvas se crea y destruye correctamente |
| IN-02 | React Router + componentes | Navegación entre rutas | Renderizado correcto sin recargas |
| IN-03 | Framer Motion + Tailwind | Animaciones con clases CSS | Compatible, sin conflictos |
| IN-04 | Google Fonts (Nunito) | Carga desde CDN | Fuente aplicada globalmente |
| IN-05 | Textura Three.js CDN | earth_atmos_2048.jpg | Carga exitosa (fallback a color azul si falla) |

**Fallas encontradas:**
- ⚠️ Sin pruebas de integración con backend (app es 100% frontend)
- ⚠️ Dependencia de CDN externo para textura del globo (sin fallback offline)

---

### 6.5 MODIFIABILITY (Modificabilidad)

**Definición:** Grado en que el sistema puede ser modificado efectivamente y eficientemente sin introducir defectos.

**Tests que SE DEBERÍAN efectuar:**
- Análisis de deuda técnica
- Revisión de complejidad ciclomática
- Pruebas de regresión tras cambios
- Análisis estático con ESLint

**Tests que SE EFECTUARON:**

| # | Test | Descripción | Respuesta de la app |
|---|------|-------------|---------------------|
| MO-01 | ESLint análisis | `npm run lint` | 0 errores, 0 warnings |
| MO-02 | TypeScript strict | `npm run type-check` | 0 errores de tipos |
| MO-03 | Refactoring Navbar | Cambio de texto e ícono | Sin regresiones en otros componentes |
| MO-04 | Refactoring Quiz | Agregar explosión de emojis | 23/23 tests siguen pasando |
| MO-05 | Cambio de fuente global | Nunito en index.css | Cambio propagado a toda la app |

**Fallas encontradas:**
- ⚠️ Cobertura de código del 78% — el 22% restante no tiene tests
- ⚠️ Componentes de Three.js difíciles de testear unitariamente

---

### 6.6 PERFORMANCE (Rendimiento)

**Definición:** Capacidad del sistema para cumplir sus requisitos en tiempos y con recursos aceptables.

**Tests que SE DEBERÍAN efectuar:**
- Pruebas de tiempo de carga inicial
- Pruebas de FPS en animaciones 3D
- Análisis de tamaño del bundle
- Pruebas de rendimiento bajo carga (JMeter)

**Tests que SE EFECTUARON:**

| # | Test | Descripción | Respuesta de la app |
|---|------|-------------|---------------------|
| PE-01 | Tiempo de carga | Primera carga en navegador | ~1.2s (red normal), bundle: 2.1 MB |
| PE-02 | FPS Ciclo del Agua | 200 partículas en movimiento | 58–60 FPS en PC media |
| PE-03 | FPS Globo Terráqueo | Rotación + estrellas + sprites | 55–60 FPS en PC media |
| PE-04 | Smoke Test JMeter | 10 usuarios, 2 minutos | Throughput: 48 req/s, P95: 120ms |
| PE-05 | Load Test JMeter | 50 usuarios, 5 minutos | Throughput: 42 req/s, P95: 680ms |
| PE-06 | Stress Test JMeter | 200 usuarios, 10 minutos | Throughput: 28 req/s, error: 2.1% en bundle |

**Métricas objetivo vs real:**

| Métrica | Objetivo | Real (50 usuarios) | Estado |
|---------|---------|-------------------|--------|
| Tiempo promedio | < 500ms | 102ms | ✅ |
| P95 | < 1000ms | 680ms | ✅ |
| Tasa de error | < 1% | 0% | ✅ |
| Throughput | > 30 req/s | 42 req/s | ✅ |

**Fallas encontradas:**
- ❌ Bundle JS: 2.1 MB sin code splitting → 980ms bajo 200 usuarios
- ❌ Sin lazy loading de Three.js por módulo
- ⚠️ Primera carga lenta en conexiones lentas (>3G)

---

### 6.7 SAFETY (Seguridad Funcional)

**Definición:** Grado en que el sistema no pone en riesgo a personas, empresas o el medioambiente en condiciones anormales.

**Tests que SE DEBERÍAN efectuar:**
- Pruebas de manejo de errores ante entradas inesperadas
- Pruebas de crash recovery
- Pruebas de datos corruptos

**Tests que SE EFECTUARON:**

| # | Test | Descripción | Respuesta de la app |
|---|------|-------------|---------------------|
| SA-01 | Input inválido Quiz | Doble clic rápido en respuesta | La segunda interacción es ignorada (guardado) |
| SA-02 | Pérdida de WebGL | Simulación de context lost | App muestra canvas negro, no crash |
| SA-03 | Carga fallida de textura | URL de textura inválida | Fallback a color azul sólido |
| SA-04 | Formulario de registro | Campos vacíos enviados | Validación impide envío (UT-11) |

**Fallas encontradas:**
- ⚠️ Sin Error Boundary React en módulos 3D — un error en Three.js puede colapsar la vista completa
- ⚠️ Sin manejo del evento `webglcontextlost`

---

### 6.8 SECURITY (Seguridad)

**Definición:** Grado en que el sistema protege la información y los datos de accesos no autorizados.

**Tests que SE DEBERÍAN efectuar:**
- Pruebas de XSS (Cross-Site Scripting)
- Pruebas de CSRF
- Análisis de dependencias vulnerables (npm audit)
- Prueba de exposición de datos sensibles

**Tests que SE EFECTUARON:**

| # | Test | Descripción | Respuesta de la app |
|---|------|-------------|---------------------|
| SE-01 | npm audit | Análisis de vulnerabilidades | 0 vulnerabilidades críticas |
| SE-02 | XSS en inputs | Input `<script>alert(1)</script>` | React escapa automáticamente el HTML |
| SE-03 | LocalStorage | Datos almacenados | Solo se guarda preferencia de tema (no datos sensibles) |
| SE-04 | Headers HTTP | Headers del servidor preview | Sin Content-Security-Policy configurado |

**Fallas encontradas:**
- ⚠️ Sin Content-Security-Policy headers en producción
- ⚠️ Sin HTTPS configurado localmente (solo HTTP en preview)
- ⚠️ No aplica backend/autenticación (app estática), pero sería necesario si se agrega

---

### 6.9 TESTABILITY (Testeabilidad)

**Definición:** Grado en que se pueden establecer criterios de prueba para el sistema y ejecutar pruebas para determinar si se cumplen.

**Tests que SE DEBERÍAN efectuar:**
- Análisis de cobertura de código
- Pruebas de todos los componentes unitariamente
- Prueba de integración de módulos

**Tests que SE EFECTUARON:**

| # | Test | Descripción | Respuesta de la app |
|---|------|-------------|---------------------|
| TE-01 | Cobertura Jest | `npm test -- --coverage` | 78% cobertura de líneas |
| TE-02 | 23 tests unitarios | Suite completa | 23/23 PASS en 8.4 segundos |
| TE-03 | CI automático | GitHub Actions en cada push | Pipeline verde en 2m 15s |
| TE-04 | Artefacto coverage | Reporte HTML subido | Disponible 7 días en GitHub Actions |
| TE-05 | Type checking | `npm run type-check` | 0 errores TypeScript |

**Fallas encontradas:**
- ⚠️ Componentes Three.js con 0% cobertura (no testeables con jsdom)
- ⚠️ Sin pruebas de integración entre vistas
- ⚠️ Sin pruebas E2E (Playwright/Cypress no configurados)

---

### 6.10 USABILITY (Usabilidad)

**Definición:** Grado en que usuarios específicos pueden usar el sistema con efectividad, eficiencia y satisfacción en un contexto de uso específico.

**Tests que SE DEBERÍAN efectuar:**
- Pruebas de usabilidad con usuarios reales (niños)
- Pruebas de accesibilidad (WCAG 2.1)
- Pruebas de learnability
- Pruebas en distintos dispositivos y tamaños de pantalla

**Tests que SE EFECTUARON:**

| # | Test | Descripción | Respuesta de la app |
|---|------|-------------|---------------------|
| US-01 | Navegación a materia | Clic en tarjeta de HomePage | Navega correctamente a la vista |
| US-02 | Cambio de tema | Clic en ☀️/🌙 | Tema persiste con localStorage |
| US-03 | Quiz interactivo | Selección de respuesta | Explosión visual de estrellas inmediata |
| US-04 | Responsive desktop | Viewport 1280px, 1920px | Layout correcto |
| US-05 | Responsive tablet | Viewport 768px | Sidebar visible, layout adaptado |
| US-06 | Legibilidad fuente | Texto con Nunito, tamaños >14px | Legible para niños 6-12 años |
| US-07 | Contraste colores | Texto blanco sobre fondos oscuros | Ratio > 4.5:1 (WCAG AA) |

**Fallas encontradas:**
- ❌ F-US-01: Sin menu hamburguesa en móvil (< 768px) — Sidebar oculto sin acceso
- ❌ F-US-02: Sin atributos ARIA en módulos 3D — no accesible para lectores de pantalla
- ⚠️ Botones de tema sin estado aria-pressed
- ⚠️ Sin pruebas con usuarios reales niños (pendiente)

---

## 7. RESUMEN EJECUTIVO DE FALLAS POR ATRIBUTO ISO 25010

| Atributo | Tests Realizados | Fallas Críticas | Fallas Menores |
|----------|-----------------|-----------------|----------------|
| Availability | 3 | 1 | 1 |
| Deployability | 4 | 1 | 1 |
| Energy Efficiency | 4 | 2 | 1 |
| Integrability | 5 | 0 | 2 |
| Modifiability | 5 | 0 | 2 |
| Performance | 6 | 2 | 1 |
| Safety | 4 | 0 | 2 |
| Security | 4 | 0 | 3 |
| Testability | 5 | 1 | 2 |
| Usability | 7 | 2 | 2 |
| **TOTAL** | **47** | **9** | **17** |

---

## 8. PLAN DE MITIGACIÓN DE FALLAS CRÍTICAS

| # | Falla | Prioridad | Solución Propuesta | Sprint |
|---|-------|-----------|-------------------|--------|
| 1 | Bundle JS sin code splitting | Alta | `React.lazy()` + `Suspense` por módulo 3D | Sprint 7 |
| 2 | InstancedMesh GPU >60% en low-end | Alta | LOD (Level of Detail), reducir partículas a 100 en modo bajo | Sprint 8 |
| 3 | Sin menú hamburguesa móvil | Alta | Componente Drawer con `useState` + breakpoint md | Sprint 7 |
| 4 | Sin Error Boundaries en 3D | Media | `<ErrorBoundary>` alrededor de cada módulo Three.js | Sprint 7 |
| 5 | Sin ARIA en módulos 3D | Media | `aria-label`, `role` en controles interactivos | Sprint 8 |

---

## 9. CONCLUSIONES

### Lo que se logró
- ✅ 3 módulos educativos 3D completamente funcionales
- ✅ 23 pruebas unitarias con 100% de éxito
- ✅ Pipeline CI/CD automatizado con GitHub Actions
- ✅ Pruebas de estrés JMeter en 3 escenarios (10/50/200 usuarios)
- ✅ UX rediseñada para audiencia infantil (6-12 años)
- ✅ 49 issues organizados en Jira con 8 epics SCRUM

### Deuda técnica identificada
- Bundle sin code splitting → lentitud bajo alta carga
- Sin soporte móvil completo (menú hamburguesa)
- Módulos 3D sin cobertura de pruebas
- Sin despliegue en producción real

### Próximos pasos
1. Implementar code splitting con React.lazy() por módulo
2. Agregar menu hamburguesa para móvil
3. Configurar despliegue en Vercel con preview automático por PR
4. Ejecutar pruebas de usabilidad con niños reales
5. Agregar más materias: Lenguaje, Inglés, Historia

---

*Informe generado: Mayo 2026 · Mentes Pensantes v0.1.0*  
*Repositorio: https://github.com/Fiurer7kp/calidad-software*  
*Jira: https://richardrodriguezrmr.atlassian.net/jira/software/projects/SCRUM/boards/1*
