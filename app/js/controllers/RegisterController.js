var RegisterController = (function () {
  'use strict';
  var registerMethod = function (evt) {
    evt.preventDefault();

    var registerForm = {
      name: document.getElementsByName("name")[0].value,
      email: document.getElementsByName("email")[0].value,
      username: document.getElementsByName("username")[0].value,
      password: document.getElementsByName("password")[0].value
    };
<<<<<<< HEAD
    var result = Http.post("http://localhost:3000/users/register", registerForm, function (data) {
      if(data !== 'undefined') {
        window.location = 'LoginForm.html';
      }
=======
    var result = Http.post("http://localhost:3000/users/register",registerForm, function(data) {
      window.location = ''
>>>>>>> e8b3c219617289deb83e47196ff717e699d0b5de
    });

  };
  return {
    register: registerMethod
  };
})();
