// Redux

// http://extension.remotedev.io/ - дев тулз для хрома

// Redux 3 principles
//
// Single source of truth (One state tree inside Store, predictability, Server side rendering, testing and debugging)
// State is read-only (can only access the state, not mutate it. Dispatch actions to change the state)
// Pure functions update state (pure functions === reducers, reducers return new state)

/*
*  Redux core concepts
*
*  1) Single state tree (Plain Javascript object, composed by reducers)
*
*  const state = {
*       todos: []
*  };
*
*
*  2) Actions
*
*  {
*       type: string, describes event
*       payload: optional data
*  }
*
*  Dispatch actions to reducers
*
*  {
*       type: 'ADD_TODO',
*       payload: {
*           label: 'make task',
*           complete: false
*       }
*  }
*
*
*  3) Reducers
*  Pure functions, respond to action.type, access to action.payload, composes new state, returns new state
*
*  function reducer(state, action) {
*       switch (action.type) {
*           case 'ADD_TODO':
*               return {
*                   todos: [...state.todos, action.payload]
*               }
*           default:
                return state;
*       }
*  }
*
*  4) Store
*
*   State container, components interact with a Store (Subscribe to slices of state, dispatch actions to the store), Store invokes reducers with previous state and action, reducers compose new state, store is updated => notifies subscribers
*
*  const state = {
*       todos: [
*           {label: 'make task', complete: false}
*       ]
*  }
*
*
*  5) One way data flow (image)
*
*
*
* */



// state, reducer, dispatch, Store, middleware (effects in ngrx)

// store - контейнер для state
// state - представление приложение, которое хранится в store

// Store {
//     state
//
//     private reducer(state, action) {
//         switch(action) {
//             case("1"):
//                 return state.copy();
//                 break;
//         }
//     }
//
//     dispatch(action) {
//         return reducer(state, action);
//     }
// }

// middleware - позволют подписываться на асинхронные события
// в ngrx - это эффекты



/*
* NGRX
*
* Reactive state management
*
* Reducer returns a pice of state to => Container component => presentational component
*
* Container (Aware of store, Dispatches actions, reads data from store)
* Presentational (Not aware of store, trigger callbacks via @Output)
* Read data from @Inputs
*
* */
