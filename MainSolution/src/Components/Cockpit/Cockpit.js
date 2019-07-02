import React, { useEffect, useRef, useContext } from 'react';
import classes from './cockpit.css';
import AuthContext from '../../context/auth-context';
const Cockpit = (props) => {

    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);

    useEffect(()=> {
        console.log('[Cockpit.js] useEffect');
        toggleBtnRef.current.click();
    }, []);

    useEffect(() => {
        console.log('[Cockpit.js] 2nd Effect');
        return () => {
            console.log('[Cocppt.js] cleanup work in Isle 5');            
        };
    });

    const styleClasses = [];
    let btnClass = '';
    if(props.showPersons) {
        btnClass = classes.red;
    }
    if(props.persons.length <= 2) {
       styleClasses.push(classes.red );
    }

    if(props.persons.length <= 1) {
      styleClasses.push(classes.bold);
    }    

    return(
        <div className={classes.Cockpit}>
            <h1>Hi, I'm a a react App!</h1>
            <p className={styleClasses.join( ' ' )}> This is a real app </p>
            <button
                ref={toggleBtnRef}
                className = {btnClass}
                onClick = {props.clicked}
                >
                    Toggle Persons
            </button>
            <button onClick={authContext.login}>Log in</button>
        </div>
    )
}

export default React.memo(Cockpit);