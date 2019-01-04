import {Component} from '@angular/core';
import {Store} from './store';
import {reducer} from './reducer';
import {AddTodo, RemoveTodo} from './action';

const reducers = {
    todos: reducer
};

const store = new Store(reducers, {});

@Component({
    selector: 'my-redux-store',
    template: `
        <p>Todos number: {{todos?.length}}</p>
        <input type="text" #input>
        <button 
            (click)="_addTodo(input)"
            type="button">
            Add TODO
        </button>

        <p *ngFor="let todo of todos">
            {{todo.label}}
            <button
                (click)="_removeTodo(todo)"
                type="button">
                Remove
            </button>
        </p>
    `
})

export class MyReduxStoreComponent {
    todos: any[];
    private subscription: () => any;

    ngOnInit() {
        this.subscription = store.subscribe((data) => {
            this.todos = data.todos.data;
        });
    }

    ngOnDestroy() {
        this.subscription();
    }

    _addTodo(input: HTMLInputElement) {

        if (!input.value.trim()) { return; }

        const payload = {label: input.value, complete: false};

        store.dispatch(new AddTodo(payload));

        input.value = '';
    }

    _removeTodo(todo: HTMLInputElement) {
        store.dispatch(new RemoveTodo(todo));
    }
}
