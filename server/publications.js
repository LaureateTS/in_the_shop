Meteor.publish("customers", function() {
  return Customers.find({});
});

Meteor.publish("messages", function() {
  return Messages.find({});
})

Meteor.publish("customerById", function(id) {
  check(id, String);
  return Customers.find({
    _id: id
  });
});

Meteor.publish("messagesForCustomer", function(id) {
  return Messages.find({
    userId: id
  });
});