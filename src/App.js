import React, { Component } from 'react'
// import the_seth_logo from './the-seth-logo.png';
import './App.css';
// import AddStaff from './Components/AddStaff';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Header from './components/layout/Header';
// import Todos from './components/Todos';
// import AddTodo from './components/AddTodo';
import StaffDetails from './Components/Pages/StaffDetails';
import Calender from './Components/Pages/Calender';
import Assignment from './Components/Pages/Assignment';
import uuid from 'uuid';
import axios from 'axios';

import './App.css';

class App extends Component {
  state = {
    staff: [],
    days: []
  };

  componentDidMount() {
    axios
      .get('http://localhost:3100/api/staff')
      .then(res => {
        this.setState({ staff: res.data })});
    axios
      .get('http://localhost:3100/api/days')
      .then(res => {
        this.setState(
          { staff: this.state.staff, days: res.data })});

  }

  // Toggle Complete
  // markComplete = id => {
  //   this.setState({
  //     todos: this.state.todos.map(todo => {
  //       if (todo.id === id) {
  //         todo.completed = !todo.completed;
  //       }
  //       return todo;
  //     })
  //   });
  // };

  // Delete Todo
  // delTodo = id => {
  //   axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
  //     this.setState({
  //       todos: [...this.state.todos.filter(todo => todo.id !== id)]
  //     })
  //   );
  // };

  // // Add Todo
  // addTodo = title => {
  //   axios
  //     .post('https://jsonplaceholder.typicode.com/todos', {
  //       title,
  //       completed: false
  //     })
  //     .then(res => {
  //       res.data.id = uuid.v4();
  //       this.setState({ todos: [...this.state.todos, res.data] });
  //     });
  // };

  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/staff">
            <StaffDetails staff={this.state.staff}/>
          </Route>
          <Route exact path="/assignment">
            <Assignment staff={this.state.staff}
            days={this.state.days}/>
          </Route>
          <Route exact path="/calender">
            <Calender />
          </Route>
        </div>
      </Router>
    );
  }
}

                // <AddTodo addTodo={this.addTodo} />


                // <Todos
                //   todos={this.state.todos}
                //   markComplete={this.markComplete}
                //   delTodo={this.delTodo}
                // />


          // <Route path="/about" component={About} />
export default App;