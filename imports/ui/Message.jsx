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
				this.setState({
					currentMessage: '',
					isRendering: false
				})
				if (this.animationQueue.length > 0) {
					this.animateNextLetter(this.animationQueue.shift(), 0)
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

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.isRendering == true && nextProps.queue.length != this.props.queue.length)
			return false;

		/*
		if (nextProps.lastMessage == this.props.lastMessage)
			return false;
		*/

		return true;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.queue.length == 0 || nextProps.lastMessage == this.props.lastMessage)
			return;

		if (this.state.isRendering) {
			this.animationQueue.push(nextProps.queue[nextProps.queue.length - 1])
		} else {
			let messageObj = nextProps.queue[nextProps.queue.length - 1]
			this.animateNextLetter(messageObj, 0);
		}
		//nextProps.queue.remove({});
	}

	componentDidMount() {
		this.animateCursor(this);
		let messageObj = {
			message: ''
		}

		if (this.props.queue.length == 0)
			return;

		messageObj = this.props.queue[this.props.queue.length - 1]
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
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  queue: PropTypes.array.isRequired,
  lastMessage: PropTypes.string.isRequired
};
