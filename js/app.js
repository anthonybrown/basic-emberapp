var App,
    Ember;

App = Ember.Application.create();



App.Router.map(function() {
  "use strict";
  // put your routes here
  this.resource("about");
});


// Model hook
App.IndexRoute = Ember.Route.extend({
  
  model: function() {
    'use strict';
    return App.RedditLink.findAll('cute');
  }

});

// Create the controller so you can trap the input action and act on it
App.IndexController = Ember.ObjectController.extend({
  subredditHeader: 'aww',
  loadList: function() {
    "use strict";
    // Grab the value from the input field
    var value = this.get('subreddit');

    if (value) {
      this.set('subredditHeader', value);
      this.set('model', App.RedditLink.findAll(value));

      // clear out the input field
      this.set('subreddit', '');
    }
  }
});

// This is our Model
App.RedditLink = Ember.Object.extend({
  
  thumbnailUrl: function() {
    'use strict';
    var thumbnail = this.get('thumbnail');
    return (thumbnail === 'default') ? null : thumbnail;
  }.property('thumbnail')

});

  App.RedditLink.reopenClass({
  
    findAll: function(subreddit) {
      
      "use strict";
      var links = [];

      $.getJSON("http://www.reddit.com/r/" + subreddit + "/.json?jsonp=?").then(function(response) {
        response.data.children.forEach(function(child) {
          links.pushObject(App.RedditLink.create(child.data));
        });
      });
      
      return links;
    }
  
  });
