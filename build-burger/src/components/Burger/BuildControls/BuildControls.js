import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (    
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label}
                    added = {() => props.ingredientUpdated(ctrl.type, +1)}
                    removed = {() => props.ingredientUpdated(ctrl.type, -1)}
                    disabled={props.disabled[ctrl.type]}
                    />
            ))}            
            <button 
                className={classes.OrderButton}
                disabled={!props.purchaseable}
                onClick={props.purchase}
                >{props.isAuthenticated ? 'ORDER NOW' : 'Sign up to Order'}</button>
    </div>
);

export default buildControls;