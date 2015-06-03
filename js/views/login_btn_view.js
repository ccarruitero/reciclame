define([
  "react",
  "backbone",
], function(React, Backbone) {
  "use strict";

  var LoginBtnView = React.createClass({
    render: function() {
      return React.createElement( "div",
                                  { className: this.props.className,
                                    "data-prov": this.props["data-prov"],
                                    onClick: this.props.clickHandler},
                                  this.props.loginTxt
      );
    }
  });

  return LoginBtnView;
});
