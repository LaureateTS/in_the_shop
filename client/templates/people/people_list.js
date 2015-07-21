Template.peopleList.helpers({
    people: function() {
        return People.find({},{sort: {lastName: 1}});
    }
});
