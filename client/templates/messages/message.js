Template.messageList.helpers({
    messages: function() {
        return Messages.find({personId: this._id}, {sort: {timestamp: -1}})
    },
});

Template.message.helpers({
    showWell: function() {
        if (this.type === "log") return false;
        else return true;
    },
    logFormatGreen: function() {
        if (this.message.slice(this.message.length - 2) === "In") return true;
        else return false;
    }
});