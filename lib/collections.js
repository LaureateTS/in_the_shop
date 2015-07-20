Customers = new Mongo.Collection("customers");
Messages = new Mongo.Collection("messages");

Meteor.methods({
    customerCreate: function(customer) {
        // TODO check customer properties to prevent ugly schemas
        var customerId = Customers.insert(customer);
        return {
            _id: customerId
        };
    },
    // toggle wether a customer is inside or not 
    // and log the change with a timestamp
    toggleInOut: function(customerId, isIn) {
        var direction = false;
        if (isIn) {
            direction = true;
        }
        Customers.update(customerId, {
            $set: {
                isIn: isIn
            }
        });
        Customers.update(customerId, {
            $addToSet: {
                toggleInOutLog: [direction, new Date()]
            }
        });
    },
    messageAdd: function(message) {
        var customerId = message.customerId;
        var userId = message.customerId;
        var type = message.messageType;
        var messageText = message.messageText;
        console.log(message);
        Messages.insert({
            customerId: customerId,
            userId: userId,
            timestamp: new Date(),
            type: type,
            message: messageText
        });
    }
});
