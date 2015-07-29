// people is unlimited as this is the main part of the program and the unfiltered list is needed for the main page.
Meteor.publish("people", function() {
  return People.find({});
});

// TODO remove this, unlimited subscription to messages could overload the wire
Meteor.publish("messages", function() {
  return Messages.find({});
});

// TODO this shouldn't be needed because all people are available
Meteor.publish("personById", function(id) {
  check(id, String);
  return People.find({
    _id: id
  });
});

// Messages for a single person
// TODO add pagination
Meteor.publish("messagesForPerson", function(id) {
  return Messages.find({
    personId: id
  });
});

// Get the name of a user, as this uses the db for users it should be extra secure. Prefer to only get the name but haven't gotten arround to that yet.
Meteor.publish("getUserName", function(id) {
  return Meteor.users.find(id);
});

// Events are transient data, limited amounts are needed and the need to view old events is VERY limited.
// TODO only return upcoming event with default filter.
// TODO add pagination for showing older events and to prevent anomalies when more upcoming events exist then the limit.
Meteor.publish("events", function() {
  return Events.find({}, {
    sort: {
      eventDate: -1
    },
    limit: 20
  });
});

Meteor.publish("appointments", function(id) {
  return Appointments.find({forPerson:id});
});
