import React, { Component } from "react";
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from '../../services/AuthenticationService'
import moment from 'moment'

class ListTodosComponent extends Component {

    constructor(props) {
        console.log("constructor")
        super(props)
        this.state = {
            todos: 
            [
                // {id:1,description:'Learn to dance',done:false,targetDate: new Date()},
                // {id:2,description:'Become expert in React',done:false,targetDate: new Date()},
                // {id:3,description:'Explore India',done:false,targetDate: new Date()}
            ],
            message: null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate")
        console.log(nextProps)
        console.log(nextState)
        return true
    }

    componentWillUnmount() {
        console.log("componentWillUnmount")
    }

    componentDidMount() {
        console.log("componentDidMount")
        this.refreshTodos()
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUsername()
        //console.log(id+" "+username)
        TodoDataService.deleteTodo(username, id)
        .then(
            response => {
                this.setState({
                    message: `delte of todo ${id} is succesful`
                })
                this.refreshTodos()
            }
        )
    }

    updateTodoClicked(id) {
        //let username = AuthenticationService.getLoggedInUsername()
        console.log("update"+id)
        this.props.history.push(`/todos/${id}`)
        // TodoDataService.deleteTodo(username, id)
        // .then(
        //     response => {
        //         this.setState({
        //             message: `delte of todo ${id} is succesful`
        //         })
        //         this.refreshTodos()
        //     }
        // )
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                console.log(response)
                this.setState({
                    todos : response.data
                })
            }
        )
    }

    addTodoClicked() {
       // console.log("Add todo")
        this.props.history.push('/todos/-1')
    }

    render () {
        console.log("render")
        return <div>
                    <h1>List todos</h1>
                    {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                    <div className="container-fluid">
                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th>Id</th> */}
                                <th>Description</th>
                                <th>Is completed?</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map (
                                todo => 
                                <tr key={todo.id}>
                                    {/* <td>{this.state.todo.id}</td>
                                    <td>{this.state.todo.description}</td> */}
                                     {/* <td>{todo.id}</td> */}
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{moment(todo.targetDate.toString()).format('YYYY-MM-DD')}</td>
                                    <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                    <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                </tr>
                                )
                            }   
                        </tbody>
                    </table>
                    <div className="row"></div>
                            <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
    }
}

export default ListTodosComponent