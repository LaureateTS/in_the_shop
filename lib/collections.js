People = new Mongo.Collection("people");
Messages = new Mongo.Collection("messages");

Meteor.methods({
    personCreate: function(person) {
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
        console.log(personId, direction);
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
        console.log(message);
        Messages.insert({
            personId: personId,
            userId: userId,
            timestamp: new Date(),
            type: type,
            message: messageText
        });
    }
});
