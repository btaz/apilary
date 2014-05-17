'use strict';

var http = require('http');

/**
 * REST API Client. This provides client access to other REST APIs
 */
exports.resource = function (host, port, url, paramDefaults, actions) {
  var api = {};
  api.url = url;
  api.paramDefaults = paramDefaults;

  //
  // common
  //
  var createPath = function (url, param) {
    // replace all parameters where a value was provided
    if (typeof param == 'object') {
      var propt;
      for (propt in param) {
        if (param.hasOwnProperty(propt)) {
          url = url.replace(':' + propt, param[propt]);
        }
      }
    } else if (typeof param == 'string' || typeof param == 'number' || typeof param == 'boolean') {
      url = url.replace(':id', param);
    } else {
      // error
    }

    // strip out all parameters that didn't have a value
    url = url.replace(/:[a-zA-Z0-9\-_]+[^:\/]/, '');

    // strip trailing slashes and set the url
    url = url.replace(/\/+$/, '');
    // then replace collapse `/.` if found in the last URL path segment before the query
    // E.g. `http://url.com/id./format?q=x` becomes `http://url.com/id.format?q=x`
    url = url.replace(/\/\.(?=\w+($|\?))/, '.');
    // replace escaped `/\.` with `/.`
    url = url.replace(/\/\\\./, '/.');

    //url = url.replace(/{2,}/, '/.');

    // strip out double or trailing /
    return url;
  };

  //
  // GET
  //
  var get = function (param, success, failure) {
    var options = {
      host: host,
      port: port,
      path: createPath(url, param),
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'cache-control':'no-cache' // to avoid issues with IE browsers that caches AJAX requests
      }
    };

    var restReq = http.request(options);
    var result = '';

    restReq.on('response', function (response) {
      response.setEncoding('utf8');
      response.on('data', function (chunk) {
        result += chunk;
      });

      response.on('end', function () {
        var json;
        if (typeof success != 'undefined') {
          if (typeof result == 'string' && result.indexOf('{') != -1 && result.indexOf('}') != -1) {
            result = JSON.parse(result);
          }
          // todo: attach $save() method
          success(result, this);
        }
      });

      response.on('error', function (error) {
        if (typeof failure != 'undefined') {
          failure(error, this);
        }
      });
    });

    restReq.on('error', function (error) {
      failure(error);
    });

    restReq.end();

    return result;
  };

  //
  // PUT
  //
  var put = function (param, data, success, failure) {
    var jsonObject = JSON.stringify(data);

    var options = {
      host: host,
      port: port,
      path: createPath(url, param),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'cache-control':'no-cache',        // to avoid issues with IE browsers that caches AJAX requests
        'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
      }
    };

    var restReq = http.request(options);
    var result = '';

    restReq.on('response', function (response) {
      response.setEncoding('utf8');
      response.on('data', function (chunk) {
        result += chunk;
      });

      response.on('end', function () {
        var json;
        if (typeof success != 'undefined') {
          if (typeof result == 'string' && result.indexOf('{') != -1 && result.indexOf('}') != -1) {
            result = JSON.parse(result);
          }
          // todo: attach $save() method
          success(result, this);
        }
      });

      response.on('error', function (error) {
        if (typeof failure != 'undefined') {
          failure(error, this);
        }
      });
    });

    restReq.on('error', function (error) {
      failure(error);
    });

    restReq.write(jsonObject);

    restReq.end();

    return result;
  };


  //
  // POST
  //
  var post = function (param, data, success, failure) {
    var jsonObject = JSON.stringify(data);

    var options = {
      host: host,
      port: port,
      path: createPath(url, param),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cache-control':'no-cache',        // to avoid issues with IE browsers that caches AJAX requests
        'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
      }
    };

    var restReq = http.request(options);
    var result = '';

    restReq.on('response', function (response) {
      response.setEncoding('utf8');
      response.on('data', function (chunk) {
        result += chunk;
      });

      response.on('end', function () {
        var json;
        if (typeof success != 'undefined') {
          if (typeof result == 'string' && result.indexOf('{') != -1 && result.indexOf('}') != -1) {
            result = JSON.parse(result);
          }
          // todo: attach $save() method
          success(result, this);
        }
      });

      response.on('error', function (error) {
        if (typeof failure != 'undefined') {
          failure(error, this);
        }
      });
    });

    restReq.on('error', function (error) {
      failure(error);
    });

    restReq.write(jsonObject);

    restReq.end();

    return result;
  };

  //
  // DELETE
  //
  var del = function (param, data, success, failure) {
    var options = {
      host: host,
      port: port,
      path: createPath(url, param),
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'cache-control':'no-cache' // to avoid issues with IE browsers that caches AJAX requests
      }
    };

    var request = http.request(options, function (response) {
      var str = '';
      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        //logger.debug(' purchase request item saved.' + str);
        //var json;
        if (typeof success != 'undefined') {
          success(str, this);
        }
      });

      response.on('error', function (e) {
        logger.error('Error while saving new item. ' + e);
        if (typeof failure != 'undefined') {
          failure(error, this);
        }
      });
    });

    request.on('error', function (error) {
      failure(error);
    });

    request.end();
  };

  // attach default actions
  api.get = get;
  api.update = put;
  api.post = post;
  api.delete = del;

  return api;
};
