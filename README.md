# eslint instead of tslint
ng add @angular-eslint/schematics

then
"eslint-plugin-rxjs": "0.0.2-beta.16"

then
 tslint -> .eslintrc.json 

# ssr
1) при переходе на ssr добавил в server.ts в корне нормальные настройки

+ пакеты изза new Bufffer() ошибки в ноде (в основном проблема была в multer так что для его использования либо спускаемся на ноду 12 либо ждемс когда все проапдейтятся)
"dicer": "^0.3.0",
npm i buffer@latest --SD


# AngularCliProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Webpack
const ENV = process.env.npm_lifecycle_event;
