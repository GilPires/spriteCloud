exports.command = function (refreshFunction, getVisibilityFunction, assertion, timeout, message) {
  const browser = this;

  function refreshPage(callback) {
    refreshFunction();
    getVisibilityFunction(callback);
  }

  function isTrue(actual) {
    return !!actual;
  }

  return browser.waitUntil(refreshPage, isTrue, assertion, timeout, message);
};
