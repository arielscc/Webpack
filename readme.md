# Guia de configuracion Webpack

Esta es una guia basica de como usar el paquete de npm `Webpack` en su versión 4.*.*, Los comandos e instrucciones que se usaron estaran descritos en el presente documento.

## Creando nuestro primer bundle js con Webpack

Para esta guia se iran usando diferentes comandos e instrucciones las cuales tendran una descripción e implementación.

Para instalar webpack primero debemos tener instalado nodejs y npm. Luego se necesitara crear un directorio que contenga nuestro proyecto, dentro de este directorio tendremos que iniciar un proyecto de npm con el comando: `npm init`, y finalmente se tendra que añadir las dependencias de webpack al archivo `package.json`:

```bash
npm install webpack webpacl-cli -D
```
* donde:
  webpack: Es la dependencia que aloja todas las funcionalidades de webpack.
  webpack-cli: Es la dependencia de interface de linea de comando que necesita webpack para ser ejecutado.


Luego de tener instalado las dependencias necesarias crearemos en la raiz de nuestro proyecto un archivo llamado: `index.js`con cualquier contendio, y ahora podremos pasarlo por webpack usando el siguiente comando:

```bash
npx webpack --entry './index.js' --output './bundle.js' --mode development
```
Donde:
  --entry:Es la ruta del archivo principal de nuestra aplicación JS a ser procesado por Webpack. Se pueden tener varios Entry Points.
  --output: Es la ruta de salida donde va a generar nuestro bundle con todos nuestros archivos especificados como Entry Points empaquetados en uno sólo.
  --mode (development | production): Es la instancia en la cual usaremos el archivo obtenido.

## Iniciando un webpack.config

Los proyectos normalmente no solo constan de un archivo, sino de cientos de ellos y de distinto tipo. Lo cual usar la linea de comandos para ejecutar todos seria un dolor de cabeza, por lo que es necesario tener toda esa configuracion dentro de un archivo. A este archivo lo llamaremos `webpack.config.js`, este debera ser creado en el directorio raiz.

Pasandole la configuracion que se tenía anteriormente el archivo `webpack.config.js` se vera así:

```js
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
```
Donde:
   `path.resolve(__dirname, 'dist')`: Obtiene una ruta absoluta a nuestro proyecto y en ella crea un directorio llamado `dist`.
   `filename: 'bundle.js'`: Es el nombre del archivo que sera colocado en el directorio `dist`.

Tambien podemos configurar los scripts del archivo `package.json`:

```js
"scripts" : {
  //...
  "build" : "webpack --mode development"
  //...
}
```

