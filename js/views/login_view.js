define([
  "react",
  "backbone",
  "views/login_btn_view",
  "config"
], function(React, Backbone, LoginBtnView, Config) {
  "use strict";

  var LoginView = React.createClass({
    wrapLogin: function(provider) {
      var loginMsg = "Login with " + provider;
      return React.createElement( LoginBtnView,
                                  { className: "login-btn " + provider + "-btn",
                                    "data-prov": provider,
                                    loginTxt: loginMsg,
                                    clickHandler: this.handleClick},
                                  loginMsg);
    },

    handleClick: function(e) {
      var provider = e.target.getAttribute('data-prov');
      var url = Config.serverPath + "/auth/" + provider;
      var width = 800;
      var height = 400;
      var winOpts = "menubar=no,status=no,width=" + width + ",height=" + height;
      var authWin = window.open(url, "Auth_Popup", winOpts);
    },

    render: function() {
      return React.createElement( "div",
                                  { className: "login-wrap"},
        this.wrapLogin("facebook"),
        this.wrapLogin("twitter")
      );
    }
  });

  return LoginView;
});
