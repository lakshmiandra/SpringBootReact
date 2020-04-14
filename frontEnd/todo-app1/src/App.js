import React, { Component } from 'react'
//import logo from './logo.svg'
import './App.css'
//import FirstComponent from './components/learning-examples/FirstComponent'
//import SecondComponent from './components/learning-examples/SecondComponent'
//import ThirdComponent from './components/learning-examples/ThirdComponent'
//import Counter from './components/counter/Counter'
import TodoApp from './components/todo/TodoApp'
import './bootstrap.css'


class App extends Component {
  render() {
    return (
      <div className="App">
      <TodoApp></TodoApp>
      </div>
    );
  }
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//       <Counter></Counter>
//       </div>
//     );
//   }
// }

// class LearningComponents extends Component {
//   render() {
//     return (
//       <div className="LearningComponents">
//         My First React App Running
//         <FirstComponent/>
//         <SecondComponent/>
//         <ThirdComponent/>
//       </div>
//     );
//   }
// }

export default App
