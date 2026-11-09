# Guía: hacer el FrontEnd responsive

> Documento de diagnóstico y plan de trabajo. Basado en el análisis del código actual
> (`src/react/**`, `src/index.css`, `App.css`, `index.html`).
> Fecha: 2026-11-09

## 1. Estado actual

- Bootstrap **5.3** se importa globalmente (`src/index.jsx`: `import 'bootstrap/dist/css/bootstrap.min.css'`), por lo que la grilla, utilidades responsive (`d-*`, `flex-*`, `table-responsive`, `modal-*`) y breakpoints **ya están disponibles** pero casi no se usan.
- Todo el layout se construye con `d-flex` + `style={{...}}` inline (anchos/alturas fijos en px/rem), en vez de la grilla de Bootstrap o utilidades responsive.
- **Solo existe 1 media query en todo el proyecto** (`App.css`, `.button-96` con `@media (max-width: 1550px)`).
- El `<meta viewport>` sí está presente en `index.html` (no hay que agregarlo).
- Todo el CSS "custom" vive en `App.css` e `index.css`, sin organizarse por breakpoint.

**Conclusión:** no es un problema de librería sino de maquetación: hace falta (a) reemplazar anchos fijos por `max-width`/flex/grid, (b) decidir el comportamiento del Sidebar en pantallas chicas, (c) arreglar las pantallas de ancho mínimo obligatorio (Login, Register, Agenda) y (d) habilitar scroll horizontal donde la tabla es intrínsecamente ancha.

---

## 2. Diagnóstico de problemas concretos

| # | Archivo | Problema | Impacto |
|---|---------|----------|---------|
| 1 | `components/Sidebar.jsx` (línea 46) | `minWidth: '15rem', maxWidth: '15rem'` fijos. No hay colapso/ocultamiento en móvil. | En < 576px el sidebarconsume la mayor parte de la pantalla. Es el bloqueo #1. |
| 2 | `pages/Login.jsx` (línea 21) | Card fija de `width: 500px` | Overflow horizontal en móviles (< 500px). |
| 3 | `pages/Register.jsx` (línea 22) | Card fija de `width: 400px` | Overflow horizontal en móviles (< 400px). |
| 4 | `components/basis/ModalTemplate.jsx` | Modal custom (`modal-dialog modal-dialog-centered`) sin `modal-dialog-scrollable` ni `modal-fullscreen-sm-down`. | En pantallas bajas/reducidas el contenido del modal se recorta y no se puede scrollear. |
| 5 | `patient/modals/FileModalPreview.jsx` (línea 79) | `minWidth: '500px', maxWidth: '500px'` en el body del modal | Overflow horizontal en móvil. |
| 6 | `components/basis/TableV2.jsx` + `.table-overflow` (App.css 422) | `tbody { display:block }` con `maxHeight`; las filas usan `display:table`. No hay scroll horizontal ni contenedor `table-responsive` | En pantallas chicas las 5 columnas de listados (p. ej. Pacientes) se aplastan y los textos quedan ilegibles (`text-truncate`). |
| 7 | `components/schedule/ScheduleController.jsx` (línea ~63) | Layout de 2 columnas (calendar 33% + grilla de agenda) con alturas fijas `calc(100vh - …)`. No apila en pantallas chicas. | La agenda (pantalla principal) no es usable en tablet/mobile. Panto crítico. |
| 8 | `components/schedule/ScheduleCalendar.jsx` (línea 36) | Card con `minWidth: '350px'` | Provoca (o agravará) overflow horizontal. |
| 9 | `components/schedule/new/Calendar.jsx` (línea 30) | Card fija `width: '350px'` | Ídem. |
| 10 | `components/basis/TurnsList.jsx` (línea 17) | Columna de color con `width: '100px'` fija | Se come espacio en móvil. |
| 11 | `pages/ScheduleSetting.jsx` (línea 74) | Etiqueta de día con `width: '6rem'` + `gap-5` | Consume demasiado ancho en pantallas chicas. |
| 12 | `App.css` / `index.css` | Sin breakpoints ni variables útiles. `.mh-100vh` en realidad define `height: 100vh` (nombre engañoso). | Difícil mantener estilos responsive. |

---

## 3. Cambios recomendados (por prioridad)

### P0 — Habilidades base (bloquean todo lo demás)

#### 3.1 Sidebar colapsable / off-canvas ✅ *Implementado*
Es el cambio con mayor impacto. Opciones (elegir una):

- **Opción A (implementada):** ocultar el sidebar por debajo de `lg` (992px) vía `d-none d-lg-block` + un botón hamburguesa que lo abra como `Offcanvas` de Bootstrap. `react-bootstrap` ya provee el componente.
- **Opción B (más simple):** mantenerlo siempre visible pero reducirle el ancho en pantallas menores vía media query propia (menos usable en teléfonos).

