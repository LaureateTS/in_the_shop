Template.personDetails.events({
  "submit form": function(event) {
    event.preventDefault();
    var message = {
      userId: Meteor.userId(),
      personId: $(event.target).find('[name=personId]').val(),
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

Template.personDetails.helpers({
    
});

Template.personDetails.rendered = function() {
  var calendar = $('#calendar').fullCalendar({
    dayClick: function(date, jsEvent, view) {
      var newAppt = {};
      newAppt.start = date;
      newAppt.end = date;
      newAppt.title = "new event";
      newAppt.createdBy = Meteor.userId();
      newAppt.forPerson = Iron.Location.get().path.substring(22);
      Meteor.call('appointmentAdd', newAppt, function(error, result) {
        if (error) {
          alert(error.reason);
        }
      });
    }

  });
};



