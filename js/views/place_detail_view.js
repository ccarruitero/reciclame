define([
  "react",
  "react-backbone",
  "backbone"
], function(React, ReactBackboneMixin, Backbone) {
  "use strict";

  var PlaceDetailView = React.createClass({
    mixins: [ReactBackboneMixin],

    render: function() {
      return React.createElement("div", {className: "place"},
        React.createElement("h2", {}, this.props.model.get('name')),
        React.createElement("p", {}, this.props.model.get('address'))
      );
    }
  });

  return PlaceDetailView;
});
