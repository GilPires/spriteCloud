
module.exports = {
  // this controls whether to abort the test execution when an assertion failed and skip the rest
  // it's being used in waitFor commands and expect assertions
  abortOnAssertionFailure : false,


  // default timeout value in milliseconds for waitFor commands and implicit waitFor value for
  // expect assertions
  waitForConditionTimeout : 15000,
};