Snippet de la Opción A (pseudo-co con los estilos actuales):

```jsx
// components/Sidebar.jsx
// aside: quitar minWidth/maxWidth inline
<aside className='bg-body-tertiary d-none d-lg-flex px-3 py-4 ...' />

// components/AppContainer.jsx
// agregar <TopbarMobile> (hamburguesa) que se muestra solo < lg
<Offcanvas placement='start' show={show} onHide={handleClose}>
    <div className='d-flex flex-column gap-4'>
        {/* contenido actual del Sidebar, extraído a un componente compartido */}
    </div>
</Offcanvas>
```

Es **indispensable extraer el contenido del sidebar** (logo + links) a su propio componente (`SidebarContent.jsx`) para reutilizarlo tanto en el aside fijo como en el Offcanvas.

#### 3.2 Un solo archivo de estilos responsive
Crear `src/react/responsive.css` con breakpoints alineados a Bootstrap (importarlo después de los CSS existentes) en vez de sprinklings de `style` inline:

```css
:root {
    --sidebar-width: 15rem;
}

/* --- < lg: columnas de listados empujadas a scroll horizontal --- */
@media (max-width: 991.98px) {
    .login-card,
    .register-card {
        width: 100%;
        max-width: 500px;
    }
    .sidebar-host {
        min-width: 0;
        max-width: 0;
    }
}
```

Y en `App.css`, **agregar breakpoints siempre "down"** (mobile-first `max-width`) para acompañar un proyecto que hoy está pensado desktop-first.

### P1 — Pantallas de mínimo ancho fijo (quick wins)

#### 3.3 Login y Register ✅ *Implementado*
```diff
- style={{ width: '500px', height: '100vh', ... }}
+ style={{ maxWidth: '500px', height: '100vh', ... }}
```
Añadir también `w-100` (o `width: '100%'`) para que se expanda fluido. `maxWidth` jamás debe faltar si se quiere un ancho "recomendado" en desktop; `width` fijo es lo que rompe el móvil.

```diff
- style={{ width: '400px', ... }}
+ style={{ width: '100%', maxWidth: '400px', ... }}
```

#### 3.4 Modal genérico (ModalTemplate) ✅ *Implementado* (incluye FileModalPreview)
```diff
- <div role='dialog' className={`modal-dialog modal-dialog-centered ${modalSize}`}>
+ <div
+     role='dialog'
+     className={`modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down ${modalSize}`}
+ >
```

- `modal-dialog-scrollable`: desliza el contenido interno cuando no entra verticalmente (resuelve el caso de corto alto).
- `modal-fullscreen-sm-down`: pantalla completa en pantallas < 576px (conviene también para FileModalPreview y los modales de formularios).

Y en `FileModalPreview.jsx` sustituir el `minWidth`/`maxWidth` de 500px por clases (`mw-100` + maxWidth sobre breakpoint).

### P2 — Listados y pantallas densas

#### 3.5 Tabla (TableV2 + listados) ✅ *Implementado*
La tabla es intrínsecamente horizontal (será así en escritorio). Encerrar la tabla en un contenedor scrolleable horizontal en pantallas chicas:

```jsx
<div className='table-responsive'>
    {/* <table /> actual */}
</div>
```
Más un `min-width` sobre las filas `.table-overflow tr` en `responsive.css` (< md) para que el scroll horizontal se active en vez de comprimir las columnas.

- Renombrar/convivir con `.table-overflow` solo para `max-y`; si se usa `table-responsive` para `overflow-x`, apuntar el `maxHeight` al `tbody` como hoy.
- Limitación conocida (documentada en `responsive.css`): al scrollear horizontalmente el `thead` no acompaña a las filas. La alternativa pro es el **patrón «cards en mobile»** (sección 6), que elimina la limitación.

#### 3.6 Agenda (ScheduleController)
Es la pantalla más relevante. Estrategia conservadora (no reescribir la grilla de turnos):

1. En `< lg`, apilar verticalmente (calendar arriba, grilla abajo) cambiando el `d-flex` del contenedor a `flex-column flex-lg-row`.
2. Permitir scroll horizontal dentro del panel de agenda en móvil (envolver la grilla horaria en un `overflow-x-auto`).
3. Evitar `height: calc(100vh - …)` en pantallas menores — sostener el alto por contenido, no por viewport.

```diff
- <div className='flex-grow-1 d-flex gap-3' style={{ maxHeight: 'calc(100vh - 3rem - 1.5rem - 36px)' }}>
+ <div className='flex-grow-1 d-flex flex-column flex-lg-row gap-3'>
```
(los `calc` de viewport quedan solo dentro de `@media (min-width: 992px)` si son necesarios).

