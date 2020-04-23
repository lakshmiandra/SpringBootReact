import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from  'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import Login from '../login'
import ListTodosComponent from './ListTodosComponent.jsx'
import Header from '../header'
import Footer from '../footer'
import Logout from '../logout'
import Dashboard from '../dashboard'
import Error from '../error'
import TodoComponent from './TodoComponent.jsx'


class TodoApp extends Component {
    render () {
        return (
            <div className="TodoApp">

                <Router>
                    <Header></Header>
                        <Switch>
                            <Route path="/" exact component={Login}></Route>
                            <Route path="/login" component={Login}></Route>
                            <AuthenticatedRoute path="/welcome/:name" component={Dashboard}></AuthenticatedRoute>
                            <AuthenticatedRoute path="/todos/:id" component={TodoComponent}></AuthenticatedRoute>
                            <AuthenticatedRoute path="/todos" component={ListTodosComponent}></AuthenticatedRoute>
                            <AuthenticatedRoute path="/logout" component={Logout}></AuthenticatedRoute>
                            <Route component={Error}></Route>
                        </Switch>
                    <Footer></Footer>
                </Router>
                {/* <LoginComponent></LoginComponent>
                <WelcomeComponent></WelcomeComponent> */}
            </div>
        )
    }
}

export default TodoApp