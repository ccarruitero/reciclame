define([
  "react",
  "react-backbone",
  "backbone",
  "app"
], function(React, ReactBackboneMixin, Backbone, app) {
  "use strict";

  var PlaceEditView = React.createClass({
    mixins: [ReactBackboneMixin],

    updatePlace: function(e) {
      e.preventDefault();
      console.log(app.auth.get('userToken'));
      this.props.model.save(null, {
        headers: {
          'Authorization': app.auth.get('userToken')
        },
        saved: true,
        success: function (model, response, options) {
          var url = Backbone.history.getFragment().replace('/edit', '');
          app.router.navigate(url, true);
        },
        error: function (model, xhr, options) {
          console.log("error");
        }
      });
    },

    setModel: function(e) {
      this.props.model.set(e.target.className, e.target.value);
    },

    render: function() {
      return React.createElement("form", {className: "place"},
        React.createElement("input",
                            { defaultValue: this.props.model.get('name'),
                              className: 'name', onChange: this.setModel }),
        React.createElement("input", 
                            { defaultValue: this.props.model.get('address'),
                              className: 'address', onChange: this.setModel}),
        React.createElement("input", 
                            { defaultValue: this.props.model.get('lat'),
                              className: 'lat', onChange: this.setModel}),
        React.createElement("input",
                            { defaultValue: this.props.model.get('lng'),
                              className: 'lng', onChange: this.setModel}),
        React.createElement("button", {onClick: this.updatePlace}, 'save')
      );
    }
  });

  return PlaceEditView;
});
