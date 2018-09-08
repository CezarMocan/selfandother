import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';

// Task component - represents a single todo item
export default class Message extends Component {

	constructor(props) {
		super(props)
		this.state = {
			currentMessage: '',
			isRendering: false,
			author: 'cezar'
		}
		this.animationQueue = []
	}

	getRandom(left, right) {
		return Math.round(Math.random() * (right - left + 1) + left)
	}

	animateNextLetter(messageObj, index) {
		if (index == messageObj.message.length) {
			setTimeout(() => {
				this.setState({ currentMessage: '' })

				if (this.animationQueue.length > 0) {
					this.animateNextLetter(this.animationQueue.shift(), 0)
				} else {
					this.setState({ isRendering: false })
				}

			}, 4000);

			return;
		}

		setTimeout(() => {
			let newMsg = this.state.currentMessage + messageObj.message[index];
			let newIndex = index + 1;
			let author = messageObj.from.id == "1619132498" ? 'cezar' : 'roxana';
			this.setState({
				currentMessage: newMsg,
				author: author,
				isRendering: true
			})
			this.animateNextLetter(messageObj, index + 1);
		}, 70);
	}

	animateCursor(context) {
		$("#cursor").fadeOut(500, function() {
	    $(this).fadeIn(500, context.animateCursor(context))
	  })
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.currMessages.length == 0) return
		// console.log('componentWillReceiveProps | rendering: ', this.state.isRendering, ' animationQueue: ', this.animationQueue, ' nextProps: ', nextProps)
		// Add messages from current second to the queue
		nextProps.currMessages.forEach(m => this.animationQueue.push(m))

		// If we're not already animating messages,
		// start animating first one in the queue.
		if (!this.state.isRendering)
			this.animateNextLetter(this.animationQueue.shift(), 0)
	}

	componentDidMount() {
		this.animateCursor(this);
		let messageObj = {
			message: ''
		}

		if (this.props.currMessages.length == 0)
			return;

		messageObj = this.props.currMessages[this.props.currMessages.length - 1]
		this.animateNextLetter(messageObj, 0);
	}

  render() {
    return (
     	<div id="message" className="message">
     		<span className={classNames({'orange': (this.state.author == 'roxana')}, {'purple': (this.state.author == 'cezar')})}>{this.state.currentMessage}</span>
		  	<div id="cursor" className={classNames('cursor', {'orange': this.state.author == 'roxana'}, {'purple': this.state.author == 'cezar'})}></div>
	  	</div>
    );
  }
}

Message.propTypes = {
  currMessages: PropTypes.array.isRequired,
};
