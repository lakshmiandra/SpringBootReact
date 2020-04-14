import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";


class LoginComponent extends Component {

    constructor (props) {
        super(props)
        this.state = {
            userName : 'lakshmi22',
            password : '',
            hasLoginFailed : false,
            showSuccessMessage : false
        }
       // this.handleUserNameChange = this.handleUserNameChange.bind(this)
       // this.handlePasswordChange = this.handlePasswordChange.bind(this)
       this.handleChange = this.handleChange.bind(this)
       this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
       // console.log(this.state)
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    // handleUserNameChange(event) {
    //     console.log(event.target.value)
    //     this.setState({
    //         userName : event.target.value
    //     })
    // }

    
    // handlePasswordChange(event) {
    //     console.log(event.target.value)
    //     this.setState({
    //         password : event.target.value
    //     })
    // }

    // render () {
    //     return (
    //         <div>
    //            User Name : <input name="userName" type="text" value={this.state.userName} onChange={this.handleUserNameChange}></input>
    //            Password : <input name="password" type="password" value={this.state.password} onChange={this.handlePasswordChange}></input>
    //            <button>Login</button>
    //         </div>
    //     )
    // }

    loginClicked () {
        console.log(this.state)
        // if (this.state.userName === 'lakshmi22' && this.state.password === 'dummy')  {
        //     AuthenticationService.registerSuccessfulLogin(this.state.userName,this.state.password)
        //     console.log("registerSuccessful")
        //     this.props.history.push(`/welcome/${this.state.userName}`)
        //     //console.log("successful")
        //     // this.setState({
        //     //     hasLoginFailed : false
        //     // })
        //     // this.setState({
        //     //     showSuccessMessage : true
        //     // })
        // } else { 
        //     console.log("Failed")
        //     this.setState({
        //         hasLoginFailed : true
        //     })
        //     this.setState({
        //         showSuccessMessage : false
        //     })
        // }

        // AuthenticationService.executeBasicAuthentication(this.state.userName, this.state.password)
        // .then(
        //     () => {
        //         AuthenticationService.registerSuccessfulLogin(this.state.userName,this.state.password)
        //         console.log("registerSuccessful")
        //         this.props.history.push(`/welcome/${this.state.userName}`)
        //     }
        // ).catch( 
        //     () => {
        //         console.log("Failed")
        //         this.setState({hasLoginFailed : true})
        //         this.setState({showSuccessMessage : false})
        //     }   
        // )
           
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

// function ShowInvalidCredentials(props) {
// if (props.hasLoginFailed) {
//     return <div>Invalid Credentials</div>
// } return null
// }

// function ShowSuccesfullMessage(props) {
//     if (props.showSuccessMessage) {
//         return <div>Login Successful</div>
//     } return null
// }  

export default LoginComponent