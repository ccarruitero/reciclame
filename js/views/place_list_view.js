define([
  "react",
  "react-backbone",
  "backbone"
], function(React, ReactBackboneMixin, Backbone) {
  "use strict";

  var PlaceListView = React.createClass({
    mixins: [ReactBackboneMixin],

    addMarker: function(place){
      var lat = place.lat;
      var lng = place.lng;
      var that = this;

      L.mapbox.featureLayer({
          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [lng, lat]
          },
          properties: {
              'marker-color': '#000',
              'marker-symbol': 'waste-basket',
              'marker-size': 'medium',
              title: place.name,
              address: place.address
          }
      }).addTo(map).on('click', function(e) {
          var path = '/places/' + place.id;
          Backbone.history.navigate(path, true);
      });
    },

    render: function() {
      var that = this;
      return React.createElement("div", {}, this.state.collection.map(this.addMarker));
    }
  });

  return PlaceListView;
});
