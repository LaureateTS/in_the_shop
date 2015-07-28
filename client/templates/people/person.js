Template.person.events({
    "click .toggleInOut": function() {
        Meteor.call('toggleInOut', this._id, !this.isIn);
    },
    "click .toggleConfirm": function(event) {
        var personId = $(event.target).find('[name=personId]').val();
        console.log(event);
        console.log(this);
        Meteor.call('eventConfirmToggle', this._id, personId);
    }
});
Template.person.helpers({
    eventsForDropdown: function() {
        var personId = this._id;
        var eventsWithPerson = Events.find();
        eventsWithPerson.forEach(function(o) {
            o.personId = personId;
            o.confirmed = o.confirms.filter(function(o) {
                return o.confirmed === true && o.person == personId;
            }).length;
            console.log(o);
        });
        console.log(eventsWithPerson);
        return eventsWithPerson;
    },
});