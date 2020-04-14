import React, {Component} from 'react'
import PropTypes from 'prop-types'
//import './Counter.css'
// Function component


class Counter extends Component {

    constructor () {
        super()
        this.state = {
            counter : 0
        }
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.reset = this.reset.bind(this)
    }

    render() {
    return (
      <div className="counter">
      <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
      <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
      <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>

      <span className="count">{this.state.counter}</span>

      <div><button className="reset" onClick={this.reset}>Reset</button></div>

      </div>
    );
  }

  increment(by) {
     this.setState(
         (prevState) => {
        return {counter : prevState.counter + by}
     })
   // console.log(`increment from parent -- ${by}`)
 }
 decrement(by) {
    this.setState(
        (prevState) => {
       return {counter : prevState.counter - by}
    })
}
reset(by) {
    this.setState( {  counter : 0   })
}

}


class CounterButton extends Component {

   // constructor () {
     //   super()
        // this.state = {
        //     counter : 0
        // }
        // //this.increment = this.increment.bind(this)
        // this.increment = this.increment.bind(this)
        // this.decrement = this.decrement.bind(this)
    //}

    // render() {
    //     return (
    //     <div className="counter">
    //         <button onClick={this.increment}>+1</button>
    //         <span className="count">{this.state.counter}</span>
    //     </div>
    //     )
    // }
    render () {
   // render =  () => {
   //let style ={fontSize: "50px", padding: "15px 30px"}
   //const style ={fontSize: "50px", padding: "15px 30px"}
        return (
        <div className="counter">
            <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
            <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
            {/* <span className="count">{this.state.counter}</span> */}
        </div>
        )
    }

   //increment = () => {
    // increment() {
    //    // console.log('increment')
    //    //this.state.counter++;
    //    this.setState({
    //        counter : this.state.counter + this.props.by
    //    })

    //    this.props.incrementMethod(this.props.by)
    // }
    //     decrement() {
    //         this.setState({
    //             counter : this.state.counter - this.props.by
    //         })
     
    //         this.props.decrementMethod(this.props.by)
    //      }
}

CounterButton.defaultProps = {
    by : 1
}

CounterButton.propTypes = {
    by : PropTypes.number
}

  export default Counter