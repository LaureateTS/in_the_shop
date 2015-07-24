Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [Meteor.subscribe("people"),Meteor.subscribe('events')];
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
Router.route("/events/eventsList", {
   name: "eventsList"
});
Router.route("/events/eventAdd", {
    name: "eventAdd"
});