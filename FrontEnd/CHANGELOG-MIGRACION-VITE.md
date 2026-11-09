# Historial de cambios — FrontEnd

## Noviembre 2026 · Migración de Create React App a Vite + React 19

> **Fecha:** 09/11/2026
> **Ámbito:** solo `FrontEnd/` (BackEnd y Mobile sin cambios)

---

## 1. Migración CRA → Vite

### Eliminado
- `react-scripts` (estaba como placeholder `^0.0.0`) y todos sus `scripts` (`react-scripts start/build/test/eject`).
- Librerías de testing de CRA (el proyecto no tiene tests): `@testing-library/jest-dom`, `@testing-library/react`, `@testing-library/user-event`.
- Bloques específicos de CRA en `package.json`: `eslintConfig` (presets `react-app`) y `browserslist`.
- `homepage: "./"` — sustituido por la opción `base: './'` de Vite.
- **Nota intencional:** NO se añadió `"type": "module"` a `package.json` para no romper `electron/main.js`, que es CommonJS (`require`). Vite funciona igualmente.

### Añadido
- **`vite.config.js`** (raíz del proyecto):
  ```js
  export default defineConfig({
      plugins: [react()],
      base: './',          // equivalente al antiguo `homepage` de CRA: necesario para Electron (file://) y Firebase
      build: {
          outDir: 'build', // mantiene la salida donde la esperan `build-electron` y firebase.json
      },
  })
  ```
  - Se usa el **puerto por defecto de Vite (5173)**. Motivo extra: había un proceso `nginx` ocupando el 3000.
- **`FrontEnd/index.html`** en la raíz (estilo Vite) con el entrypoint módulo:
  ```html
  <script type='module' src='/src/index.jsx'></script>
  ```
- Nuevo `scripts` en `package.json`:
  | Antes (CRA) | Ahora (Vite) |
  |---|---|
  | `react-scripts start` | `vite` (alias: `start`) — puerto 5173 |
  | `react-scripts build` | `vite build` (salida en `build/`) |
  | `react-scripts test` | — (sin tests) |
  | `react-scripts eject` | — |

### Renombrados `.js → .jsx` (contenían JSX; CRA lo toleraba, Vite no)
- `src/index.js` → `src/index.jsx`
- `src/react/components/TimeSlot.js` → `.jsx`
- `src/react/components/modals/TimeSlotModal.js` → `.jsx`
- `src/react/components/modals/TurnCard.js` → `.jsx`
- `src/react/components/providers/TopbarProvider.js` → `.jsx`

Las importaciones sin extensión siguen funcionando: Vite incluye `.jsx` en `resolve.extensions` por defecto.

## 2. React 18 → React 19

- `react` / `react-dom`: **18.2.0 → 19.3.1**
- Compatibles con React 19 (instalación limpia, sin conflictos de peer deps):
  - `react-bootstrap` 2.10.10, `react-router-dom` 7.18.5, `react-hook-form` 7.91.0, `@hookform/resolvers` 5.9.2, `@heroicons/react` 2.2.0, `react-chartjs-2` 5.3.1

## 3. Actualización de todas las dependencias (última estable a la fecha)

| Paquete | Antes | Ahora |
|---|---|---|
| @fontsource/ubuntu | 4.5.11 | 5.3.0 |
| @heroicons/react | 2.0.13 | 2.2.0 |
| @hookform/resolvers | ^3.3.2 | 5.9.2 |
| axios | ^1.19.0 | 1.21.0 |
| bootstrap | ^5.3.0-**alpha3** | 5.3.8 (stable) |
| chart.js | ^4.4.0 | 4.6.1 |
| react / react-dom | 18.2.0 | 19.3.1 |
| react-bootstrap | ^2.5.0 | 2.10.10 |
| react-chartjs-2 | ^5.2.0 | 5.3.1 |
| react-hook-form | 7.43.4 | 7.91.0 |
| react-router-dom | ^7.11.0 | 7.18.5 |
| yup | ^1.3.2 | 1.7.1 |
| js-file-download | 0.4.12 | 0.4.12 (sin cambios) |
| **devDeps nuevos** | — | vite 7.3.7, @vitejs/plugin-react 5.2.0 |
| electron | ^43.2.0 | 43.8.7 |
| electron-builder | ^26.15.3 | 26.18.0 |

