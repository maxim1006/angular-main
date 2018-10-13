import {ADD_TODO, REMOVE_TODO} from "./action";

export const initialState = {
    loaded: false,
    loading: false,
    data: [{label: "make task", complete: false}]
};

export function reducer(state = initialState, action: {type: string, payload: any}) {
    switch (action.type) {
        case ADD_TODO: {
            const todo = action.payload;
            const data = [...state.data, todo];

            return {
                ...state,
                data
            };
        }

        case REMOVE_TODO: {
            const todo = action.payload;
            state.data.splice(state.data.indexOf(todo), 1);

            return {
                ...state
            };
        }
    }

    return state;
}
