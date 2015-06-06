define([
  "react",
  "react-backbone",
  "backbone"
], function(React, ReactBackboneMixin, Backbone) {
  "use strict";

  var PlaceDetailView = React.createClass({
    mixins: [ReactBackboneMixin],

    goToEdit: function() {
      var url = Backbone.history.getFragment() + '/edit';
      Backbone.history.navigate(url, true);
    },

    render: function() {
      return React.createElement("div", {className: "place"},
        React.createElement("a", {onClick: this.goToEdit}, 'edit'),
        React.createElement("h2", {}, this.props.model.get('name')),
        React.createElement("p", {}, this.props.model.get('address'))
      );
    }
  });

  return PlaceDetailView;
});
