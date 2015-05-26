define([
  "backbone",
  "models/map",
  "mapbox",
  "react"
], function(Backbone, Map, L, React) {
  "use strict";

  var MapView = React.createClass({

    componentDidMount: function() {
      L.mapbox.accessToken = this.props.accessToken;
      window.map = L.mapbox.map('map', this.props.userMap);
      var that = this;

      if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(that.geoSuccess,
                                                 that.geoError,
                                                 that.geoOptions);

      } else {
        map.setView([-12.132292, -77.021588], 13);
      }

      map.on('click', function(e){
        console.log(e.latlng);
      });
    },

    render: function() {
      return React.createElement("div", {id: "map"});
    },
    
    geoSuccess: function(position){
      var lat = position.coords.latitude,
          lng = position.coords.longitude;
      map.setView([lat, lng], 13);
      var marker = L.marker([lat, lng]).addTo(map);
    },

    geoError: function(error){
      console.log('Error ' + error.code + ' : ' + error.message);
      map.setView([-12.132292, -77.021588], 13);
    },

    geoOptions: {
      timeout: 17000
    }
  });

  return MapView;
});
