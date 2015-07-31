Template.person.events({
  "click .toggleInOut": function() {
    Meteor.call("toggleInOut", this._id, !this.isIn);
  },
  "click .toggleConfirm": function(event) {
    event.preventDefault();
    var personId = $(event.target);
    Meteor.call("eventConfirmToggle", this._id, personId[0].id);
  }
});
Template.person.helpers({
  eventsForDropdown: function() {
    return CalendarEvents.find();
  },
  confirmedForEvent: function(person) {
    if (this.confirms) {
      var filtered = this.confirms.filter(function (o) {
        return o.confirmed === true && o.person === person._id;
      });
      return filtered.length === 1;
    }
  },
  personId: function(person) {
    return person._id;
  }
});
