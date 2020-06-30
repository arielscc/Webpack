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

## Cargando configuraciones por defecto y personalizadas


## Múltiples puntos de entrada

Para la generación de multiples archivos de tipo bundle podemos pasarle en nuestra configuracion de entrada del archivo `webpack.config.js`:

```js
//...
  entry: {
    home: path.resolve(__dirname, 'src/js/home.js'),
    precio: path.resolve(__dirname, 'src/js/precio.js'),
    contacto: path.resolve(__dirname, 'src/js/contacto.js')
  },
//...
```
Para que no exista ningun error en la salida, debemos tener asignado un archivo de salida para cada una de las entradas, esto se podría hacer añadiendo un template en valor de la propiedad `filename` de `output` de la siguiente forma:

```js
//...
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  }
//...
```

## Introducción al uso de plugins

Los Plugins sirven para extender las capacidades de webpack y dar más poder a los loaders.

### Instalación de plugin css y html

Este plugin permite realizar operaciones a un archivo css, para su instalacion:

```bash
 npm install mini-css-extract-plugin html-webpack-plugin -D
```

En el archivo `webpack.config.js` debe importar los paquetes

```js
...
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
...
  use: [
  {
    loader: MiniCssExtractPlugin.loader
  },
  'css-loader'
  ]
...
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new HtmlWebpackPlugin({
      title: 'Plugins'
    })
  ]
```

## Servidor de desarrollo

Para usar el servidor de desarrollo que provee Webpack, se debe instalar de la siguiente forma:

```bash
npm install webpack-dev-server -D
```
para utilizarlo se debe generar el siguiente script en `package.json`:
```js
"scripts": {
  ...
  "server": "webpack-dev-server"
}
```

Una vez que se ejecute este script nos creara una direccion de un servidor local. ej. `http://localhost:8080`.

## Hot Module Replacement

Hot Module Replacement (HMR) es un plugin de Webpack que permite intercambiar, agregar o eliminar módulos en tiempo de ejecución, sin una recarga completa de la página.

HMR puede acelerar significativamente el desarrollo de las siguientes formas:

Conservando el estado de la aplicación que se pierde durante una recarga.
Ahorre un valioso tiempo de desarrollo actualizando solo lo que ha cambiado.
Actualice al instante el navegador cuando se realicen modificaciones a CSS / JS en el código fuente, que es casi comparable a cambiar los estilos directamente en las herramientas de desarrollo del navegador.

Se deben adicionar las siguientes configuraciones al archivo `webpack.config.js`:

```js
const webpack = require('webpack');
//...
module.exports = {
  //...
  devServer: {
    hot: true,
    open: true,
    port:9000
  },
  plugins: [
    //...
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

Cuando se trabaja en modo desarrollo, el plugin `MiniCssExtractPlugin` puede causar que el navegador se recargue ya que primero conpilara los archivos css y los enlazara con el archivo principal, para solucionar este problema en modo desarrollo, es recomendable cambiar el:

```js
module: {
  rules: [{
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
    ]
  }]
}
```
por el:
```js
use: [
  'style-loader'
]
```
## Soporte de Javascript moderno
Javascript es un lenguaje en constante evolución, cada año se encuentra agragando nuevas funcionalidades.

Una de las mayores ventajas y desventajas que tenemos es que javascript se corre en el navegador, lo que significa uso menor de recursos de parte de nuestros servidores, pero también que los navegadores se actualizan más lento que los nuevos releases de las versiones, además de que existen diferentes navegadores que soportan diferentes funcionalidades.

Para poder tener un mejor developer experience (que los desarrolladores programen más rápido) con las funcionalidades modernas de JavaScript es necesario utilizar un transpilador de código, siendo el más popular babel.

El papel de babel será el de transpilar (convertir y adaptar código) escrito en estándares modernos (normalmente superior a ecmaScript 2015) a estándares que soporten la mayoría de los navegadores, de esta manera el desarrollador se preocupa por porgramar de manera cómoda y webpack con babel lo convierten en lo que sea mejor para los navegadores.

Para hacer uso de Babel en webpack, como éste tiene un loader (babel-loader), tenemos que instalar @babel/core (que tiene la funcionalidad básica de babel) y babel-loader e instanciar el loader dentro de nuestras rules de la siguiente manera:

```bash
npm install -D @babel/core @babel/preset-env babel-loader
```
Y en el archivo `webpack.config.js` se debera adicionar:
```js
  module: {
    rules: [
    ...
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
```

Babel requerirá de configuración, ésta puede ser declarada dentro del webpack, pero se recomienda hacerlo dentro de un archivo llamado `.babelrc` que leerá babel a la hora de ser configurado por webpack.

```js
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

Para utilizar funcionalidades algunas funcionalidades como sync await se debe instalar lo siguiente:

```bash
npm install -D @babel/plugin-transform-runtime
```
para que este plugin de babel funcione es necesario tener instalado:
```bash
npm install @babel/runtime
```
Y finalmente se tiene que adicionar las siguientes lineas al archivo `.babelrc`:

```js
{
  ...
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
```