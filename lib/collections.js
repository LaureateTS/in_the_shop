People = new Mongo.Collection("people");
Messages = new Mongo.Collection("messages");
CalendarEvents = new Mongo.Collection("calendarEvents");

Meteor.methods({
  personAdd: function(person) {
    // TODO check person properties to prevent ugly schemas
    var personId = People.insert(person);
    return {
      _id: personId
    };
  },
  // toggle wether a person is inside or not
  // and log the change with a timestamp
  toggleInOut: function(personId, isIn) {
    var direction = "Out";
    if (isIn) {
      direction = "In";
    }
    People.update(personId, {
      $set: {
        isIn: isIn
      }
    });
    Messages.insert({
      personId: personId,
      userId: Meteor.userId(),
      timestamp: new Date(),
      type: "log",
      message: "Logged " + direction
    });
  },
  messageAdd: function(message) {
    var personId = message.personId;
    var userId = message.userId;
    var type = message.messageType;
    var messageText = message.messageText;
    Messages.insert({
      personId: personId,
      userId: userId,
      timestamp: new Date(),
      type: type,
      message: messageText
    });
  },
  eventAdd: function(event) {
    var createdByPersonId = Meteor.userId();
    var createdDate = new Date();
    CalendarEvents.insert({
      createdByPersonId: createdByPersonId,
      createdDate: createdDate,
      title: event.eventTitle,
      start: event.eventDate,
      end: event.eventDate,
      time: event.eventTime,
      calendarEventType: "global",
    });
  },
  eventConfirmToggle: function(eventId, personId) {
    // check the length of both Id's because an empty string in either can throw off the schema if it is inserted.
    if (eventId.length === 17 && personId.length === 17) {
      // Load the event for which the confirm needs to be toggled
      var event = CalendarEvents.findOne(eventId);
      // Declare an empty var and attempt to assign the current person's confirm to it
      var personConfirmedBefore;
      if (event.confirms) {
        personConfirmedBefore = event.confirms.filter(function(o) {
          return o.person === personId;
        })[0];
      }
      // If there are no cofirms at all for the event or the current person was not confirmed before, add this person's confirm creating the confirms object in the event document if it didn't exist yet.
      if (typeof personConfirmedBefore === 'undefined') {
        CalendarEvents.update(eventId, {
          $addToSet: {
            confirms: {
              person: personId,
              confirmed: true,
              timestamp: new Date()
            }
          }
        });
      }
      // If the current person has been confirmed for this event before, update the confirm
      else {
        CalendarEvents.update({
          _id: eventId,
          "confirms.person": personId
        }, {
          $set: {
            "confirms.$.person": personId,
            "confirms.$.confirmed": !personConfirmedBefore.confirmed,
            "confirms.$.timestamp": new Date()
          }
        });
      }
      // add a message to show on the personDetail page, the text of the message varies for confirm/unconfirm. reload the event first.
      event = CalendarEvents.findOne(eventId);
      var messageText = "unconfirmed for " + event.title;
      if (event.confirms.filter(function(o) {
          return o.person === personId;
        })[0].confirmed === true) {
        messageText = "confirmed for " + event.title;
      }
      var message = {
        userId: Meteor.userId(),
        personId: personId,
        messageText: messageText,
        messageType: "log"
      };
      Meteor.call('messageAdd', message, function(error, result) {
        if (error) {
          alert(error.reason);
        }
      });
    }
  },
  appointmentAdd: function(appt) {
    appt.calendarEventType = "personal";
    return CalendarEvents.insert(appt, function(err, insertedAppt) {
      return insertedAppt;
    });
  },
  appointmentSetTitle: function(id, title) {
    return CalendarEvents.update({
      _id: id
    }, {
      $set: {
        title: title
      }
    });
  },
  appointmentReschedule: function(appt) {
    return CalendarEvents.update({
      _id: appt._id
    }, {
      $set: {
        start: appt.start,
        end: appt.end
      }
    });
  }
});
