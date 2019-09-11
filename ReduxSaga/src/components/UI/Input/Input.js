import React from 'react';
import classes from './Input.css';
const input = (props) => {
    let inputElement = null;
    const inputClasses = []    
    inputClasses.push(classes.InputElement);

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch(props.elementType) {
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')}
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('select'):
            const options = props.elementConfig.options.map(c=> {
                return <option key={c.value} value={c.value}>
                            {c.displayValue}
                        </option>})
            inputElement = <select 
                            className={inputClasses.join(' ')}
                            value={props.value}
                                onChange={props.changed}>
                                {options}
                        </select>;
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')}
                {...props.elementConfig} 
                value={props.value}/>;
    }
    return (        
    <div>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
    </div>
    )};

export default input;