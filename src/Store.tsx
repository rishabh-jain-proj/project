// @ts-ignore
import React, { useReducer } from 'react';

interface ITodos {
    id: number,
    todo: string,
    status: boolean
}

type State = ITodos[];

type Action =
    | { type: 'add'; params: ITodos }
    | { type: 'softDelete', id: number };


const loadState = (): State => {
    try {
        const serializedState = localStorage.getItem('todos');
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    }
    catch (error) {
        console.log(`DataLoad Error ${error}`)
        return [];
    }
};
export const saveState = (state: State) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('todos', serializedState);
    }
    catch (e) {
        console.log(`DataSave Error ${e}`)
        return [];
    }
};

const initialState: ITodos[] = loadState()

export const Store = React.createContext<State | any>(initialState);

const ToDoReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "add":
            let newState: State = [...state, { ...action.params }];
            saveState(newState)
            return newState
        case "softDelete":
           
            let updatedSate:State= state.map(todo => {
                if (todo.id === action.id) {
                    todo.status = !todo.status;
                    return (todo);
                } else {
                    return (todo);
                }
            });
            saveState(updatedSate);
            return updatedSate

        default:
            return state;
    }
}

export const StoreProvider = (props: any): JSX.Element => {
    const [state, dispatch] = useReducer(ToDoReducer, initialState)
    return <Store.Provider value={{ state, dispatch }}>{props.children}</Store.Provider>
}