define(function(require, exports, module) {
  // https://gist.github.com/rjmackay/5762195
  var L = require("mapbox");

  var Map = {
    init: function(Config){
      L.mapbox.accessToken = Config.accessToken;
      var that = this;

      window.map = L.mapbox.map('map', Config.userMap);
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
  };

  module.exports = Map;
});
