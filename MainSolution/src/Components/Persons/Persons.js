import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
    /*
    static getDerivedStateFromProps(props, state) {
        console.log('[Persons.js] getDerivedStateFromProps');
        return state;
    }

    componentWillReceiveProps(){
        console.log('[Persons.js] componentWillReceiveProps', this.props);  
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('[Persons.js] shouldComponentUpdate');
        if (nextProps.persons !== this.props.persons)
        {
            return true;
        }
        else {
            return false;
        }
    }
    */

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotUpdate');
        return {message: 'Snapshot!'};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(snapshot);
        console.log('[Persons.js] componentDidUpdate');
    }

    componentWillUnmount(){
        console.log('[Persons.js] will unmount');
    }

    render() {
        console.log('[Person.js] rendering...');
        return  (
            this.props.persons.map((person, index) => {
                return  (<Person key= {person.id}
                  click={() => this.props.clicked(index)}
                  name={person.name} 
                  age={person.age}              
                  changed={(event) => this.props.changed(event, person.id)}
                  />
            );
              })
        )

    }
}

export default Persons;