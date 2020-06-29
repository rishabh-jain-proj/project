import React, { useState, useEffect } from 'react';
import { ToDos } from "../ToDos/ToDos";
import { AddToDoList } from "../AddToDoList/AddToDoList";
import { Store } from '../../Store';
interface TodosType {
    id: number,
    todo: string,
    status: boolean
}

export const ToDo: React.FC = () => {
    const { state, dispatch } = React.useContext(Store);
    const [todos, setTodos] = useState<TodosType[]>([]);

    useEffect(() => {
        setTodos(state)
    }, [state])

    const softDelete = async (id: number) => {
        if (todos && todos.length) {
            await dispatch({ type: 'softDelete', id })
            dispatch({})
        }
    }

    const addText = (todoText: string) => {
        let newId = Date.now();
        let isAlreadyExist: boolean = todos.some(todo => todo.todo.toLowerCase().trim() === todoText.toLowerCase().trim());
        if (!isAlreadyExist) {
            let params: TodosType = { id: newId, todo: todoText.trim(), status: true };
            return dispatch({ type: 'add', params })
        }
        else
        alert(`${todoText} already Exist!`)
    }

    return (
        <div className="todo-app container">
            <h1 className="center blue-text">Todo's</h1>
            <div className="row">
                <div className="offset-l2 offset-m4 offset-s12 col s12 m4 l8">
                    <AddToDoList
                        addText={addText} />
                    <ToDos
                        todos={todos}
                        softDelete={softDelete}
                    />
                </div>
            </div>


        </div>
    )
}