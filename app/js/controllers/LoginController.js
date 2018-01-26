var LoginController = (function () {
  "use strict"
  var loginMethod = function (evt) {
    evt.preventDefault();

    var loginForm = {
      username: document.getElementsByName("username")[0].value,
      password: document.getElementsByName("password")[0].value
    };
    var result = Http.post("http://localhost:3000/users/authenticate", loginForm, function (data) {
      var dataArr = JSON.parse(data);
      var token = dataArr.token;
<<<<<<< HEAD
      if (token !== 'undefined') {
        setCookie(token);
        window.location = 'HomeApp.html';
      } else {
        console.log('Something bad occured');
      }
=======
      console.log(token);
      setCookie(token);
      window.location = 'ParalaxEffect.html';
>>>>>>> e8b3c219617289deb83e47196ff717e699d0b5de
    });

    // Cookie, the default one  TODO: replace it with js-cookie
    // TOKEN is here, pull it with
    // document.cookie.split('=').splice(1, 1)[0]

    // expiration is set to 7 days from NOW

    function setCookie(info) {
      var date = new Date;
      date.setDate(date.getDate() + 7);
      document.cookie = 'token=' + info + ';path=/;' + 'expires=' + date.toUTCString();
    }
  }
  return {
    login: loginMethod
  };
})();