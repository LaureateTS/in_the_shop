Template.person.events({
    "click .toggleInOut": function() {
        console.log("this is ",this)
        Meteor.call('toggleInOut', this._id, !this.isIn);
    }
});