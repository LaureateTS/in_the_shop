Template.eventDetails.helpers({
    numConfirms: function() {
        // Inside event.helpers 'this' refers to the event document exactly as it is stored in mongo
        return this.confirms.filter(function(o) {
            return o.confirmed === true;
        }).length;
    },
    confirmedPeople: function() {
        var list = this.confirms.filter(function(o) {
            return o.confirmed === true;
        });
        list.forEach(function(o) {
            var thisPerson = People.findOne(o.person)
            o.firstName = thisPerson.firstName;
            o.lastName = thisPerson.lastName;
        });
        list.sort(function(a, b) {
            return a.lastName - b.lastName;
        });
        return list;
    },
    unconfirmedPeople: function() {
        var list = this.confirms;
        list.forEach(function(o) {
            var thisPerson = People.findOne(o.person)
            o.firstName = thisPerson.firstName;
            o.lastName = thisPerson.lastName;
        });
        return list.filter(function(o) {
            return o.confirmed === false;
        }).sort();
    }
});