## 4. Auditoría de vulnerabilidades (`npm audit`)

- **Antes:** 6 vulnerabilidades moderadas.
- **Después:** 6 vulnerabilidades moderadas, pero **ya no queda ninguna de las dependencias runtime** de la app web. Las que restan provienen exclusivamente de la cadena dev de empaquetado:
  - `electron-builder` → `app-builder-lib` → `@electron/universal` → `minimatch` (GHSA-g3hv-75wg-m249, DoS por amplificación en `globparts`, moderada).
  - Solo afecta a la herramienta de packaging de Electron (dev), no al runtime web ni a producción.
  - El "fix" automático de npm (`npm audit fix --force`) propone **bajar** a `electron-builder@25.1.0` (regresión breaking) — descartado; se documenta y se queda pendiente de que electron-builder suba la dependencia.

## 5. Compatibilidad y fixes

### Electron (`electron/main.js`)
- Los bundles de Vite usan `<script type="module">`, que Chromium **bloquea** al cargar por `file://` (app empaquetada). Fix aplicado:
  ```js
  app.commandLine.appendSwitch('allow-file-access-from-files')
  ```
- El flujo documentado en AGENTS.md no cambia: `npm run build` → `npm run build-electron` → `npm run package-windows|linux`.
- ⚠️ El empaquetado completo **no se ha probado** en este entorno; probarlo en Windows antes de distribuir.

### Firebase (`firebase.json`)
- No requirió cambios: Vite sigue generando la salida en `build/` (`outDir: 'build'`) y `firebase.json` sirve ese directorio. `base: './'` genera rutas relativas, igual que lo hacía el antiguo `homepage`.
- `FrontEnd/.gitignore` raíz ya ignoraba `/FrontEnd/build` — sin cambios.

### Scripts electron
- `electron` apunta ahora a `http://localhost:5173` (puerto dev de Vite).
- `build-electron`, `package-linux` y `package-windows`: sin cambios.

## 6. Verificación realizada

- ✅ `npm install` sin conflictos de peer deps.
- ✅ `npm run build` compila: bundle 831 kB JS (gzip 255 kB) / 247 kB CSS (gzip 34 kB).
- ✅ `npm run dev` (`start`) arranca en `http://localhost:5173/` y responde HTTP 200.
- ✅ Sin restos de `react-scripts` ni variables `REACT_APP_*` en el código.
- ✅ `npm audit`: sin vulnerabilidades en dependencias de runtime.

## 6b. Fix post-migración: pantalla en blanco (no era del bundler)

- **Síntoma:** `npm run dev` sin errores, pero la web quedaba en blanco.
- **Diagnóstico** (Chrome headless + consola): `Uncaught TypeError: Cannot read properties of undefined (reading 'id')` en `ProtectedUserRoute.jsx`. En la línea de `useCheckIsAuthorized(user['id'])` no se guardaba `user`, y el crash ocurría **antes** de que el `<Navigate to={Login}>` de la lógica de render (que sí lo gestiona) pudiera actuar.
- **Origen:** bug preexistente (ya en HEAD), no del bundler. Aparece en cualquier visita sin `user` en localStorage. Probablemente antes no se veía por tener sesión cacheada.
- **Fix aplicado (guarda, minimando la lógica existente):**
  - `components/ProtectedUserRoute.jsx`: `useCheckIsAuthorized(user ? user['id'] : undefined)`.
  - `components/hooks/useCheckIsAuthorized.jsx`: el `useEffect` no consulta la API si no hay `idUser` (evita llamada con `undefined` y deja `loading=false` para que el redirect al Login funcione).
- **Verificado** con Chrome headless: sin sesión ahora redirige al Login y lo renderiza; sin errores de consola.

## 7. Asuntos abiertos / deuda técnica

1. **Chunk > 500 kB:** Vite avisa del tamaño del bundle único (831 kB). Candidato a `manualChunks` / dynamic `import()` si interesa.
2. **Vulnerabilidad moderada residual** en `electron-builder` (ver §4) — pendiente de versión upstream sin regresión.
3. **Empaquetado Electron sin probar** en este entorno (ver §5).
4. Preexiste un `nginx` en el puerto 3000 del entorno de desarrollo (no relacionado, referencia futura).
