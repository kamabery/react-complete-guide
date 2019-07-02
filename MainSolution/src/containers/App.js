import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../Components/Persons/Persons';
import Cockpit from '../Components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props){
    super(props)
    console.log('[app.js] constructor')
  }

  /*
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', state);
    return state;
  }
*/

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate() {
    console.log('[App.js] shouldComponenentUpdate')
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js componentDidUpdate]')
  }

  /*
  componentWillMount() {
    console.log('[App.js] Componenet will mount');
  }
*/

  state = {
    persons: [
      { id: 1, name: 'Max', age: 28 },
      { id: 2, name: 'Manu', age: 29 },
      { id: 3, name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  };


  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  };

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons})
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p => {return p.id === id}))

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState((prevState, props) => {
      return {
          persons: persons,
          changeCounter: prevState.changeCounter + 1
      };
    });
    
  }
  render() {
    console.log('[App.js] render');
    let peeps = null;

    if (this.state.showPersons) {
      peeps = (
        <div> 
          <Persons 
            authenticated={this.state.authenticated}
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}/>
          </div>
      );

    }

    return (
      <Aux>        
        <button onClick={() => {
          this.setState({showCockpit: false})
        }  }>Remove Cockpit</button>
        <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
          {this.state.showCockpit ? 
          
          <Cockpit
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}
            login={this.loginHandler}
            isAuthenticated={this.state.authenticated}
          /> 
          : null}
        {peeps}
        </AuthContext.Provider>
      </Aux>
      
    );

    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);