#### 3.7 Otros anchos fijos menores ✅ *Implementado* (ver sección 6 del log)
- `ScheduleCalendar.jsx`: `minWidth: '350px'` → `width: '100%', maxWidth: '350px'`.
- `new/Calendar.jsx`: `width: '350px'` → `width: '100%', maxWidth: '350px'`.
- `TurnsList.jsx`: `width: '100px'` (boliche de color) → `width: '24px'` en móvil vía media query, o `min-width`.
- `ScheduleSetting.jsx`: etiqueta de día `width: '6rem'` + `gap-5` → reducir a `gap-2`/`gap-3` en `< md`.
- `PatientTreatments.jsx` / similares: son contenedores flexibles (`flex-column`), **no requieren cambios**.

### P3 — Higiene general

- Añadir **clases utilitarias propias** en `index.css` (sin tocar Bootstrap): `.w-10/.w-20/.w-80/.w-90` ya existen; podrían agregarse `.w-md-…` (ver prefijos de breakpoint de Bootstrap para coherencia: `d-md-none`, `col-md-6`).
- Corregir la clase `mh-100vh` en `index.css`: hoy define `height: 100vh`; su nombre dice `mh`. ¿Dudoso impacto pero confuso.
- En `App.css` la única media query existente (`@media (max-width: 1550px) .button-96`) está OK; consolidar en `responsive.css` junto al resto.
- Los `style={{width: '1.5rem'}}` sobre iconos de heroicons están bien (no son problemas responsive).

---

## 4. Checklist de verificación

Abrir la app con DevTools y probar en los breakpoints de Bootstrap:
`576px` (sm), `768px` (md), `992px` (lg), `1200px` (xl).

- [ ] Sidebar: desaparece en < 992px; aparece el botón hamburguesa; el Offcanvas navega y se cierra.
- [ ] Login y Register: sin overflow horizontal a 360px de ancho (¡probar con teclado en pantalla, es lo que rompe móvil!).
- [ ] Modales: al abrir `AddPatientModal`, `FileModalPreview`, etc., contenido scrolleable y sin desbordar en 360px.
- [ ] Listados (`PatientsIndex`, `Profesionals`, `SchedulesIndex`): posible scroll horizontal o salto a cards; NO se aplastan columnas ilegibles.
- [ ] Agenda (`ScheduleController`): apilado vertical en < 992px (si se decide adoptar el P2).
- [ ] Home (`Reminders`, `Turns`): tabs de react-bootstrap con scroll si se desbordan.
- [ ] Tema dark: verificar contraste de los elementos agregados (Offcanvas y media queries con variables CSS).

---

## 5. Notas

- El proyecto usa **Vite + React 19** (`package.json`) — `AGENTS.md` ya está actualizado con ese detalle.
- Las clases responsive de Bootstrap (grilla `col-*`, `d-…`, `flex-…`) tienen **preferencia (specificity) suficiente** para convivir con las utilidades custom; pero si hace falta, aumentar la especificidad vía CSS nesting en `responsive.css`.
- Si se suma una pantalla nueva, aspirar a: (a) cero `width` fijo inline, (b) `max-width` en cualquier bloque que tenga ancho "ideal", (c) `flex-column flex-lg-{row|column}` para layouts de 2 columnas, (d) `table-responsive` si es una tabla de datos.

---

## 6. Patrón «cards en mobile» para los listados ✅ *Implementado* (`TableV2.jsx`)

> Especificación **implementada** en `components/basis/TableV2.jsx` (ver sección 9 del log).
> En pantallas < md cada ítem del listado se muestra como card en lugar de fila de tabla.

### 6.1 Motivación

Hoy los listados (`TableV2`) en < 768px: columnas comprimidas + `min-width: 45rem` + scroll horizontal, con la limitación de que el `thead` no acompaña el scroll. El patrón cards muestra cada ítem como una tarjeta legible verticalmente, sin scroll lateral ni desalineación de encabezados.

### 6.2 Decisión de diseño

| decisión | valor | motivo |
|---|---|---|
| Breakpoint del switch | `< md` (768px) | los listados tienen 4–6 columnas; a 768px la tabla todavía entra |
| Dónde implementar | dentro de `TableV2.jsx` | todos los listados heredan el patrón de una vez (PatientsIndex, TreatmentsIndex, etc.) |
| Fuente de datos del card | la MISMA config de `columns` | evita duplicar lógica de render por listado |
| Ordenamiento en mobile | chip con dropdown reutilizando `order`/`handleOrder` | ordenable pero compacto |
| Paginación | fuera del card (la que ya existe) | cero cambios |
| Acción de fila (`isPressable`) | card entera clickable | paridad con el click de fila actual |

