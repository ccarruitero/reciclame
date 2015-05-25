define([
  "backbone",
  "collections/places",
  "react",
  "views/place_list_view"
], function(Backbone, Places, React, PlaceListView) {
  "use strict";

  var Router = Backbone.Router.extend({
    routes: {
      "": "places"
    },

    initialize: function () {
      this.setMenu();
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
