import React, { useEffect, useReducer, useRef } from 'react';
import axios from 'axios';

const Todo = (props) => {
    // const [todoName, setTodoName] = useState('');
    // const [todoList, setTodoList] = useState([]);
    // const [todoState, setTodoState] = useState({userInput: '', todoList: []})

    const todoInputRef = useRef();
    const todoListReducer = (state, action) => {
        switch(action.type)  {
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload
            case 'REMOVE':
                return state.filter((todo) => todo.key !== action.payload);
            default:
                return state;
        }
    };

    const [todoList, dispatch] = useReducer(todoListReducer, []);

    

    useEffect(() => {
        axios.get('https://learnreacthooks-b8598.firebaseio.com/todos.json').then(result => {
            const todoData = result.data;
            const todos = [];
            for(const key in todoData){
                todos.push({key: key, name: todoData[key].name});
            }
            dispatch({type: 'SET', payload: todos})
        });
        return () => {
            console.log('Cleanup');
        }
    }, []);

    const mouseMoveHandler = event => {
        console.log(event.clientX, event.clientY);
    };

    useEffect(()=>{
        document.addEventListener('mousemove', mouseMoveHandler);
        return () => {
            document
                .removeEventListener(
                        'mousemove', 
                        mouseMoveHandler);
        }
    }, []);
    
    /*
    const inputChangeHandler = (event) => {
        setTodoName(event.target.value);
        
        // setTodoState({
        //    userInput: event.target.value,
        //    todoList: todoState.todoList
        // })
        
    }
    */

    const todoRemoveHandler = (todoId) => {
        axios.delete(`https://learnreacthooks-b8598.firebaseio.com/todos/${todoId}.json`)
        .then(dispatch({type: 'REMOVE', payload: todoId}))
        .catch(err=> console.log(err));
        
    }
    

    const todoAddHandler = () => {
        const todoName = todoInputRef.current.value;
        dispatch({type: 'ADD', payload: {key: todoName, name: todoName}})
        axios.post('https://learnreacthooks-b8598.firebaseio.com/todos.json', {name: todoName})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        /*
        setTodoState({
            userInput: todoState.userInput,
            todoList: todoState.todoList.concat(todoState.userInput)
        })
        */
    }


    return (
        <React.Fragment>
            <input 
                type="text" 
                placeholder="Todo" 
                // value = {todoState.userInput}
                ref={todoInputRef}/>
            <button onClick={todoAddHandler} type="button">Add</button>
            <ul>
                {todoList.map(todo => 
                    <li key={todo.key} 
                        onClick={() => todoRemoveHandler(todo.key)}>
                        {todo.name}
                </li>)}
                
            </ul>
        </React.Fragment>
    )
}

export default Todo
