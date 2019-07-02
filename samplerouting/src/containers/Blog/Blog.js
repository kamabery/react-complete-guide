import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent';
// import NewPost from '../Blog/NewPost/NewPost';

const AsyncNewPost = asyncComponent(() => {
    return import('../Blog/NewPost/NewPost');
})

class Blog extends Component {

    render () {
        return (
                <div className="Blog">
                    <header>
                        <nav>
                            <ul>
                            <li><NavLink
                                    to="/posts/"
                                    exact
                                    activeClassName="my-active"
                                    activeStyle={{
                                        color: '#fa923f',
                                        textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                                <li><NavLink 
                                    to= {'/new-post'}>New Post</NavLink></li>
                            </ul>
                        </nav>
                    </header>                    
                    <Switch>                    
                        <Route path="/new-post" component={AsyncNewPost} />
                        <Route path="/posts" component={Posts} /> 
                        {/* <Redirect from="/" to="/posts"/> */}
                        <Route render={() => <h1> Not Found </h1>}/>
                    </Switch>
            </div>
        );
    }
}

export default Blog;