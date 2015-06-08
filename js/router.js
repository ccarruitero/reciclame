define([
  "backbone",
  "underscore",
  "collections/places",
  "react",
  "views/place_list_view",
  "views/place_detail_view",
  "views/place_edit_view",
  "views/place_new_view",
  "models/place",
  "views/map_view",
  "config",
  "views/login_view"
], function(
  Backbone,
  _,
  Places,
  React,
  PlaceListView,
  PlaceDetailView,
  PlaceEditView,
  PlaceNewView,
  Place,
  MapView,
  Config,
  LoginView
) {
  "use strict";

  var Router = Backbone.Router.extend({

    initialize: function() {
      $(document).on('click', 'a[href]:not([data-bypass])',
                     _.bind(this.clickInterceptor, this));
      this.setMenu();
      this.initMap();
      this.mainEl = document.getElementById("main");
    },

    close: function () {
      $(document).off('click', 'a[href]:not([data-bypass])');
    },

    clickInterceptor: function (evt) {
      if (evt.defaultPrevented) {
        return;
      }

      // Get the absolute anchor href.
      var href = { prop: $(evt.currentTarget).prop('href'),
                   attr: $(evt.currentTarget).attr('href') };

      // Get the absolute root.
      var appRoot = '/';
      var root = location.protocol + '//' + location.host + appRoot;

      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      if (href.prop.slice(0, root.length) === root) {
        // if it's relative
        // Remove initial '#' or '/' if present
        var whereToGo = href.attr.replace(/^[#\/]/, '');
        this.navigate(whereToGo, { trigger: true });
      } else {
        // if it's not relative
        // In our particular case, we don't want to enable ANY link outside
        // that does not have a data-bypass attribute. So do nothing here.
        console.log('Attempt to load url ' + href.prop);
      }
    },

    routes: {
      "": "places",
      "places": "places",
      "places/new": "newPlace",
      "places/:id": "placeDetail",
      "places/:id/edit": "placeEdit",
      "login": "login"
    },

    requiresAuth: ["placeEdit", "newPlace"],

    initMap: function() {
      var mapEl = document.getElementById("map");
      React.render(
        React.createElement(MapView,
                            {accessToken: Config.accessToken,
                            userMap: Config.userMap}), mapEl);
    },

    places: function() {
      var that = this;
      console.log("Welcome to your / route.");
      this.placeList = new Places();
      this.placeList.fetch({
        success: function() {
          that.loadView(React.createElement(PlaceListView, {collection:that.placeList}));
        }
      });
    },

    placeDetail: function(id) {
      var that = this;
      if (this.placeList === undefined) {
        this.place = new Place({id: id});
        this.place.fetch({
          success: function() {
            that.loadView(React.createElement(PlaceDetailView, {model: that.place}));
          }
        });
      } else {
        var place = this.placeList.get(id);
        this.loadView(React.createElement(PlaceDetailView, {model: place}));
      }
    },

    placeEdit: function(id) {
      var that = this;
      if (this.placeList === undefined) {
        this.place = new Place({id: id});
        this.xhr = this.place.fetch({
          success: function() {
            that.loadView(React.createElement(PlaceEditView, {model: that.place}));
          }
        });
      } else {
        var place = this.placeList.get(id);
        this.loadView(React.createElement(PlaceEditView, {model: place}));
      }
    },

    newPlace: function() {
      var place = new Place();
      this.loadView(React.createElement(PlaceNewView, {model: place}));
    },

    login: function() {
      if (this.xhr !== undefined) {
        this.xhr.abort();
      }
      this.loadView(React.createElement(LoginView, null));
    },

    loadView: function(newView) {
      React.render(newView, this.mainEl);
    },

    setMenu: function() {
      var bg = document.getElementById('bg');
      var menu = document.getElementsByClassName('b-menu')[0];
      var container = document.getElementsByClassName('b-container')[0];
      var nav = document.getElementsByClassName('b-nav')[0];

      bg.classList.toggle('hide');

      menu.addEventListener('click', function() {
        [bg, container, nav].forEach(function(el) {
          el.classList.toggle('open');
        });
        bg.classList.toggle('hide');
      }, false);
    }
  });

  return Router;
});
