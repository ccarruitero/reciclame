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
    }
  });

  return Place;
});
