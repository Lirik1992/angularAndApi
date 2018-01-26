'use strict';

eventsApp.factory('HttpService', function () {
  return {
    get: function (method, url, callback) {
      this.method = method;
      this.url = url;

      var token = document.cookie.split('=').splice(1,1)[0];
      var xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Authorization', token)
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          callback(xhr.responseText);
        }
      };
      xhr.send();
    }
  }
})