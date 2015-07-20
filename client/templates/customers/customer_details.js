Template.customerDetails.events({
    "submit form": function(event) {
        event.preventDefault();
        var message = {
            userId: Meteor.userId(),
            customerId: $(event.target).find('[name=customerId]').val(),
            messageText: $(event.target).find('[name=message]').val(),
            messageType: $(event.target).find('[name=messageType]').val()
        };
        Meteor.call('messageAdd', message, function(error, result) {
            if (error) {
                alert(error.reason);
            }
        });
        event.target.message.value = "";
    }
});
