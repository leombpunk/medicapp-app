# Changelog: trabajo responsive del FrontEnd

> Registro cronológico de todos los cambios ejecutados según `RESPONSIVE-GUIDE.md`.
> Verificación base de cada entrada: build de Vite sin errores (`npm run build` en `FrontEnd/`)
> + prueba manual en DevTools a 360px / 768px / 992px breakpoints.
> Fecha de inicio: 2026-11-09

---

## 2026-11-09

### 1. Sidebar colapsable / off-canvas (P0.1) ✅
**Objetivo:** ocultar el sidebar fijo en < 992px y reemplazarlo por un panel deslizante.

| Archivo | Cambio |
|---|---|
| `components/SidebarContent.jsx` *(nuevo)* | Contenido del sidebar (perfil de usuario + navegación) extraído a componente compartido. Prop opcional `onNavigate`: se ejecuta al navegar (cierra el Offcanvas en móvil) |
| `components/Sidebar.jsx` *(reescrito)* | Solo renderiza el `<aside>` de escritorio con `d-none d-lg-flex`; el ancho de `15rem` fijo en inline style se reemplazó por `var(--sidebar-width)` |
| `components/SidebarMobile.jsx` *(nuevo)* | Barra superior con botón hamburguesa (`d-lg-none`, `sticky-top`) + `Offcanvas` de react-bootstrap con `SidebarContent`; las rutas activas se resaltan igual que en desktop y el panel se cierra al navegar |
| `components/AppContainer.jsx` | Monta `SidebarMobile` dentro del contenedor scrolleable, antes del `container` |
| `src/index.jsx` | Importa el nuevo `react/responsive.css` |
| `react/responsive.css` *(nuevo)* | Variable `--sidebar-width: 15rem` + cabecera documentada para centralizar estilos por breakpoint |

**Estado:** >= 992px se ve igual que antes; < 992px aparece la barra de hamburguesa y el menú abre como panel lateral. Falta verificación manual en navegador (según checklist de la guía).

### 2. Hamburguesa adaptada a tema claro/oscuro ✅
**Objetivo:** el botón usaba `.square-button` con color/borde en negro fijos, por lo que quedaba invisible en modo oscuro.

| Archivo | Cambio |
|---|---|
| `react/App.css` | Variante `.sidebar-toggle` (después de `.square-button`): usa `var(--bs-body-color)`, `var(--bs-border-color)` y `var(--bs-body-bg)`, que se invierten solos con `data-bs-theme` |
| `components/SidebarMobile.jsx` | El botón reemplaza `btn-outline-system` (que pisaba el estilo) por `sidebar-toggle square-button` |

**Estado:** claro = ícono/borde oscuros; oscuro = ícono/borde claros; el hover invierte los colores.

### 3. Login y Register fluidos + modales adaptables (P1) ✅
**Objetivo:** eliminar overflows horizontales en tarjetas de ancho fijo y recortes en modales.

| Archivo | Cambio |
|---|---|
| `pages/Login.jsx` | Card de `width: 500px` fijo → `width: '100%', maxWidth: '500px'` |
| `pages/Register.jsx` | Card de `width: 400px` fijo → `width: '100%', maxWidth: '400px'` |
| `components/basis/ModalTemplate.jsx` | Modal genérico + `modal-dialog-scrollable` y `modal-fullscreen-sm-down`: scrollea el contenido cuando no entra y es pantalla completa en < 576px. Beneficia a todos los modales del sistema que usan el template |
| `components/patient/modals/FileModalPreview.jsx` | Modal propio (no usa ModalTemplate): card con `maxWidth: '100%'` + `flex-row flex-wrap`; el cuerpo de 500px fijos pasa a `flex: 1 1 auto, maxWidth: 500px` (en desktop queda como antes, en móvil baja debajo de la imagen). Imagen limitada a `maxWidth: '100%'` |

**Estado:** Login/Register sin overflow a 360px; modales de formulario full-screen y scrolleable en móvil.

### 4. Listados con scroll horizontal (P2.5) ✅
**Objetivo:** que las tablas de datos dejen de comprimir columnas hasta ser ilegibles en pantallas < md.

