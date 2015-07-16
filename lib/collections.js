Customers = new Mongo.Collection("customers");

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
            $addToSet: {toggleInOutLog: [direction,new Date()]
            }
        });
    }
});