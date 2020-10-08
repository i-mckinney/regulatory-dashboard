const axios = require("axios");

/**
 *
 * @param {object} customAPI
 * ex)
 * { id: 0,
 * requestName: '',
 * requestType: '',
 * requestUrl: '',
 * requestParams: '',
 * requestHeaders: '',
 * requestBody: '',
 * responseMapper: '',
 *}; customAPI data to fire off custom API request
 * In the response mapper, key will be the KEY that we want to grab from the external source.
 * In the response mapper, VALUE will be the KEY that user wants the value of the KEY ABOVE will map to.
 * if responseMapper is given, we return a object:
 *  {
 *    externalSourceData: result,
 *    responseMapped: resultWithMapping,
 *  }
 * @return data you get back from the api request
 */
async function customApiRequestTest(customAPI) {
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
  if (!acceptedAPIcalls.includes(customAPI.requestType.toUpperCase())) {
    throw new Error("Must input a valid type of HTTP methods");
  }

  if (!customAPI.requestUrl)
    throw new Error("Custom API request URL not given");

  if (
    customAPI.requestUrl.includes("http://") ||
    customAPI.requestUrl.includes("https://")
  ) {
    const result = axios({
      method: customAPI.requestType,
      url: customAPI.requestUrl,
      data: customAPI.requestBody,
      headers: customAPI.requestHeaders,
      params: customAPI.requestParams,
    })
      .then((response) => {
        const resultData = response.data;
        //In the case wehre response Mapper is given
        if (customAPI.responseMapper) {
          const responseMapper = customAPI.responseMapper;

          //checking for empty object (no responsemapper given)
          if (Object.keys(responseMapper).length === 0) {
            return {
              externalSourceData: resultData,
              responseMapped: `No response mapper given`,
            };
          }

          const resultWithMapping = {};

          for (const externalSystemKey in responseMapper) {
            const newMappedKey = responseMapper[externalSystemKey];
            const desiredValueFromExternal = resultData[externalSystemKey];

            if (!desiredValueFromExternal)
              console.log(
                `External System key "${externalSystemKey}" does not exist in the external source data`
              );

            resultWithMapping[newMappedKey] = desiredValueFromExternal;
          }

          return {
            externalSourceData: resultData,
            responseMapped: resultWithMapping,
          };
        } else {
          return resultData;
        }
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

module.exports = customApiRequestTest;
