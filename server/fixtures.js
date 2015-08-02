if (People.find().count() === 0) {
  console.log("people fixtures toggled")
    // Create sample people
  People.insert({
    firstName: "Charles",
    lastName: "Babbage",
    homePhone: "0600000001",
    mobilePhone: "0600000002"
  });
  People.insert({
    firstName: "Alexander",
    lastName: "Bell",
    homePhone: "0600000003",
    mobilePhone: "0600000004"
  });
  People.insert({
    firstName: "Louis",
    lastName: "Braille",
    homePhone: "0600000005",
    mobilePhone: "0600000006"
  });
  People.insert({
    firstName: "Rudolf",
    lastName: "Diesel",
    homePhone: "0600000007",
    mobilePhone: "0600000008"
  });
  People.insert({
    firstName: "Thomas",
    lastName: "Edison",
    homePhone: "0600000009",
    mobilePhone: "0600000010"
  });
  People.insert({
    firstName: "Enrico",
    lastName: "Fermi",
    homePhone: "0600000011",
    mobilePhone: "0600000012"
  });
  People.insert({
    firstName: "Benjamin",
    lastName: "Franklin",
    homePhone: "0600000013",
    mobilePhone: "0600000014"
  });
  People.insert({
    firstName: "Samuel",
    lastName: "Morse",
    homePhone: "0600000015",
    mobilePhone: "0600000016"
  });
  People.insert({
    firstName: "Isaac",
    lastName: "Newton",
    homePhone: "0600000017",
    mobilePhone: "0600000018"
  });
  People.insert({
    firstName: "Nikola",
    lastName: "Tesla",
    homePhone: "0600000019",
    mobilePhone: "0600000020"
  });
  People.insert({
    firstName: "Alan",
    lastName: "Turing",
    homePhone: "0600000021",
    mobilePhone: "0600000022"
  });
  People.insert({
    firstName: "Alessandro",
    lastName: "Volta",
    homePhone: "0600000023",
    mobilePhone: "0600000024"
  });
  People.insert({
    firstName: "James",
    lastName: "Watt",
    homePhone: "0600000025",
    mobilePhone: "0600000026"
  });
}

if (CalendarEvents.find().count() === 0) {
  console.log("events fixtures toggled")
  CalendarEvents.insert({
    title: "Christmas",
    start: new Date(2015, 11, 25),
    end: new Date(2015, 11, 25),
    time: "20:00",
    type: "global",
  });
  CalendarEvents.insert({
    title: "New Years",
    start: new Date(2015, 11, 31),
    end: new Date(2015, 11, 31),
    time: "22:30",
    type: "global",
  });
  var nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  CalendarEvents.insert({
    title: "Next weeks awesome event",
    start: nextWeek,
    end: nextWeek,
    time: "10:45",
    type: "global",
  });
}
