define(["backbone", "config"], function(Backbone, Config) {
  "use strict";

  var Place = Backbone.Model.extend({
    urlRoot: function() {
      return Config.apiPath + '/places';
    },

    defaults: {
      id: '',
      name: '',
      address: '',
      lat: '',
      lng: ''
    },

    parse: function(data) {
      return data.place || data;
    }
  });

  return Place;
});
