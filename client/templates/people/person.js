Template.person.events({
    "click .toggleInOut": function() {
        Meteor.call('toggleInOut', this._id, !this.isIn);
    }
});