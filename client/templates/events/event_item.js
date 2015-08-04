Template.eventItem.helpers({
  isPersonDetailsContext: function() {
    if (Iron.Location.get().path.substring(0, 21) === "/people/personDetails") return true;
  },
  isConfirmed: function() {
    var personId = Iron.Location.get().path.substring(22);
    if (this.confirms) {
      var numConfirms = this.confirms.length;
      for (var i = 0; i < numConfirms; i++) {
        if (this.confirms[i].person === personId &&
          this.confirms[i].confirmed == true) {
          return true;
        }
      }
    }
    return false;
  },
  numConfirms: function() {
    if (this.confirms) {
      return this.confirms.filter(function(o) {
        return o.confirmed === true;
      }).length;
    } else {
      return 0
    }
  },
  formattedDate: function(){
    return moment(this.start).format("dddd, MMMM Do YYYY");
  }
});

Template.eventItem.events({
  "click .toggleConfirm": function() {
    var personId = Iron.Location.get().path.substring(22);
    Meteor.call('eventConfirmToggle', this._id, personId);
  }
});
