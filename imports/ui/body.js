import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/tasks.js';
 
import './task.js';
import './body.html';

Session.set('type', "configure");
Template.registerHelper('log', (value) => {
  console.log("Value added from registerHelper: ", value)
});
Template.registerHelper('isConfigure', (value) => {
  return Session.get('type') === "configure";
});
Template.registerHelper('isProd', (value) => {
  return Session.get('type') === "production";
});

Template.body.helpers({
  tasks() { // Show newest tasks at the top
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  showCategory(index) {
    return index !== 1;
  },
  run_masonry(){
    console.log("running run_masonry")
    Meteor.setTimeout(function(){
      $('.categories').masonry({
        // options...
        itemSelector: '.category',
        columnWidth: 80,
        gutter: 50
      });
    }, 400);
  }
});
Template.registerHelper('and',(a,b)=>{
  return a && b;
});
Template.registerHelper('or',(a,b)=>{
  return a || b;
});
Template.registerHelper('not',(a)=>{
  return !a;
});
run_masonry = 
Template.body.events({
  'click .toggle-deployment'(){
    Session.set("type", Session.get("type") === "configure" ? "production" : "configure");
    Meteor.setTimeout(function(){
      $('.categories').masonry({
        // options...
        itemSelector: '.category',
        columnWidth: 80,
        gutter: 50
      });
    }, 400);
  },
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    target.text.value = '';
  },
});