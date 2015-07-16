Template.customersList.helpers({
    customers: function() {
        return Customers.find({},{sort: {lastName: 1}});
    }
});
