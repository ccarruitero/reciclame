define(["backbone", "app"], function(Backbone, app) {
  var Auth = Backbone.Model.extend({
    defaults: {
      userId: null,
      userToken: null,
      email: null,
      admin: false,
      name: null
    },

    initialize: function() {
      this.checkAuth();
    },

    isAuthenticated: false,

    setAuth: function(user) {
      this.set({
        userId: user.id,
        userToken: user.token,
        name: user.name,
        email: user.email,
        admin: user.admin,
        isAuthenticated: true
      });
      sessionStorage.setItem('userToken', this.get('userToken'));
      Backbone.history.navigate(app.lastPath, true);
    },

    checkAuth: function() {
      var userToken = sessionStorage.getItem('userToken');
      var that = this;

      if (userToken !== null) {
        that.set({isAuthenticated: true, userToken: userToken});
      }
    }
  });

  return Auth;
});
