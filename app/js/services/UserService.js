var Http = (function () {

  /** An Http constructor 
   *  - method: (GET || POST) 
   *  - url: String
   *  - data: (Object)
   *  - callback: function(data) {typeof return === json}
   * @param {String} method 
   * @param {String} url 
   * @param {Object} data 
   * @param {function(json)} callback 
   */

  function Http(method, url, data, callback) {
    this.method = method;
    this.url = url;
    this.data = data;

    var body = JSON.stringify(data);
    var xhr = new XMLHttpRequest()
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        callback(xhr.responseText);
      }
    };
    xhr.send(body);
  }

  /**Http property
   * @param {string} url 
   * @param {function} cb 
   */
  var privateGet = function (url, cb) {
    Http('GET', url, null, cb);
  };

  /**Http property
   * @param {string} url 
   * @param {object} data 
   * @param {function} cb 
   */
  var privatePost = function (url, data, cb) {
    Http('POST', url, data, cb);
  }

  return {
    get: privateGet,
    post: privatePost
  }
})();
