import React, { Component } from "react";
import AuthenticationService from "../../services/AuthenticationService";


class Login extends Component {

    constructor (props) {
        super(props)
        this.state = {
            userName : '',
            password : '',
            hasLoginFailed : false,
            showSuccessMessage : false
        }
       this.handleChange = this.handleChange.bind(this)
       this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    loginClicked () {
        console.log(this.state)
        AuthenticationService.executeJwtAuthentication(this.state.userName, this.state.password)
        .then(
            (response) => {
                AuthenticationService.registerSuccessfulLoginForJWT(this.state.userName,response.data.token)
                console.log("registerSuccessful")
                this.props.history.push(`/welcome/${this.state.userName}`)
            }
        ).catch( 
            () => {
                console.log("Failed")
                this.setState({hasLoginFailed : true})
                this.setState({showSuccessMessage : false})
            }   
        )
    } 
    
    
    render () {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}></ShowInvalidCredentials> */}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}
                    {/* <ShowSuccesfullMessage showSuccessMessage={this.state.showSuccessMessage}></ShowSuccesfullMessage> */}
                     User Name : <input name="userName" type="text" value={this.state.userName} onChange={this.handleChange}></input>
                    Password : <input name="password" type="password" value={this.state.password} onChange={this.handleChange}></input>
                <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }

}

export default Login