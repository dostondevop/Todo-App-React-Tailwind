import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {

    const inputRef = useRef();
    const [todoList, setTodoList] = useState(localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : []);

    const add = () => {
        const inputText = inputRef.current.value.trim();

        if (inputText === "") {
            return null;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        }

        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
    }

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== id)
        })
    }

    const toggle = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {...todo, isComplete: !todo.isComplete};
                }
                return todo;
            })
        })
    }

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }, [todoList]);

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>

        {/* {Title} */}
        <div className='flex items-start mt-4 gap-2'>
            <img className='w-8' src={todo_icon} alt="" />
            <h1 className='text-3xl font-semibold'>To-Do List</h1>
        </div>

        {/* {Input Box} */}
        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
            <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add your task' onKeyDown={(e) => e.key === 'Enter' && add()} />
            <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>Add +</button>
        </div>

        {/* {Todo List} */}
        <div className="max-h-[550px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-lg">
            {todoList.map((todo, index) => (
                <TodoItems 
                    key={index} 
                    text={todo.text} 
                    id={todo.id} 
                    isComplete={todo.isComplete} 
                    deleteTodo={deleteTodo}
                    toggle={toggle} 
                />
            ))}
        </div>

    </div>
  )
}

export default Todo