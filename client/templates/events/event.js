Template.event.helpers({
    isPersonDetailsContext: function() {
        if (Iron.Location.get().path.substring(0, 21) === "/people/personDetails") return true;
    },
    isConfirmed: function() {
        var personId = Iron.Location.get().path.substring(22);
        if (this.confirms) {
            var numConfirms = this.confirms.length;
            for (var i = 0; i < numConfirms; i++) {
                if (this.confirms[i].person === personId &&
                    this.confirms[i].confirmed == true) {
                    return true;
                }
            }
        }
        return false;
    },
    numConfirms: function() {
        // Inside event.helpers 'this' refers to the event document exactly as it is stored in mongo
        return this.confirms.filter(function(o){
            return o.confirmed === true;
        }).length;
    }
});

Template.event.events({
    "click .toggleConfirm": function() {
        var personId = Iron.Location.get().path.substring(22);
        Meteor.call('eventConfirmToggle', this._id, personId);
    }
});