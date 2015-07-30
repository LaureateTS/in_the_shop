Template.person.events({
  "click .toggleInOut": function() {
    Meteor.call("toggleInOut", this._id, !this.isIn);
  },
  "click .toggleConfirm": function(event) {
    console.log(event);
    event.preventDefault();
    var personId = $(event.target);
    console.log(personId);
    Meteor.call("eventConfirmToggle", this._id, personId[0].id);
  }
});
Template.person.helpers({
  eventsForDropdown: function() {
    return Events.find();
  },
  confirmedForEvent: function(person) {
    var filtered = this.confirms.filter(function(o) {
      return o.confirmed === true && o.person === person._id;
    });
    if (filtered.length === 1) return true;
    else return false;
  },
  personId: function(person) {
    return person._id;
  }
});
