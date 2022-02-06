import axios from 'axios';

function request(method, params, callback) {
  axios({
    url: params.url,
    method: method,
    body: JSON.stringify(params.body),
    headers: params.headers,
  }).then(function(response) {
    if (200 <= response.status && response.status < 300) {
      callback(null, response.data);
      return;
    }

    callback(new Error(response.responseText));
  });
}
/**
 * Use axios to get a network resource.
 * @param {String} method - HTTP Method
 * @param {Object} params - Request parameters
 * @param {String} params.url - URL of the resource
 * @param {Array}  params.headers - An array of headers to pass [{ headerName : headerBody }]
 * @param {Object} params.body - A JSON body to send to the resource
 * @returns {response}
 **/
const Request = request;

/**
 * Sugar function for request('GET', params, callback);
 * @param {Object} params - Request parameters
 * @param {Request~get} callback - The callback that handles the response.
 */
Request.get = function get(params, callback) {
  return new this('GET', params, callback);
};

/**
 * Sugar function for request('POST', params, callback);
 * @param {Object} params - Request parameters
 * @param {Request~post} callback - The callback that handles the response.
 */
Request.post = function post(params, callback) {
  return new this('POST', params, callback);
};

module.exports = Request;
