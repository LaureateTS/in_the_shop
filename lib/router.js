Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return Meteor.subscribe("customers");
    },
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
Router.route("/customers/customerDetails/:_id", {
    name: "customerDetails",
    data: function() {
        return Customers.findOne(this.params._id)
    },
    waitOn: function() {
        return Meteor.subscribe('messagesForCustomer', this.params._id);
    }
});
Router.route("/customers/customerEdit/:_id", {
    name: "customerEdit"
});