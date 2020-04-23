import React, { Component } from "react";
import {Link} from  'react-router-dom'
import HellowWorldService from '../../api/todo/HelloWorldService'

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage =this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleErrorResponse = this.handleErrorResponse.bind(this)
        this.state = {
            welcomeMessage : ''
        }
    }
    render () {
        return   (
            <>
            <h1>Welcome!</h1>
            <div className="container">
                Welcome {this.props.match.params.name}. You can manage your todos<Link to="/todos"> here</Link>
            </div>

            <div className="container">
                Click here to get to get a customized welcome message.
                <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get welcome message</button>
            </div>
            <div className="container">
                {this.state.welcomeMessage}
            </div>
            </>
        )
    }

    retrieveWelcomeMessage() {
    //     HellowWorldService.executeHelloWorldService()
    //    .then(response => console.log(response))
    //    .then(response => this.handleSuccessfulResponse(response))

    //    HellowWorldService.executeHelloWorldServiceBean()
    //    .then(response => this.handleSuccessfulResponse(response))

       HellowWorldService.executeHelloWorldServiceBeanPathVariable(this.props.match.params.name)
       .then(response => this.handleSuccessfulResponse(response))
       .catch(error => this.handleErrorResponse(error))
    }

    

    handleSuccessfulResponse (response) {
        this.setState({
            welcomeMessage : response.data.message
        })
    }

    handleErrorResponse (error) {
        //console.log(error.response)
        let errorMessage = ''
        if(error.message) {
            errorMessage += error.message
        } if (error.response && error.response.data) {
            errorMessage += error.response.data
        }
        this.setState({
            welcomeMessage : errorMessage
        })
    }
}

export default Dashboard