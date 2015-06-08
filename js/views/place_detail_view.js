define([
  "react",
  "react-backbone",
  "backbone",
  "app"
], function(React, ReactBackboneMixin, Backbone, app) {
  "use strict";

  var PlaceDetailView = React.createClass({
    mixins: [ReactBackboneMixin],

    goToEdit: function() {
      var url = Backbone.history.getFragment() + '/edit';
      Backbone.history.navigate(url, true);
    },

    deletePlace: function() {
      this.props.model.destroy({
        headers: {
          'Authorization': app.auth.get('userToken')
        },
        success: function() {
          Backbone.history.navigate('', true);
        }
      });
    },

    render: function() {
      return React.createElement("div", {className: "place"},
        React.createElement("a", {onClick: this.goToEdit}, 'edit'),
        React.createElement("a", {onClick: this.deletePlace}, 'delete'),
        React.createElement("h2", {}, this.props.model.get('name')),
        React.createElement("p", {}, this.props.model.get('address'))
      );
    }
  });

  return PlaceDetailView;
});
