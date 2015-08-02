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
    var startDate = $(event.target).find('[name=eventDate]').val();
    var dateParts = startDate.split("/");
    var parseDate = new Date(dateParts[2], dateParts[0], dateParts[1])
    console.log(startDate, dateParts, parseDate);
    var newEvent = {
      title: $(event.target).find('[name=eventTitle]').val(),
      start: parseDate,
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
