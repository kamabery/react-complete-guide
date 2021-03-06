import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { stat } from 'fs';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false
    }


    componentDidMount()  {
      if (!this.props.buildingBurger && this.props.authRedirectPath !== "/"){
          this.props.setAuthRedirectPath()
      }
    };
    

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

        if (rules.email) {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) & isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) =>{        
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        } 
        this.setState({controls: updatedControls, formIsValid: true})
    }

    switchModeHandler = (event) => {
        event.preventDefault();
        this.setState(prevSate => {
            return {isSignup: !prevSate.isSignup}
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value, 
            this.state.controls.password.value,
            this.state.isSignup);
    }


    render() {
        if(this.props.isAuthenticated) {
            return <Redirect to={this.props.authRedirectPath}/>
        }
        
        const formElementArray = [];

        for (let key in this.state.controls){
         formElementArray.push({
             id: key,
             config: this.state.controls[key]             
         });
        }

         let formElements = formElementArray.map(formElement =>
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            );

        if(this.props.loading) {
            formElements = <Spinner/>
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = 
                <p>{this.props.error.message}</p>
        }

        return (
            <div className={classes.AuthtData}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {formElements}
                </form>
                <Button btnType="Success" clicked={this.submitHandler}>Submit</Button>
                <Button btnType="Danger" 
                    clicked={this.switchModeHandler}>
                        SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => 
            dispatch(actions.auth(email, password, isSignup)),
        setAuthRedirectPath: (path) =>
            dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
