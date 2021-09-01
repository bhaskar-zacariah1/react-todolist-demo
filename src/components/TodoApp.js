import React, { useState, useEffect, useRef } from "react";
import { AiTwotoneEdit } from "react-icons/all";
import { AiFillDelete } from "react-icons/all";
import { GrUpdate } from "react-icons/all";
import FlipMove from "react-flip-move";

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");
    const [todoEditing, setTodoEditing] = useState(null);
    const [editingText, setEditingText] = useState("");

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        const store = localStorage.getItem("todolists");
        const loadedTodos = JSON.parse(store);

        if (loadedTodos) {
            setTodos(loadedTodos);
        }
    }, []);

    useEffect(() => {
        const store = JSON.stringify(todos);
        localStorage.setItem("todolists", store);
    }, [todos]);

    const handleChange = (e) => {
        setTodo(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const newTodo = {
            id: new Date().getTime(),
            text: todo,
            completed: false,
        };
        setTodos([...todos].concat(newTodo));
        setTodo("");
    };
    const deleteTodo = (id) => {
        const updatedTodos = [...todos].filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const editTodo = (id) => {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.text = editingText;
            }
            return todo;
        });
        setTodos(updatedTodos);
        setTodoEditing(null);
        setTodoEditing("");
    };
    return (
        <div>
            <header>
                <form id="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        onChange={handleChange}
                        value={todo}
                        ref={inputRef}
                    />
                    <button type="submit">Add</button>
                </form>
            </header>
            <FlipMove duration={500} easing="ease-in-out">
                {todos.map((todo) => (
                    <div className="list" key={todo.id}>
                        <p>
                            {todoEditing === todo.id ? (
                                <input
                                    type="text"
                                    onChange={(e) => setEditingText(e.target.value)}
                                    value={editingText}
                                />
                            ) : (
                                <div>{todo.text}</div>
                            )}
                            <span>
                                <AiFillDelete
                                    className="icons"
                                    onClick={() => deleteTodo(todo.id)}
                                />

                                {todoEditing === todo.id ? (
                                    <GrUpdate
                                        className="icons"
                                        onClick={() => editTodo(todo.id)}
                                    />
                                ) : (
                                    <AiTwotoneEdit
                                        className="icons"
                                        onClick={() => setTodoEditing(todo.id)}
                                    />
                                )}
                            </span>
                        </p>
                    </div>
                ))}
            </FlipMove>
        </div>
    );
}

export default TodoApp;
