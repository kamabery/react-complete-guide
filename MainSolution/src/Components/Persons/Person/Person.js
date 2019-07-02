import React, { Component, Fragment } from 'react';
import classes from './Person.css'
import withClass from '../../../hoc/withClass'
import PropTypes from 'prop-types'
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        // this.inputElement.focus();
        console.log(this.context.authenticated);
        this.inputElementRef.current.focus();
    }

    render() {
        return (
            <Fragment>
                    {
                        this.context.authenticated ? <p>Authenticated!</p> : <p>Please Login</p>
                    }
                <p onClick={this.props.click}> I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p >{this.props.children}</p>
                <input 
                    // ref={(inputEl) => {this.inputElement = inputEl}} 
                    ref = {this.inputElementRef}
                    type="text" 
                    onChange={this.props.changed} 
                    value={this.props.name}/>
                    
            </Fragment>
        )
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);