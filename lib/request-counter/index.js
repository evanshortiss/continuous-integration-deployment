'use strict';

var urls = {};


/**
 * Returns our URL list Object to a callee
 * @return {Object}
 */
exports.getList = function () {
  return urls;
};


/**
 * Update the number of times the specified URL has been called
 * @param  {String} url
 * @return {Number}
 */
exports.incrementForUrl = function (url) {
  if (!urls.hasOwnProperty(url)) {
    urls[url] = 1;
  } else {
    urls[url]++;
  }
};
