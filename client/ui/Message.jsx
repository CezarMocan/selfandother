import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class Message extends Component {

	constructor(props) {
		super(props)
		this.state = {
			currentMessage: '',
		}
	}

	getRandom(left, right) {
		return Math.round(Math.random() * (right - left + 1) + left)
	}

	animateNextLetter(message, index) {
		if (index == message.length) {
			setTimeout(() => {
				this.setState({
					currentMessage: ''
				})
			}, 2000);

			return;
		}

		setTimeout(() => {
			let newMsg = this.state.currentMessage + message[index];
			let newIndex = index + 1;
			this.setState({
				currentMessage: newMsg
			})
			this.animateNextLetter(message, index + 1);
		}, 70);
	}

	animateCursor(context) {
		$("#cursor").fadeOut(500, function() {
	    $(this).fadeIn(500, context.animateCursor(context))
	  })
	}

	componentWillReceiveProps(nextProps) {
		console.log("component will receive props")
		this.animateNextLetter(nextProps.message, 0);
	}

	componentDidMount() {
		this.animateNextLetter(this.props.message, 0);
		this.animateCursor(this);
	}

  render() {
  	console.log(this.state.currentMessage)
  	console.log('render')
    return (
     	<div id="message" className="message">
     		{this.state.currentMessage}
		  	<div id="cursor" className="cursor"></div>
	  	</div>
    );
  }
}

Message.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  message: PropTypes.string.isRequired,
};
