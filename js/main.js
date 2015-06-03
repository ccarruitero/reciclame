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
    },

    "underscore": {
      exports: "_"
    }
  }
});

require([
  "underscore",
  "app",
  "router",
  "models/auth"
], function(_, app, Router, Auth) {
  app.router = new Router();
  app.auth = new Auth();

  Backbone.history.on("route", function(router, route, params) {
    var needsAuth = _.contains(router.requiresAuth, route);
    var authenticated = app.auth.get('isAuthenticated');
    var lastPath = Backbone.history.getFragment();

    if (lastPath !== 'login') {
      app.lastPath = lastPath;
    }

    if (!authenticated && needsAuth) {
      Backbone.history.navigate("/login", true);
    }
  });

  Backbone.history.start({ pushState: true, root: app.root });

  // handle authentication message
  function receiveMessage(event) {
    var user = JSON.parse(event.data);
    app.auth.setAuth(user);
  }

  window.addEventListener("message", receiveMessage, false);
});
