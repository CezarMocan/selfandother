import { Mongo } from 'meteor/mongo';

export const MessageQueue = new Mongo.Collection('MessageQueue');