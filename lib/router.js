Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [Meteor.subscribe("customers")];
    }
});

Router.route("/", {
    name: "homeIndex"
});
Router.route("/about", {
    name: "homeAbout"
});
Router.route("/customers/customersList", {
    name: "customersList"
});
Router.route("/customers/customerAdd", {
    name: "customerAdd"
});