import { Meteor } from 'meteor/meteor';
import {MessageQueue} from '../imports/api/MessageQueue.js'
import {ServerTime} from '../imports/api/ServerTime.js'

function getTimestamp(stringTime) {
	//console.log(Date.parse(stringTime) / 1000)
	//console.log(stringTime)
	return (Date.parse(stringTime) / 1000)
}

Meteor.startup(() => {
	var myjson = {};
	messages = JSON.parse(Assets.getText("data/fullData.json"));

	var serverTimestamp = 1388160704;

	MessageQueue.remove({})
	Meteor.publish("MessageQueue", function () {
    	return MessageQueue.find();
	});

	ServerTime.remove({})
	ServerTime.insert({time: serverTimestamp})
	Meteor.publish("ServerTime", function () {
    	return ServerTime.find();
	});

	var index = 0;

	setInterval(Meteor.bindEnvironment(function() {
		serverTimestamp = serverTimestamp + 1;
		let currTimestampId = ServerTime.find({}).fetch()[0]._id
		ServerTime.update(currTimestampId, {
			time: serverTimestamp
		})

		while (getTimestamp(messages[index].created_time) <= serverTimestamp && index < messages.length) {
			MessageQueue.insert(messages[index])
			index++;
		}
	}), 1000)

	//MessageQueue = new Mongo.Collection("MessageQueue");
	/*
	Meteor.publish('messagequeue', function() {
		return myjson[0]
	})
	*/
  // code to run on server at startup
});
