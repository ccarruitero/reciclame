define([
  "react",
  "react-backbone",
  "backbone",
  "app"
], function(React, ReactBackboneMixin, Backbone, app) {
  "use strict";

  var PlaceNewView = React.createClass({

    setModel: function(e) {
      this.props.model.set(e.target.className, e.target.value);
    },

    createPlace: function(e) {
      e.preventDefault();
      var attr = this;
      this.props.model.save(null, {
        headers: {
          'Authorization': app.auth.get('userToken')
        },
        success: function (model, response, options) {
          var url = '/places/' + model.id;
          Backbone.history.navigate(url, true);
        },
        error: function (model, xhr, options) {
          console.log("error");
        }
      });
    },

    render: function() {
      return React.createElement("form", {className: "place"},
        React.createElement("input",
                            { placeholder: 'name',
                              className: 'name', onChange: this.setModel }),
        React.createElement("input", 
                            { placeholder: 'address',
                              className: 'address', onChange: this.setModel}),
        React.createElement("input", 
                            { placeholder: 'lat', onChange: this.setModel,
                              className: 'lat'}),
        React.createElement("input",
                            { placeholder: 'lng', onChange: this.setModel,
                              className: 'lng'}),
        React.createElement("button", {onClick: this.createPlace}, 'save')
      );
    }
  });

  return PlaceNewView;
});
