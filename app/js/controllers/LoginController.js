var LoginController = (function () {
  "use strict"
  var loginMethod = function (evt) {
    evt.preventDefault();

    var loginForm = {
      username: document.getElementsByName("username")[0].value,
      password: document.getElementsByName("password")[0].value
    };
    Http.post("http://localhost:3000/users/authenticate", loginForm, function(data, err) {
      if(err) {
        console.log(err)
      } else {
        console.log(data);
        var parsedData = JSON.parse(data);
        var token = parsedData.token;
        console.log(parsedData.success);
        if (parsedData.success) {
          setCookie(token);
          localStorage.setItem('ID', parsedData.user.id);
          window.location = '/index.html';
        } else {
          console.log('Something bad occured');
        }
      }
    });

    var parsedData = JSON.parse(data);
      var token = parsedData.token;
      if (!parsedData.success) {
        console.log('Something bad occured');
      } else {
        setCookie(token);
        localStorage.setItem('ID', parsedData.user.id)
        window.location = '/index.html';
      }


    // Cookie, the default one  TODO: replace it with js-cookie
    // TOKEN is here, pull it with
    // document.cookie.split('=').splice(1, 1)[0]

    // expiration is set to 7 days from NOW

    function setCookie(info) {
      var date = new Date;
      date.setDate(date.getDate() + 7);
      document.cookie = 'token=' + info + ';path=/;' + 'expires=' + date.toUTCString();
    }
  };
  return {
    login: loginMethod
  };
})();