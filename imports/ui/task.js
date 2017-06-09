import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/tasks.js';
import { Items } from '../api/tasks.js';
 
import './task.html';
 
Template.task.helpers({
  items() { // Show newest tasks at the top
    return Items.find({task_id: this._id}, { sort: { createdAt: -1 } });
  },
});

Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .task-details .delete'() {
    Items.find({task_id: this._id}).forEach(function (doc) {
      Items.remove({_id: doc._id});
    });
    Tasks.remove(this._id);
  },
  'submit .new-item'(){
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const itemText = target.itemText.value;
    const itemSubText = target.itemSubText.value;
    const price = target.price.value;
 
    // Insert a task into the collection
    Items.insert({
      task_id: this._id,
      createdAt: new Date(), // current time
      itemText: itemText,
      itemSubText: itemSubText,
      available: true,
      price: price
    });
 
    // Clear form
    target.itemText.value = '';
    target.itemSubText.value = '';
    target.price.value = '';
  }
});

Template.item.events({
  'click .delete'() {
    Items.remove(this._id);
  },
  'change .toggle-available'(e) {
    const isChecked = e.target.checked;
    Items.update(this._id, { $set: { available: isChecked} });
  }
});