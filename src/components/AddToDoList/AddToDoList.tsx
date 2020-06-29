import React, { useState, useRef } from 'react';

interface Props {
    addText: (todoText: string) => void
}

export const AddToDoList: React.FC<Props> = ({ addText }) => {
    const [todoText, setTodoText] = useState<string>('');
    const todoRef = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTodoText: string = e.target.value;
        setTodoText(newTodoText);
    }

    const submitText = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (todoText.trim()) {
            addText(todoText.trim());
        } else{
            alert('Empty Spaces Aren\'t Allowed');
        }
        setTodoText('');
    }

    return (
        <form onSubmit={(e) => submitText(e)} className="col s12">
            <div className="row">
                <div className="input-field col s6">
                    <input value={todoText} onChange={(e) => handleChange(e)} ref={todoRef} placeholder="Enter Todos" id="todos_text" type="text" />
                </div>
                <div   title={`${todoText ? 'Add Todos' : 'No Todos To Add'}`}  style={{padding: '1rem 0rem'}} className=" col s6">
                    <button id="submit" className={`waves-effect waves-light btn ${todoText ? '' : 'disabled'}`}>Add</button>
                </div>
            </div>
        </form>
    )
}
