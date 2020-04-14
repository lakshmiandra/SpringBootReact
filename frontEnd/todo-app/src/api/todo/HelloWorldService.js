import axios from 'axios'
import {API_URL} from '../../Constants'

class HellowWorldService {
    executeHelloWorldService() {
       // console.log("Hello World Service Executed")
        return axios.get(`${API_URL}/hello-world`)
    }

    executeHelloWorldServiceBean() {
        // console.log("Hello World Service Executed")
         return axios.get(`${API_URL}/hello-world-bean`)
     }

     executeHelloWorldServiceBeanPathVariable(name) {
        // console.log("Hello World Service Executed")
        //let username = 'lakshmi22'
        //let password = 'dummy'
        //let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
         return axios.get(`${API_URL}/hello-world/path-variable/${name}`
        //  ,{
        //      headers : {
        //          authorization : basicAuthHeader
        //      }
        //  }
        )
     }
}
export default new HellowWorldService()