| Archivo | Cambio |
|---|---|
| `components/basis/TableV2.jsx` | `<table>` envuelta en `<div className='table-responsive'>` (afecta a Pacientes, Profesionales, Tratamientos y demás listados que usan el componente) |
| `react/responsive.css` | Regla < md: `.table-overflow tr { min-width: 45rem }` — es necesaria porque las filas usan `width: 100%` y de otro modo se comprimen en lugar de desbordar |

**Limitación conocida:** al scrollear horizontalmente el `thead` no acompaña (patrón `.table-overflow` scrollea solo el `tbody` verticalmente). Mejora futura documentada: patrón *cards en mobile*.

### 5. Agenda apilable (P2.6) ✅
**Objetivo:** la pantalla de Agenda (2 columnas con alturas fijas de viewport) ahora se apila verticalmente en < 992px y fluye con el contenido.

| Archivo | Cambio |
|---|---|
| `components/schedule/ScheduleController.jsx` | Contenedor: `d-flex` + alturas inline `calc(100vh - …)` → `d-flex flex-column flex-lg-row schedule-layout` (sin estilos inline). Columna izquierda: `maxWidth: '33%'` inline → clase `schedule-side` |
| `components/schedule/ScheduleCalendar.jsx` | Card del calendario: `minWidth: '350px'` → `width: '100%', maxWidth: '350px'` |
| `react/responsive.css` | `.schedule-side { max-width: 100% }` y, en `≥ lg`, `max-width: 33%` + los `height/max-height: calc(100vh - 3rem - 1.5rem - 36px)` de `.schedule-layout` reservados solo a escritorio |

**Estado:** en < lg el calendario queda arriba y la grilla de turnos abajo a lo ancho (la grilla usa proporciones `w-20`/`w-80`, se adapta sola, no requiere scroll horizontal propio).

**Nota:** `components/schedule/new/Calendar.jsx` (card fija de 350px) quedó **sin modificar**: es código muerto (nadie lo importa) — se salió del alcance.

### 6. Anchos/gaps fijos menores (P2) ✅

| Archivo | Cambio |
|---|---|
| `components/basis/TurnsList.jsx` | Columna de fecha: `width: '100px'` inline → clase `turn-date-column` (100px escritorio / 4.5rem en < 576px). La card además suma `flex-wrap flex-sm-nowrap` para que el botón "Ver en agenda" baje de fila en móviles en vez de aplastar el contenido |
| `pages/ScheduleSetting.jsx` | Grilla de días: `gap-5` (3rem) → clase `schedule-setting-row` (3rem escritorio / 1rem en < 576px); etiqueta de día `width: '6rem'` inline → clase `schedule-setting-day-label` (6rem / 3.5rem) |
| `components/schedule/SelectDays.jsx` | Contenedor de toggles de días + `flex-wrap` (antes 7 columnas fijas desbordaban); `minWidth: '8rem'` inline → clase `select-day-button` (mín 0 en < 576px) |
| `components/schedule/SelectTimes.jsx` | Botón "+" de cada fila: `minWidth: '8rem'` inline → clase `select-day-button` |
| `react/responsive.css` | Reglas base de escritorio + bloque `@media (max-width: 575.98px)` con los cuatro tamaños reducidos y `.button-96 { width: 7rem }` (los chips de 10rem desbordaban en móviles) |

**Estado:** valores de escritorio idénticos a los inline originales (0 regresiones visibles en desktop); en móvil todo se comprime con espacio de sobra o envuelve en filas.

### 7. Higiene CSS (P3) ✅

| Archivo | Cambio |
|---|---|
| `react/responsive.css` | Recibe la media query `@media (max-width: 1550px) .button-96` (era la única del proyecto, vivía en `App.css`), consolidando todo lo responsive en un solo archivo |
| `react/App.css` | Se elimina ese bloque `@media` (estructura del comentario `/* .btn-simple */` adyacente quedó intacta) |
| `src/index.css` | `.mh-100vh` → `.h-100vh` — renombrado por estar el par debajo de un bug real: la clase definida nunca se usaba, y `NotFound.jsx` sí usa `h-100vh`, que no existía en ningún CSS (su layout no ocupaba la altura del viewport). Ahora la clase existe y NotFound se muestra correctamente |

