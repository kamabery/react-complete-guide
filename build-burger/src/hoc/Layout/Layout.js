import React, { Component, Fragment } from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

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
            <Toolbar isAuthenticated={this.props.isAuthenticated} drawerToggleClicked={this.drawerToggleClickedHandler} />
            <SideDrawer 
                isAuthenticated={this.props.isAuthenticated}
                open={this.state.showSidDrawer} 
                closed={this.sideDrawerClosedHandler} />
            <main  className={classes.Content} >
                {this.props.children}
            </main>
            </Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
    
}

export default connect(mapStateToProps)(Layout);