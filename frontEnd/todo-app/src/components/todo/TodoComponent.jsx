import React, {Component} from 'react'
import moment from 'moment'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService.js'

class TodoComponent extends Component {

constructor(props) {
    super(props)
    this.state = {
        id: this.props.match.params.id,
        description : '',
        targetDate : moment(new Date()).format('YYYY-MM-DD')
 
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
}

validate(values) {
    let errors = {}
    if (!values.description) {
        errors.description = 'Enter description'
    } else if (values.description.length<5) {
        errors.description = 'Enter characters more than 5 '
    }

    if (!moment(values.targetDate).isValid()) {
        errors.targetDate = 'Enter valid target date'
    } 

    return errors
}

onSubmit(values) {
   // console.log(values)
     let todo = {
        id : this.state.id,
        description : values.description,
        targetDate : values.targetDate
    }

   if (this.state.id === -1) {
        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.createTodo(username,todo).then(
            () => this.props.history.push('/todos')
        )
    } else {
        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.updateTodo(username,this.state.id,todo).then(
            () => this.props.history.push('/todos')
        )
    }
}

componentDidMount() {
    console.log("componentDidMount todo component"+this.state.id)
    if (this.state.id === "-1") {
        console.log("11111111111")
        return
    }

    let username = AuthenticationService.getLoggedInUsername()
    TodoDataService.getTodo(username,this.state.id)
    .then(
        response => this.setState({
            description : response.data.description,
            targetDate : moment(response.data.targetDate).format('YYYY-MM-DD')
        })
    )
}

render() {
    let {description,targetDate} = this.state
    //let targetDate = this.state.targetDate
        return (
            <div>
                <h1>Todo</h1>
                    <div className="container">
                        <Formik
                            // initialValues = {{
                            //     // description : description,
                            //     // targetDate : targetDate
                            //     description,
                            //     targetDate
                            // }}
                            initialValues = {{description, targetDate}}
                            //validateOnBlur={false}
                            //validateOnChange={false}
                            onSubmit = {this.onSubmit}
                            validate={this.validate}
                            enableReinitialize={true}
                        >
                            {
                                (props) => (
                                    <Form>
                                        <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>
                                        <ErrorMessage name="targetDate" component="div" className="alert alert-warning"></ErrorMessage>
                                        <fieldset className="form-group">
                                            <label>Description</label>
                                            <Field className="form-control" type="text" name="description"></Field>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label>Target Date</label>
                                            <Field className="form-control" type="date" name="targetDate"></Field>
                                        </fieldset>
                                        <button className="btn btn-success" type="submit">Save</button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
            </div>
        )
    }
}

export default TodoComponent