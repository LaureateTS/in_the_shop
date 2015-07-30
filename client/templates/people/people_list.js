Template.peopleList.helpers({
    peopleIn: function() {
        return People.find({isIn: true},{sort: {lastName: 1}});
    },
    peopleOut: function() {
        return People.find({},{sort: {lastName: 1}});
    }
});
