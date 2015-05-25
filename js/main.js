require.config({
  paths: {
    "underscore": "../components/lodash/dist/lodash.underscore",
    "jquery": "../components/jquery/dist/jquery",
    "backbone": "../components/backbone/backbone",
    "react": "../components/react/react",
    "react-backbone": "../components/backbone-react-component/lib/component",
    "mapbox": "../vendor/mapbox"
  },

  shim: {
    "mapbox": {
      exports: "L"
    },

    "jquery": {
      exports: "$"
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

  Backbone.history.start({ pushState: true, root: app.root });
  //Map.init(Config);
});
