# 1° Proyecto Web II Server

## Descripción del Proyecto

**1° Proyecto Web II Server** es una API REST desarrollada con Node.js y MongoDB que gestiona usuarios, cuentas, avatares, playlists y videos. Esta API permite crear, leer, actualizar y eliminar (CRUD) recursos, utilizando MongoDB como base de datos y Express.js como framework para manejar las rutas y controladores.

## Estructura del Proyecto

El proyecto sigue una estructura organizada con directorios para modelos, controladores y la configuración principal del servidor.

### Modelos

- **UserModel**: Define la estructura de los usuarios, incluyendo campos como `email`, `password`, `PIN`, `name`, `lastName`, `country`, `birthDate`, y `account`. El estado de cada usuario se maneja con un booleano `state`.
  
- **AccountModel**: Representa las cuentas asociadas a los usuarios. Incluye campos como `fullName`, `PIN`, `avatar`, `age`, y una referencia al `user` mediante un `ObjectId`.
  
- **AvatarModel**: Gestiona las imágenes de perfil de los usuarios. Almacena URLs de imágenes en MongoDB.
  
- **PlaylistModel**: Almacena las playlists de los usuarios. Cada playlist está asociada a un `user` y puede contener múltiples videos.
  
- **VideoModel**: Define la estructura de los videos que pueden ser añadidos a las playlists. Incluye campos como `name` y `URL`.

### Controladores

- **UserController**: Maneja la lógica para la gestión de usuarios, incluyendo funciones para registrar usuarios, iniciar sesión, obtener usuarios, actualizar y eliminar usuarios (cambio de estado).
  
- **AccountController**: Gestiona las cuentas de usuario, permitiendo crear, obtener, actualizar y eliminar (cambiar estado) cuentas. Verifica la validez del PIN, la edad, y que los usuarios existan.
  
- **AvatarController**: Gestiona la creación y recuperación de avatares. Permite validar y almacenar URLs de imágenes.
  
- **PlaylistController**: Permite a los usuarios gestionar sus playlists, incluyendo la creación, obtención y eliminación de playlists. También maneja la relación con los videos.
  
- **VideoController**: Gestiona los videos que pueden ser añadidos a las playlists. Permite crear, obtener, actualizar y eliminar videos.

### Configuración del Servidor

El servidor está configurado en el archivo `index.js` donde se inicializan los siguientes elementos:

- **Express**: Framework utilizado para manejar las rutas y controladores.
  
- **Mongoose**: Biblioteca para la conexión y manejo de datos en MongoDB.
  
- **Rutas**: Se configuran las rutas para cada recurso (`User`, `Account`, `Avatar`, `Playlist`, `Video`), que apuntan a sus respectivos controladores.

El servidor se ejecuta en el puerto 3001 y está preparado para recibir solicitudes HTTP POST, GET, PATCH, y DELETE para los recursos mencionados.

## Instalación y Configuración

1. **Clonar el repositorio**:
    ```bash
    git clone https://github.com/FierceSpectrum/1-Proyecto-Web-II-Server
    cd 1-Proyecto-Web-II-Server
    ```

2. **Instalar las dependencias**:
    ```bash
    npm install
    ```

3. **Configurar la base de datos**: Asegúrate de tener MongoDB instalado y en funcionamiento. Puedes configurar la URL de la base de datos en un archivo `.env` (si se está utilizando) o directamente en el archivo `index.js`.

4. **Ejecutar el servidor**:
    ```bash
    npm start
    ```

El servidor estará corriendo en `http://localhost:3001`.

## Uso de la API

### Endpoints Principales

#### User

- **POST** `/api/users`: Crear un nuevo usuario.
- **GET** `/api/users`: Obtener todos los usuarios (con `state: true`).
- **PATCH** `/api/users`: Actualizar la información de un usuario.
- **PUT** `/api/users`: Actualizar la información de un usuario.
- **DELETE** `/api/users`: Cambiar el estado de un usuario a `false` (borrado lógico).

#### Account

- **POST** `/api/accounts`: Crear una nueva cuenta para un usuario.
- **GET** `/api/accounts`: Obtener todas las cuentas de un usuario.
- **PATCH** `/api/accounts`: Actualizar la información de una cuenta.
- **PUT** `/api/accounts`: Actualizar la información de una cuenta.
- **DELETE** `/api/accounts`: Cambiar el estado de una cuenta a `false`.

#### Avatar

- **POST** `/api/Creatavatars`: Crear un nuevo avatar (predefinido).
- **GET** `/api/avatars`: Obtener todos los avatares.

#### Playlist

- **POST** `/api/playlists`: Crear una nueva playlist para un usuario.
- **GET** `/api/playlists`: Obtener todas las playlists de un usuario.
- **DELETE** `/api/playlists`: Cambiar el estado de una playlist a `false`.

#### Video

- **POST** `/api/videos`: Crear un nuevo video y añadirlo a una playlist.
- **GET** `/api/videos`: Obtener todos los videos.
- **PATCH** `/api/videos`: Actualizar un video.
- **PUT** `/api/videos`: Actualizar un video.
- **DELETE** `/api/videos`: Cambiar el estado de un video a `false`.

## Dependencias

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework web para Node.js.
- **Mongoose**: ODM para MongoDB.
- **dotenv**: Para gestionar variables de entorno (opcional).

## Estado del Proyecto

Este proyecto fue creado en el 2023, durante el segundo cuatrimestre del año, como una práctica para aprender los fundamentos del desarrollo web. Actualmente, se están realizando algunas actualizaciones para mejorar la estructura del código y la organización del repositorio en GitHub.

## Licencia

Este proyecto no tiene una licencia formal. Fue creado con fines educativos y no está destinado para uso comercial. Los desarrolladores son estudiantes de ingeniería de software que están aprendiendo y mejorando sus habilidades.

