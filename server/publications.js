Meteor.publish("people", function() {
  return People.find({});
});

Meteor.publish("messages", function() {
  return Messages.find({});
})

Meteor.publish("personById", function(id) {
  check(id, String);
  return People.find({
    _id: id
  });
});

Meteor.publish("messagesForPerson", function(id) {
  return Messages.find({
    personId: id
  });
});

Meteor.publish("getUserName", function(id) {
  // var userName = Meteor.users.findOne(id).userName;
  return Meteor.users.find(id);
});