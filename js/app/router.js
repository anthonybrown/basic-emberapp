App.Router.map(function() {
  "use strict";
  // put your routes here
  this.resource("about", function() {
    this.route("team");
  });
  this.route("contact");
  this.resource("bookmarks");
  this.resource("bookmark", { path: "/bookmarks/:bookmark_id" });
});

