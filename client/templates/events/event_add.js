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
            title: $(event.target).find('[name=eventTitle]').val(),
            start: $(event.target).find('[name=eventDate]').val(),
            time: $(event.target).find('[name=eventTime]').val(),
            type: "global",
            createdBy: Meteor.userId(),
        };
        Meteor.call('calendarEventAdd', newEvent, function(error, result) {
            if (error) {
                alert(error.reason);
            }
            Router.go('eventsList');
        });
    }
});
