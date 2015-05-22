require.config({
  paths: {
    "underscore": "../components/lodash/dist/lodash.underscore",
    "jquery": "../components/jquery/dist/jquery",
    "backbone": "../components/backbone/backbone"
  }
});

require(["app", "router"], function(app, Router) {
  app.router = new Router();

  Backbone.history.start({ pushState: true, root: app.root });
});
