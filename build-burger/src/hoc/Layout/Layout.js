import React, { Component, Fragment } from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {    
    state = {
        showSidDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSidDrawer: false});
    }

    drawerToggleClickedHandler = () => {
        this.setState((prevState) => {
            return {showSidDrawer: !prevState.showSidDrawer};
        });
    }

    render () {
        return (
            <Fragment>
            <Toolbar drawerToggleClicked={this.drawerToggleClickedHandler} />
            <SideDrawer 
                open={this.state.showSidDrawer} 
                closed={this.sideDrawerClosedHandler} />
            <main  className={classes.Content} >
                {this.props.children}
            </main>
            </Fragment>
        );
    }
};

export default Layout;