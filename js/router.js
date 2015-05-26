define([
  "backbone",
  "collections/places",
  "react",
  "views/place_list_view",
  "views/place_detail_view",
  "models/place",
  "views/map_view",
  "config"
], function(
  Backbone,
  Places,
  React,
  PlaceListView,
  PlaceDetailView,
  Place,
  MapView,
  Config
) {
  "use strict";

  var Router = Backbone.Router.extend({

    initialize: function() {
      $(document).on('click', 'a[href]:not([data-bypass])',
                     _.bind(this.clickInterceptor, this));
      this.setMenu();
      this.initMap();
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
      "places/:id": "placeDetail"
    },

    initMap: function() {
      var mapEl = document.getElementById("map");
      React.render(
        React.createElement(MapView,
                            {accessToken: Config.accessToken,
                            userMap: Config.userMap}), mapEl);
    },

    places: function() {
      var that = this;
      var mountEl = document.getElementById("main");
      console.log("Welcome to your / route.");
      this.placeList = new Places();
      this.placeList.fetch({
        success: function() {
          React.render(React.createElement(PlaceListView, {collection:that.placeList}), mountEl);
        }
      });
    },

    placeDetail: function(id) {
      var that = this;
      var mountEl = document.getElementById("main");
      if (this.placeList === undefined) {
        this.place = new Place({id: id});
        this.place.fetch({
          success: function() {
            React.render(React.createElement(PlaceDetailView, {model: that.place}), mountEl);
          }
        });
      } else {
        var place = this.placeList.get(id);
        React.render(React.createElement(PlaceDetailView, {model: place}), mountEl);
      }
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
