Template.eventsList.helpers({
    events: function() {
        return CalendarEvents.find({calendarEventType: "global"});
    },
    isPersonDetailsContext: function() {
        if (Router.current().route.path(this).substring(0, 21) === "/people/personDetails") return true;
    },
});
