import React from 'react';

interface List {
    id: number,
    todo: string,
    status: boolean
}

interface Props {
    todos: List[];
    softDelete: (id: number) => void;
}

export const ToDos: React.FC<Props> = ({ todos, softDelete }) => {
    const todoList = todos.length ? (
        todos.map(todo => {
            return (
                <div style={{ textDecoration:  !todo.status ? 'line-through' : '', cursor: 'pointer' }}
                    onClick={() => softDelete(todo.id)}
                    className="collection-item"
                    key={todo.id}
                    title={todo.status ? 'Click To Mark As Completed': 'Click To UnMark As Incomplete'}>
                    <li className="todo-list">{todo.todo}</li>
                </div>
            )
        })) : (<p data-testid="empty-msg" className="center">Start Adding Your Todos...</p>)
    return (
        <div className="todos">
            {todoList}
        </div>
    )
}