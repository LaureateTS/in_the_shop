Template.customerAdd.events({
    "submit form": function(event) {
        event.preventDefault();
        var customer = {
            firstName: $(event.target).find('[name=firstName]').val(),
            lastName: $(event.target).find('[name=lastName]').val(),
        };
        Meteor.call('customerCreate', customer, function(error, result) {
            if (error) {
                alert(error.reason);
            }
            Router.go('customersList');
        });
    }
});