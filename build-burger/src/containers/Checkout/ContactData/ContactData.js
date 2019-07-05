import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';
import { connect } from 'react-redux';

class ContactData extends Component {
    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',                    
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street',                    
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZipCode',                    
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                }
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country',                    
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }

            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'your email',                    
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            deliveryMethod: {
                elementType: 'select',
                touched: false,
                valid: true,
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest'
            }
        },
        formIsValid: false,
        loading: false
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(rules === undefined){
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength  && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) =>{        
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]        
        } 

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let key in updatedOrderForm){
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }
        
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for(let formElementIdentifer in this.state.orderForm){
            formData[formElementIdentifer] = 
                this.state.orderForm[formElementIdentifer].value;            
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }

        if(!this.state.formIsValid){
            alert('EEEeeeevilll');
        }
        else {
            axios.post('/orders.json', order)
            .then(
                response => {
                    console.log(response);
                    this.setState({loading: false});
                }
            
            )
            .catch(error => {                        
                console.log(error)
                this.setState({loading: false});
                
            } );
        }
    }

    render () {
        const formElementArray = [];
        for (let key in this.state.orderForm){
         formElementArray.push({
             id: key,
             config: this.state.orderForm[key]             
         })   
        }
        let form = (<div className={classes.ContactData}>
            <h4>Enter you Contact Data</h4>
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>Order</Button>
            </form>
        </div>
        );
        if (this.state.loading) {
            form = <Spinner/>
        }

        return (form)
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);