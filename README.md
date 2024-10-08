# TestApex

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Contenido del TEST

Cuenta con 2 usuarios 
test = que no permite ver el detalle del pokemo en la table que se presenta al iniciar sesion
testAdmin tiene acceso al detalle del pokemos
    
    *Se implementa formulario en el login con 
        Formularios reactivos
        Validation.Requieren y MinLength
        Se Maneja el estado del boton para deshabilitarlo una vez que da click
        Tambien se realizarn pruebas unitar a este componente
    
    *Se implementar guards, para conocer si ya cuenta con sesion iniciar o tiene permiso para acceder al modulo

    *Se utliza el api de pokemon se obtiene el listado se pinta y se puede acceder a cada uno de los registros pintados

    *Se utiliza RXJS,
        take
        takeUntil
        DebounceTime

    *Se generan modelos para hacer el cast necesario en cada unos de los end-point

    *Se agrega un buscador  que realizar una busqueda a nivel de memoria con la informacion obtenida previamente

    *se agrega un pipe que formatea los nombres una mayuscula y una minuscula intercalandolas

    *se agrega una directiva que cambia el nombre del pokemon a azul si comienza con alguna vocal


Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
