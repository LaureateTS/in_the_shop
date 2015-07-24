Template.event.helpers({
    isPersonDetailsContext: function() {
        if (Router.current().route.path(this).substring(0, 21) === "/people/personDetails") return true;
    },
    isConfirmed: function() {
        return false;
    }
});