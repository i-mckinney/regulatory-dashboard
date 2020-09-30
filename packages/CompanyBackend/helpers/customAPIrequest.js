const axios = require("axios");

/**
 *
 * @param {object} customAPI
 * ex)
 * { id: 0,
 * requestName: '',
 * requestMethod: '',
 * requestUrl: '',
 * requestDescription: '',
 * addParameters: '',
 * requestParams: '',
 * requestHeaders: '',
 * requestBody: '',
 * addRequestToCollection: false,
 * requestAddedDate: new Date(),
 *}; customAPI data to fire off custom API request
 * @return data you get back from the api request
 */
async function customAPIrequest(customAPI) {
  //checking request method types to make sure it is one of the valid request methods.
  let acceptedAPIcalls = [
    "GET",
    "HEAD",
    "POST",
    "PUT",
    "DELETE",
    "CONNECT",
    "OPTIONS",
    "TRACE",
    "PATCH",
  ];
  if (!acceptedAPIcalls.includes(customAPI.requestMethod.toUpperCase())) {
    throw new Error("Must input a valid type of HTTP methods");
  }

  if (
    customAPI.requestUrl.includes("http://") ||
    customAPI.requestUrl.includes("https://")
  ) {
    const result = axios({
      method: customAPI.requestMethod,
      url: customAPI.requestUrl,
      data: customAPI.requestBody,
      headers: customAPI.requestHeaders,
      params: customAPI.requestParams,
    })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch(function (error) {
        // handle error
        throw new Error(error);
      });
    return result;
  }
  //checking request url if the url does not contain http:// https://, throw new express error
  throw new Error("http:// or https:// must be included in requestUrl");
}

module.exports = customAPIrequest;
