import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingriedingSummary = Object.keys(props.ingredients)

    .map(igKey => {
        return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}> 
                    {igKey} 
                </span>
                :{props.ingredients[igKey]}
            </li>)
        });
    return (    
    <Fragment>
        <h3>Your Order</h3>
        <p> A delicous burger with the following </p>
        <ul>
            {ingriedingSummary}
        </ul>
        <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
        <p>
            Continue Checkout?
        </p>
        <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
    </Fragment>);
};

export default orderSummary;