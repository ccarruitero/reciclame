require.config({
  paths: {
    "underscore": "../components/lodash/dist/lodash.underscore",
    "jquery": "../components/jquery/dist/jquery",
    "backbone": "../components/backbone/backbone",
    "mapbox": "../vendor/mapbox"
  },

  shim: {
    'mapbox': {
      exports: 'L'
    }
  }
});

require([
  "app",
  "router",
  "config",
  "map"
], function(app, Router, Config, Map) {
  app.router = new Router();

  Map.init(Config);
  Backbone.history.start({ pushState: true, root: app.root });
});
