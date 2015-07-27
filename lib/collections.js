People = new Mongo.Collection("people");
Messages = new Mongo.Collection("messages");
Events = new Mongo.Collection("events");

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
        Events.insert({
            createdByPersonId: createdByPersonId,
            createdDate: createdDate,
            eventTitle: event.eventTitle,
            eventDate: event.eventDate,
            eventTime: event.eventTime,
        });
    },
    eventConfirmToggle: function(eventId, personId) {
        // Load the event for which the confirm needs to be toggled
        var event = Events.findOne(eventId);
        // Declare an empty var and attempt to assign the current person's confirm to it
        var personConfirmedBefore;
        if (event.confirms) {
            personConfirmedBefore = event.confirms.filter(function(o) {
                return o.person === personId;
            })[0];
        }
        // If there are no cofirms at all for the event or the current person was not confirmed before, add this person's confirm creating the confirms object in the event document if it didn't exist yet.
        if (typeof personConfirmedBefore === 'undefined') {
            Events.update(eventId, {
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
            Events.update({_id: eventId, "confirms.person": personId}, {
                $set: {
                    "confirms.$.person": personId,
                    "confirms.$.confirmed": !personConfirmedBefore.confirmed,
                    "confirms.$.timestamp": new Date()
                }
            });
        }
    }
});
