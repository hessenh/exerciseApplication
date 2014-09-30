Template.loginpanel.events({
    'click .request-submit':function(){
    },
    'click .login-submit' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var email = t.find('#login-email').value;
      var password = t.find('#login-password').value;


      Meteor.loginWithPassword({email:email}, password, function(err){
        if (err)
          // The user might not have been found, or their passwword
          // could be incorrect. Inform the user that their
          // login attempt has failed. 
          console.log(err.reason);
        else
          console.log(email + " is logged in");
          //Router.go('map');
      });
    }
  });