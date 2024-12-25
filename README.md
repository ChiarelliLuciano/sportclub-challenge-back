# sportclub-challenge-back

## Descripción

**sportclub-challenge-back** es una API básica desarrollada en Node.js con TypeScript.

## Características

-   **TypeScript** para tipado estático.
-   **Express** como framework de servidor.
-   **Axios** para solicitudes HTTP.
-   **Node-cache** para almacenamiento en caché en memoria.
-   **Jest** para pruebas unitarias y de integración.
-   Configuración sencilla para desarrollo y despliegue.

## Requisitos previos

Asegúrate de tener instalados los siguientes programas:

-   [Node.js](https://nodejs.org/) (versión 18 o superior).
-   [npm](https://www.npmjs.com/) (incluido con Node.js).

## Instalación

1. Clona este repositorio:

    ```bash
    git clone https://github.com/ChiarelliLuciano/sportclub-challenge-back.git
    cd sportclub-challenge-back
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

## Configuración

Crea un archivo `.env` en el directorio raíz para configurar variables de entorno:

```env
SERVER_PORT=3000
SERVER_HOSTNAME=localhost
SPORT_CLUB_API_ENDPOINT=https://api.ejemplo.com
```

## Scripts disponibles

### `npm run build`

Compila el proyecto de TypeScript a JavaScript y genera los archivos en el directorio `build/`.

```bash
npm run build
```

### `npm run serve`

Inicia el servidor en modo de desarrollo utilizando `nodemon`. Esto permite recargar automáticamente cuando se realizan cambios en los archivos
fuente.

```bash
npm run serve
```

### `npm run test`

Ejecuta las pruebas utilizando Jest y genera un informe de cobertura.

```bash
npm run test
```

## Ejecución

### Modo Desarrollo

1. Asegúrate de que las variables de entorno estén configuradas correctamente en el archivo `.env`.
2. Inicia el servidor en modo desarrollo:

    ```bash
    npm run serve
    ```

3. Accede a la API en [http://localhost:3000](http://localhost:3000).

### Compilación y Ejecución en Producción

1. Compila el proyecto:

    ```bash
    npm run build
    ```

2. Ejecuta el código compilado:

    ```bash
    node build/server.js
    ```

3. Accede a la API en [http://localhost:3000](http://localhost:3000).

## Pruebas

1. Ejecuta todas las pruebas:

    ```bash
    npm run test
    ```

2. Visualiza el informe de cobertura generado en el directorio `coverage/`.

## Contacto

Para preguntas o comentarios, abre un [issue](https://github.com/ChiarelliLuciano/sportclub-challenge-back/issues).

---

© 2024 Luciano Chiarelli. Todos los derechos reservados.
