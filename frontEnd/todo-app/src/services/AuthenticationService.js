import axios from 'axios'
import {API_URL} from '../Constants'
export const USERNAME_SESSION_ATTRIBUTE='authenticatedUser'

class AuthenticationService {

    executeBasicAuthentication (userName,password) {
        return axios.get(`${API_URL}/basicAuth`, {headers:{authorization:this.createBasicAuthToken(userName, password)}})
    }

    executeJwtAuthentication (userName,password) {
        return axios.post(`${API_URL}/authenticate`, {
            userName,
            password
        })
    } 

    createBasicAuthToken(userName, password) {
        return 'Basic ' + window.btoa(userName + ":" + password)
    }

    registerSuccessfulLogin(userName, password) {
        sessionStorage.setItem(USERNAME_SESSION_ATTRIBUTE, userName)
        this.setUpAxiosInterceptors(this.createBasicAuthToken(userName, password))
    }
    logout () {
        sessionStorage.removeItem(USERNAME_SESSION_ATTRIBUTE)
    }

    isUserLoggedIn() {
       let user =  sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE)
       if (user == null) return false
       return true
    }

    getLoggedInUsername() {
        let user =  sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE)
        if (user == null) return ''
        return user
     }

     setUpAxiosInterceptors(basicAuthHeader) {

        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = basicAuthHeader
                } return config
            }
        )
     }

     registerSuccessfulLoginForJWT(username, token) {
        sessionStorage.setItem(USERNAME_SESSION_ATTRIBUTE, username)
        this.setUpAxiosInterceptors(this.createJwtAuthToken(token))
     }

     createJwtAuthToken(token) {
        return 'Bearer ' + token
     }
}
export default new AuthenticationService()