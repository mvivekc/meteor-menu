import { Mongo } from 'meteor/mongo';
 
export const Tasks = new Mongo.Collection('tasks');
export const Items = new Mongo.Collection('items');