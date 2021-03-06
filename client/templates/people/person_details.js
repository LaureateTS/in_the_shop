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
  decodeURI}
});

Template.personDetails.helpers({
  editing_event: function() {
    return Session.get('editing_event')
  }
});

Template.personDetails.rendered = function() {
  var calendar = $('#calendar').fullCalendar({
    dayClick: function(date, jsEvent, view) {
      var newAppt = {};
      newAppt.start = date;
      newAppt.title = "new event";
      newAppt.createdBy = Meteor.userId();
      newAppt.forPerson = Iron.Location.get().path.substring(22);
      console.log(newAppt);
      Meteor.call('calendarEventAdd', newAppt, function(error, result) {
        if (error) {
          alert(error.reason);
        }
        Session.set('editing_event', result);
      });
    },
    eventClick: function(appt, jsEvent, view) {
      if (appt.type === "global") {
        Meteor.call('eventConfirmToggle', appt._id, Iron.Location.get().path.substring(22))
      } else {
        console.log(appt);
        Session.set('editing_event', appt._id);
        $('#title').val(appt.title);
      }
    },
    eventDrop: function(reqEvent) {
      if (reqEvent.type === "personal") {
        Meteor.call('appointmentReschedule', reqEvent);
      } else {
        revertFunc();
      }
    },
    events: function(start, end, callback) {
      var appointments = CalendarEvents.find({}).fetch();
      callback(appointments);
    },
    // eventRender: function(event, element) {
    //   if (event.type === "global") {
    //     element.draggable = false;
    //   }
    // },
    editable: true,
    selectable: true
  }).data().fullCalendar;
  Deps.autorun(function() {
    CalendarEvents.find({}).fetch();
    if (calendar) {
      calendar.refetchEvents();
    }
  });
};

Template.calendarDialog.events({
  "click .closeDialog": function(event, template) {
    Session.set('editing_event', null);
  },
  "click .save": function(event, template) {
    var title = template.find('#title').value;
    Meteor.call('appointmentSetTitle', Session.get('editing_event'), title);
    Session.set('editing_event', null);
  }
});

Template.calendarDialog.helpers({
  title: function() {
    var appt = CalendarEvents.findOne({
      _id: Session.get('editing_event')
    });
    return appt.title;
  }
});
