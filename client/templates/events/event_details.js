Template.eventDetails.helpers({
  numConfirms: function() {
    if (this.confirms) {
      return this.confirms.filter(function(o) {
        return o.confirmed === true;
      }).length;
    } else {
      return 0
    }
  },
  confirmedPeople: function() {
    var list = this.confirms.filter(function(o) {
      return o.confirmed === true;
    });
    list.forEach(function(o) {
      var thisPerson = People.findOne(o.person);
      o.firstName = thisPerson.firstName;
      o.lastName = thisPerson.lastName;
    });
    list.sort(function(a, b) {
      return a.lastName - b.lastName;
    });
    return list;
  },
  unconfirmedPeople: function() {
    var list = this.confirms;
    list.forEach(function(o) {
      var thisPerson = People.findOne(o.person);
      o.firstName = thisPerson.firstName;
      o.lastName = thisPerson.lastName;
    });
    return list.filter(function(o) {
      return o.confirmed === false;
    }).sort();
  },
  formattedDate: function() {
    return moment(this.start).format("dddd, MMMM Do YYYY");
  }
});