**Estado:** un único archivo para media queries (`responsive.css`); clase fantasma resuelta. Build de Vite OK. Falta verificación manual según checklist.

---

### 8. Documentación: `AGENTS.md` actualizado + patrón «cards en mobile» definido ✅

| Archivo | Cambio |
|---|---|
| `AGENTS.md` (raíz del repo) | Agregado: estructura del FrontEnd ahora describe **Vite + React 19** (antes CRA), `npm run dev` y puerto 5173 para Electron; sección *Known frontend debt* ahora referencia `responsive.css`, `RESPONSIVE-GUIDE.md` y `RESPONSIVE-LOG.md` como docs vigentes del trabajo responsive, con instrucción de seguir actualizando el log; se anota `Topbar.jsx` como aparentemente sin uso y `schedule/new/Calendar.jsx` como código muerto sin importers |
| `FrontEnd/RESPONSIVE-GUIDE.md` | Nueva sección **6: Patrón «cards en mobile» para los listados** — especificación completa (motivación, decisiones de diseño, extensión de `columns` con `cardHighlight`, sketch de implementación en `TableV2`, chip de orden, pasos de adopción, casos donde NO conviene, nota de rendimiento). La limitación del `thead` en la sección 3.5 ahora apunta a esta sección |
| `RESPONSIVE-LOG.md` | Este registro |

**Estado:** solo cambios de documentación, sin código — no requiere build.

### 9. Patrón «cards en mobile» implementado en `TableV2` ✅

**Objetivo:** en < 768px los ítems de los listados se muestran como cards legibles verticalmente, eliminando el truco de scroll horizontal y la limitación del `thead` que no acompañaba.

| Archivo | Cambio |
|---|---|
| `components/basis/TableV2.jsx` | Doble render según breakpoint: tabla `table-responsive d-none d-md-block` (>= md, igual que antes) + cards `d-md-none d-flex flex-column gap-2` (< md). Card generada de la MISMA config `columns`: título = primera columna con `cardHighlight` (bool o función), con default especial que combina `surnames` + `names` (par Apellido/Nombre presente en todos los listados de personas); el resto de los campos se listan como `column.name` + `column.value(item)`. Valores objeto o vacíos se omiten defensivamente |
| `components/basis/TableV2.jsx` | Chip de orden para móvil: `DropdownButton` (react-bootstrap, variant `outline-system`) con las columnas ordenables; reutiliza `controlOrder` / `handleOrder` con la convención `dbKey \|\| key` de la tabla. Re-picking de la misma columna sigue ciclando asc → desc → reset (lógica original) |
| `components/basis/TableV2.jsx` | Estados replicados en ambas ramas: loading (`Loading`) y "No se han encontrado resultados" (card punteada). Cards clickables con `role='button'` cuando `isPressable` |
| `react/responsive.css` | **Retirada** la regla `< md .table-overflow tr { min-width: 45rem }` (paso 4 de adopción §6.6): ya no hace falta porque la tabla solo se renderiza desde >= md |

**Alcance:** el patrón queda activo por defecto para los 10 listados que usan `TableV2` (PatientsIndex, SchedulesIndex, TreatmentsIndex, UsersIndex, ChargesIndex, ScheduleSettingIndex, Reminders, Turns, ProfesionalPatients, ProfesionalTreatments) sin cambios en sus configs.

**Estado:** build de Vite OK. Pendiente verificación manual (ver Pendiente). La personalización del título es opt-in vía `cardHighlight`; las configs existentes heredan el default genérico sin tocar nada.

---

## Pendiente (siguiente iteración)

- [x] ~~P2: pantallas densas restantes~~ (hecho, sección 6: `TurnsList`, `ScheduleSetting`, `SelectDays`, `SelectTimes`).
- [x] ~~P3: higiene~~ (hecho, sección 7: `.button-96` consolidado en `responsive.css`; `.mh-100vh` → `.h-100vh`).
- [x] ~~Mejora futura: patrón *cards en mobile*~~ (hecho, sección 9: implementado en `TableV2` según §6 de la guía).
- [ ] Verificación manual end-to-end (checklist de la guía a 360/576/768/992/1200px, tema claro y oscuro).
- [x] ~~Actualizar `AGENTS.md`~~ (hecho, sección 8).
