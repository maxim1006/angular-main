# eslint instead of tslint
ng add @angular-eslint/schematics

then
"eslint": "^6.8.0",
"@angular-eslint/builder": "0.0.1-alpha.32",
"@angular-eslint/eslint-plugin": "0.0.1-alpha.32",
"@angular-eslint/eslint-plugin-template": "0.0.1-alpha.32",
"@angular-eslint/schematics": "0.0.1-alpha.32",
"@angular-eslint/template-parser": "0.0.1-alpha.32",
"@typescript-eslint/eslint-plugin": "2.31.0",
"@typescript-eslint/parser": "2.31.0",
"eslint-plugin-rxjs": "0.0.2-beta.16",
"eslint-config-prettier": "^6.11.0",
"eslint-plugin-prettier": "^3.1.3",
"prettier": "^2.0.5"

then
 tslint -> .eslintrc.json 
 .prettierrc
 
 then
  editor settings

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

## `git one commit`
1) git cherry -v feature/version-2.0 | find /c /v ""
2) git rebase -i HEAD~n
3) squash все кроме первого
4) git push --force


Для линуха
git cherry -v master | wc -l
git rebase -i HEAD~5
squash все кроме первого
git push --force
