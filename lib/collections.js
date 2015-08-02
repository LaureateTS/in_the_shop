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
  calendarEventAdd: function(calEvent) {
    // title, string, required
    // start, date, required
    // time, string(hh:mm)
    // type, string(global/personal), default personal
    // forPerson, string
    // createdBy, string

    // Sanitize the input
    if (calEvent.title && (calEvent.start instanceof Date)) {
      var saneEvent = {};
      saneEvent.title = calEvent.title;
      saneEvent.start = calEvent.start;
      //current implementation uses only events on 1 day, without time. not gonna be bothered to make it anymore complicated at this point. hence "start = end"
      saneEvent.end = calEvent.start;
      // time is for labels only, calendar is implemented with days only!
      saneEvent.time = calEvent.time;
      // event type controls wether to show the item in all calendars or only 1.
      saneEvent.type = calEvent.type || "personal";
      saneEvent.forPerson = calEvent.forPerson;
      saneEvent.createdBy = calEvent.createdBy;
      saneEvent.createdAt = new Date();

      // Insert in mongoDB and return the id of the newly created calEvent
      return CalendarEvents.insert(saneEvent, function(err, ins) {
        return ins;
      });
    } else {
      alert("Invalid event:", calEvent)
    }
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
