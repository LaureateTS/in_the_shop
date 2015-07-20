Template.customerAdd.events({
    "submit form": function(event) {
        event.preventDefault();
        var customer = {
            firstName: $(event.target).find('[name=firstName]').val(),
            lastName: $(event.target).find('[name=lastName]').val(),
            homePhone: $(event.target).find('[name=homePhone]').val(),
            mobilePhone: $(event.target).find('[name=mobilePhone]').val()
        };
        Meteor.call('customerCreate', customer, function(error, result) {
            if (error) {
                alert(error.reason);
            }
            Router.go('customersList');
        });
    }
});