### 6.3 Extensión propuesta de `columns`

No hace falta API nueva obligatoria. Cada `column` de la config ya trae `name`, `key`, `value` y `ordered`. Se agrega un flag opcional para destacar un campo como título del card:

```jsx
// pacientes:
columns={[
    { name: 'Apellidos', key: 'surnames', ordered: true, cardHighlight: true }, // título
    { name: 'Nombres', key: 'names' },
    { name: 'DNI', key: 'dni', ordered: true },
    { name: 'Fecha de Nacimiento', key: 'birthdate', value: (data) => formato, ordered: true },
    { name: 'Teléfono', key: 'phone' },
]}
```

Reglas del renderizador genérico de cards:

1. El primer campo con `cardHighlight: true` (o, si ninguno, el primero de la config) se usa como título `h5`, pasando por `column.value` si existe (p. ej. nombres concatenados apellidos + nombres conviene armarlo con `cardHighlight: (item) => \`${item.surnames} ${item.names}\``).
2. El resto de los campos se listan como `small.text-body-secondary` (nombre) + valor (mismo `column.value`/`item[column.key]` de la tabla).
3. Los campos de acción se excluyen de las cards (la convención actual: acciones viven fuera de la tabla o como `value()` de una celda).

### 6.4 Sketch de implementación en `TableV2`

```jsx
// cards para < md; tabla para >= md (misma data, misma paginación)
return (
    <>

        {/* Tabla: solo >= md. Sin scroll horizontal, el thead vuelve a acompañar. */}
        <div className='table-responsive d-none d-md-block'>
            <table className='table table-striped table-overflow table-hover'>…actual…</table>
        </div>

        {/* Cards: solo < md */}
        <div className='d-md-none d-flex flex-column gap-2'>
            {items.map(item => (
                <div
                    key={…}
                    className={`card p-2 ${isPressable ? 'cursor-pointer' : ''}`}
                    onClick={isPressable ? () => handleOnPress(item) : undefined}
                >
                    <div className='d-flex justify-content-between align-items-start'>
                        <h5 className='mb-1'>{cardTitle(item)}</h5>
                        {chipOrden}
                    </div>
                    {fields(item).map(([label, value]) =>
                        <div key={label}>
                            <small className='text-body-secondary'>{label}:</small> {value}
                        </div>
                    )}
                </div>
            ))}
        </div>
    </>
)
```

- El **chip de orden** solo se muestra si algún `column.ordered === true`: un dropdown compacto ("Ordenar por…" tipo Bootstrap `DropdownButton` de `react-bootstrap`, con `handleOrder(column.name, dir)` reutilizado).
- Estados de `loading` y de "No se han encontrado resultados": replicar esas ramas también en el modo cards, o extraerlas antes de elegir la rama de render (tabla vs cards).

### 6.5 Estilado (mínimo)

No se necesita CSS nuevo: `card`, `d-md-none`, `d-none d-md-block`, `gap-2` y `text-body-secondary` ya vienen con Bootstrap. Si el título es muy largo, reutilizar `text-truncate` (ya presente en el proyecto).

### 6.6 Pasos de adopción (orden sugerido)

1. Implementar el renderer de cards + chip de orden en `TableV2` (todo en un único punto).
2. Activar en **PatientsIndex** primero (es el listado más denso en datos → mejor caso de prueba) y verificar a 360px: cards legibles, el click navega a la ficha del paciente, paginación igual.
3. Activar en el resto de los listados que usan `TableV2` (posiblemente sin cambios de config, si el renderizador genérico es el default).
4. Con el patrón funcionando, **remover** del `responsive.css` la regla `.table-overflow tr { min-width: 45rem }` (< md) — deja de ser necesaria.
5. Verificar dark mode (las cards usan variables de tema de Bootstrap automáticamente).

### 6.7 Cuándo NO usar cards

- El listado tiene 2 columnas reales o menos → la tabla comprime bien; no vale el toggle.
- Las "filas" son interactivas con controles internos (checkboxes, botones por fila): conversión a card complica la superficie táctil; mantener tabla + scroll.
- El listado ya es de cards por su cuenta (Home `Reminders`/`Turns`, `UsersTable`, `ProfesionalTable`): esos componentes ya implementan listado-tarjetas manualmente; no duplicar con doble render.

> **Nota de rendimiento:** el patrón implica doble render (tabla + cards) del mismo `items`. Con cientos de filas es aceptable; si un listado llegara a miles, evaluar renderizar solo la rama activa (media query en JS vía `window.matchMedia`) en lugar de ocultar con `d-none`.
