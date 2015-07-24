Template.eventAdd.rendered = function() {
    $('#eventDatepicker').datepicker({
        format: "dd/mm/yyyy",
        weekStart: 1,
        todayBtn: "linked",
        orientation: "top left"
    });
};

Template.eventAdd.events({
    "submit form": function(event) {
        event.preventDefault();
        var newEvent = {
            eventTitle: $(event.target).find('[name=eventTitle]').val(),
            eventDate: $(event.target).find('[name=eventDate]').val(),
            eventTime: $(event.target).find('[name=eventTime]').val(),
        };
        Meteor.call('eventAdd', newEvent, function(error, result) {
            if (error) {
                alert(error.reason);
            }
            Router.go('eventsList');
        });
    }
});