import { Component, OnInit } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "m-redux",
    templateUrl: "redux.component.html",
})
export class MReduxComponent {}

/*  Принципы redux:
*   Single source of truth - единственный объект на все приложение
    State is read-only - нельзя мутировать этот объект, если хотим поменять что-то в стейте, то используем dsipatch экшена и возвращаем immutable объект
    Pure functions update state - если фукнция получает одинаковые входные данные, она возвраащает одинаковый результат (эта фукнция называется reducer)
*
* Single state tree - plain javascript Object, который изменяется с помощью reducers
*
* const state = {
*   todos: []
* };
*
* Actions - это объект {
*   type: string, (описывает event)
*   payload?: any; (optional data)
* }
*
* const action = {
*   type: 'ADD_TODO',
*   payload: {
*       label: 'Eat',
*       complete: false
*   }
* }
*
*
* Reducers - pure function
*
* function sum(a, b) {return a + b;} - пример чистой функции
*
* function reducer(state, action) // TODO 6.29
*
*
* Store
*
*
*
* */
