import { Meteor } from 'meteor/meteor';
import {MessageQueue} from '../imports/api/MessageQueue.js'
import {ServerTime} from '../imports/api/ServerTime.js'

function getTimestamp(stringTime) {
	return (Date.parse(stringTime) / 1000)
}

Meteor.startup(() => {
	var myjson = {};
	messages = JSON.parse(Assets.getText("data/fullData.json"));

	var serverTimestamp = ServerTime.find({}).fetch()[0].time;

	MessageQueue.remove({})
	MessageQueue.insert({ messages: [] })
	Meteor.publish("MessageQueue", function () {
    	return MessageQueue.find();
	});

	ServerTime.remove({})
	ServerTime.insert({ time: serverTimestamp })
	Meteor.publish("ServerTime", function () {
    	return ServerTime.find();
	});

	var index = 0;
	var lastSecondIndex = 0;

	setInterval(Meteor.bindEnvironment(function() {
		serverTimestamp = serverTimestamp + 1;
		let currTimestampId = ServerTime.find({}).fetch()[0]._id
		ServerTime.update(currTimestampId, {
			time: serverTimestamp
		})

		let currSecondMessages = []
		while (getTimestamp(messages[index].created_time) <= serverTimestamp && index < messages.length) {
			currSecondMessages.push(messages[index])
			index++;
		}

		let currMessageListId = MessageQueue.find({}).fetch()[0]._id
		// console.log('Sending: ', currSecondMessages)
		MessageQueue.update(currMessageListId, {
			messages: currSecondMessages
		})
	}), 1000)
});
