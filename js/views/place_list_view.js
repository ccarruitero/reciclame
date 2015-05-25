define([
  "react",
  "react-backbone",
  "backbone"
], function(React, ReactBackboneMixin, Backbone) {
  "use strict";

  var PlaceListView = React.createClass({
    mixins: [ReactBackboneMixin],

    addPlace: function(model) {
      return React.createElement("li", {key: model.id}, model.name);
    },

    render: function() {
      var that = this;
      return React.createElement("div", null, this.state.collection.map(this.addPlace));
    }
  });

  return PlaceListView;
});
