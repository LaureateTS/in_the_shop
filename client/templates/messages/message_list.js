Template.messageList.helpers({
    messages: function() {
        return Messages.find({customerId: this._id}, {sort: {timestamp: -1}})
    },
    showWell: function(message) {
        if (message.type === "log") false
        else true
    }
});
