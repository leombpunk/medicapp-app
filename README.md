# MedicApp

MedicApp es una aplicación para la gestión de pacientes, turnos y profesionales de la salud.

## Tecnologias usadas
### FrontEnd

![Static Badge](https://img.shields.io/badge/HTML5%20-%20black?style=flat&logo=html5&labelColor=black&color=orange)
![Static Badge](https://img.shields.io/badge/CSS3-black?style=flat&logo=css3&labelColor=black&color=blue)
![Static Badge](https://img.shields.io/badge/JavaScript-black?style=flat&logo=javascript&labelColor=black&color=yellow)
![Static Badge](https://img.shields.io/badge/ReactJS%20-%20black?style=flat&logo=react&labelColor=black&color=blue)
![Static Badge](https://img.shields.io/badge/Bootstrap%205-black?style=flat&logo=bootstrap&labelColor=black&color=purple)

### BackEnd

![Static Badge](https://img.shields.io/badge/JavaScript-black?style=flat&logo=javascript&labelColor=black&color=yellow)
![Static Badge](https://img.shields.io/badge/NodeJS%20-%20black?style=flat&logo=Node.js&labelColor=black&color=green)
![Static Badge](https://img.shields.io/badge/Express%20-%20black?style=flat&logo=express&labelColor=black&color=white)
![Static Badge](https://img.shields.io/badge/MySQL%20-%20black?style=flat&logo=MySQL&labelColor=black&color=blue)


## Estructura del Proyecto

El proyecto está dividido en varias carpetas principales:

- **BackEnd**: Contiene el código del servidor y la lógica de negocio.
- **FrontEnd**: Contiene el código de la aplicación web.
- **Mobile**: Contiene el código de la aplicación móvil.

## Instalación

### Requisitos

- Node.js
- npm o yarn
- Expo CLI (para la aplicación móvil)

### BackEnd

1. Navega a la carpeta `BackEnd`:
    ```sh
    cd BackEnd
    ```
2. Instala las dependencias:
    ```sh
    npm install
    ```
3. Configura las variables de entorno copiando el archivo `.env_example` a `.env` y llenando los valores necesarios.
4. Inicia el servidor:
    ```sh
    npm start
    ```

### FrontEnd

1. Navega a la carpeta [FrontEnd](http://_vscodecontentref_/0):
    ```sh
    cd FrontEnd
    ```
2. Instala las dependencias:
    ```sh
    npm install
    ```
3. Inicia la aplicación web:
    ```sh
    npm start
    ```

### Mobile

1. Navega a la carpeta [Mobile](http://_vscodecontentref_/1):
    ```sh
    cd Mobile
    ```
2. Instala las dependencias:
    ```sh
    npm install
    ```
3. Inicia la aplicación móvil:
    ```sh
    expo start
    ```

## Uso

### Navegación

La aplicación web utiliza `react-router-dom` para la navegación. Las rutas principales están definidas en el archivo [App.jsx](http://_vscodecontentref_/2).

### Componentes

- **Providers**: Proveen contexto y estado a la aplicación.
- **Pages**: Contienen las diferentes páginas de la aplicación.
- **Hooks**: Contienen lógica reutilizable.

### Ejemplo de Uso

Para agregar un nuevo paciente, navega a la página de pacientes y haz clic en "Agregar Paciente". Llena el formulario y guarda los cambios.

## Contribución

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.