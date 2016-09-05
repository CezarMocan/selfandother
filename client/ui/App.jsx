import React, { Component } from 'react';

import Message from './Message.jsx';

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);
    this.messages = ["Lapte de pasare ", "Oua de capra ", "Piele de robot ", "Manusi de scafandru ", "Hoti de piuneze "]
    this.state = {
      message: "Lapte de pasare "
    }
  }
  getTasks() {
    return [
      { _id: 1, text: 'This is task 1' },
      { _id: 2, text: 'This is task 2' },
      { _id: 3, text: 'This is task 6' },
    ];
  }

  componentDidMount() {
    setInterval(() => {
      let newIndex = Math.floor(Math.random() * this.messages.length)
      console.log(newIndex)
      console.log(this.messages[newIndex])
      this.setState({
        message: this.messages[newIndex]
      })
    }, 5000)
  }

  render() {
    return (
      <div className="container">
        <div className="about-container">
        </div>
        <div className="message-container">
          <Message message={this.state.message}/>
        </div>
        <div className="footer">
          <span className="purple">New Haven, CT | </span> <span className="orange">Princeton, NJ</span>
          <br/>
          <span className="purple">14:13:22</span>
          <br/>
          <span className="purple">August 22, 2015</span>
          <br/>
          <span className="orange">about</span>
        </div>
      </div>
    );
  }
}