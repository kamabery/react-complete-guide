import React, { useContext } from 'react'
import AuthContext from './../auth-context';

const Header = (props) => {
    const auth = useContext(AuthContext);
    let listButton  = <button onClick={props.onLoadAuth}>Auth</button>;
    if(auth.status === true){
        listButton = <button onClick={props.onLoadTodos}> Todo List </button>
    }
    return (
        <header>
            {listButton} 
        </header>
    )
}

export default Header
