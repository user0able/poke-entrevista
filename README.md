# PokeEntrevista

Este proyecto fue generado con [Angular CLI]
Interactúa con la API de PokeApi para mostrar los primeros 151 pokemones, con la posibilidad de ordenarlos, paginarlos y buscarlos por nombre.
Muestra Peso y Altura de cada pokemon, también permite eliminarlos de la lista.
Se utiliza:

- Eslint y prettier para mantener el código limpio y ordenado.
- Angular Material para los estilos y componentes.
- RxJS para la comunicación con la API junto con HttpClient.
- `ng serve`, con HMR para el desarrollo (Hot Module Replacement, al guardar los cambios se refrescan solo los cambios)
- `npm run lint`, que corrige automáticamente los errores de linting.
- `npm run prettier`, para corregir automáticamente los estilos de código con prettier.
  "lint": "ng lint --fix",
  "prettier": "npx prettier --write ."

# Requisitos:

Angular CLI: 16.2.6
Node: 18.16.0
Package Manager: npm 9.6.7
OS: darwin arm64
Angular: 16.2.9
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router

## Package Version

@angular-devkit/architect 0.1602.6
@angular-devkit/build-angular 16.2.6
@angular-devkit/core 16.2.6
@angular-devkit/schematics 16.2.6
@angular/cdk 16.2.8
@angular/cli 16.2.6
@angular/material 16.2.8
@schematics/angular 16.2.6
rxjs 7.8.1
typescript 5.1.6
zone.js 0.13.3

# Instrucciones de instalación

- Clonar el repositorio
- Instalar dependencias con `npm install`
- Ejecutar el servidor de desarrollo con `ng serve`
- Abrir el navegador en `http://localhost:4200/`

# Requisitos Stackeholders:

## Problema: Crea una interfaz simple con lo siguiente:

1.- Obten todos los Pokemon iniciales (151) y listarlos
2.- El listado debe poder ser paginado
3.- El listado debe poder ser ordenado
4.- El listado debe poseer un buscador
5.- Se deben poder quitar temporalmente de la lista los registros (botón eliminar Pokemon)
6.- Dejar en repositorio de Github, público para poder revisar el código
7.- Dejar MD con las instrucciones de instalación

## Requisitos:

1.- Usar Angular 5+
2.- Si lo desea, puede usar angular material o cualquier librería/framework css para estilos

## Evaluación

1.- Se evaluará claridad y legibilidad del código
2.- Propuesta de la solución y capacidad de resolución del problema
3.- Nombre de métodos, variables y escalabilidad del proyecto
Documentación disponible
PokeApi: https://pokeapi.co/docs/v2
Angular: https://angular.io/
Angular Material: https://material.angular.io/

TODO:

- [x] 1.- Obten todos los Pokemon iniciales (151) y listarlos
- [x] 2.- El listado debe poder ser paginado
- [x] 3.- El listado debe poder ser ordenado
- [x] 4.- El listado debe poseer un buscador
- [x] 5.- Se deben poder quitar temporalmente de la lista los registros (botón eliminar Pokemon)
- [x] 6.- Dejar en repositorio de Github, público para poder revisar el código
- [x] 7.- Dejar MD con las instrucciones de instalación
