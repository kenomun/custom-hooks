import { useEffect } from 'react'
import { useReducer } from 'react'
import { todoReducer } from '../08-useReduce/TodoReducer'

const init=()=>{
    // extrae del local storage nuestros datos 
    return JSON.parse(localStorage.getItem('todos') || [])
}

export const useTodo = () => {

    const [todos, dispatch] = useReducer( todoReducer, [], init  )

    useEffect(() => {
        // graba en el local storage nuestro todos
      localStorage.setItem('todos', JSON.stringify( todos ))

    }, [ todos ])
    
    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        };

        dispatch( action );
    } ;

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });

    };

    const handleToggleTodo =( id ) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    };


    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}
