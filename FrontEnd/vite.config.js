import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base: './'` sustituye el antiguo `homepage` de CRA: necesario para Electron (file://) y Firebase.
// `outDir: 'build'` mantiene la salida donde la esperan `build-electron` y firebase.json.
export default defineConfig({
    plugins: [react()],
    base: './',
    build: {
        outDir: 'build',
    },
})
