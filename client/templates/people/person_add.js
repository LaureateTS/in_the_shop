Template.personAdd.events({
    "submit form": function(event) {
        event.preventDefault();
        var person = {
            firstName: $(event.target).find('[name=firstName]').val(),
            lastName: $(event.target).find('[name=lastName]').val(),
            homePhone: $(event.target).find('[name=homePhone]').val(),
            mobilePhone: $(event.target).find('[name=mobilePhone]').val()
        };
        Meteor.call('personCreate', person, function(error, result) {
            if (error) {
                alert(error.reason);
            }
            Router.go('peopleList');
        });
    }
});