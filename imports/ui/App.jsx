import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Message from './Message.jsx';
import {MessageQueue} from '../api/MessageQueue.js';
import {ServerTime} from '../api/ServerTime.js';
import About from './About.jsx'

import moment from 'moment'

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutOpen: false
    }
    const handle = Meteor.subscribe('MessageQueue')
    const handle2 = Meteor.subscribe('ServerTime')
    this.onClick = this.onClick.bind(this)
  }

  componentWillReceiveProps(newProps) {
  }

  componentDidMount() {
  }

  onClick() {
    console.log('clicked about')
    this.setState({ 
      aboutOpen: !this.state.aboutOpen
    })
  }

  render() {
    let messages = []
    if (this.props.MessageQueue.length != 0) {
      messages = this.props.MessageQueue[0].messages      
    }

    let serverTime = ''
    if (this.props.ServerTime.length != 0) {
      let serverTimestamp = this.props.ServerTime[0].time
      serverTime = moment.unix(serverTimestamp).format('MMMM Do YYYY, h:mm:ss a');
    }

    const { aboutOpen } = this.state
    //[August 22, 2015, 14:13:22]

    return (
      <div className="container">
        <div className="message-container">
          <span className="purple tiny">[{serverTime}]</span>
          <Message currMessages={messages}/>
        </div>
        <div className="footer">
          <span className="purple">New Haven, CT | </span> <span className="orange">Princeton, NJ</span>
        </div>
        <About onShow={aboutOpen}/>
        <div className="about-link-container">
          <span className="link" onClick={this.onClick}>{aboutOpen ? 'close' : 'about'}</span>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  MessageQueue: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    MessageQueue: MessageQueue.find({}).fetch(),
    ServerTime: ServerTime.find({}).fetch(),
  };
}, App);