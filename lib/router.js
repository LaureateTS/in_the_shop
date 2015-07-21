Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return Meteor.subscribe("people");
    },
});

Router.route("/", {
    name: "homeIndex"
});
Router.route("/about", {
    name: "homeAbout"
});
Router.route("/people/peopleList", {
    name: "peopleList"
});
Router.route("/people/personAdd", {
    name: "personAdd"
});
Router.route("/people/personDetails/:_id", {
    name: "personDetails",
    data: function() {
        return People.findOne(this.params._id)
    },
    waitOn: function() {
        return Meteor.subscribe('messagesForPerson', this.params._id);
    }
});
Router.route("/people/personEdit/:_id", {
    name: "personEdit"
});