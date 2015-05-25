define([
  "backbone",
  "models/place",
  "config"
], function(Backbone, Place, Config) {
  "use strict";

  var Places = Backbone.Collection.extend({
    model: Place,

    url: function() {
      return Config.apiPath + '/places';
    },

    parse: function(data) {
      return data.places;
    }
  });

  return Places;
});
