const util = require('util');
const events = require('events');

const TIMEOUT_RETRY_INTERVAL = 100;

function waitUntil() {
  events.EventEmitter.call(this);
  this.startTimeInMilliseconds = null;
}

util.inherits(waitUntil, events.EventEmitter);

/**
 * The purpose of this command is to serve as a base for waitUntil_ commands.
 *  It will run the getActual function until
 * the predicate funciton returns true or the timeout is reached.
 *  At that point, the assertion funciton will be called.
 * @param getActual {Function} - should passe the found value to its callback.
 * The callback will be passed as the only argument.
 * @param predicate {Function} - the wait will end when this returns true.
 * The actual value is passed as the only argument.
 * @param assertion {Function} - the assertion to make.
 * The assertion should pass when the predicate returns true.
 * This function will be passed the actual value and the message.
 * @param timeoutInMilliseconds {number} - the number of milliseconds to
 * wait before timing out and failing.
 * @param message {string} - the message to attach to the assertion.
 * The elapsed time will be appended to this.
 * @returns custom command waitUntil,
 * which can be accessed as browser.waitUntil(args);
 */

waitUntil.prototype.command = function (getActual, predicate, assertion, timeoutInMilliseconds, message) {
  message = message || 'waitUntil';
  this.startTimeInMilliseconds = new Date().getTime();
  const self = this;

  this.check(getActual, predicate, (actual, loadedTimeInMilliseconds) => {
    if (predicate(actual)) {
      message += `: true after ${
        loadedTimeInMilliseconds - self.startTimeInMilliseconds} ms.`;
    } else {
      message += `: timed out after ${timeoutInMilliseconds} ms.`;
    }
    assertion(actual, message);
    self.emit('complete');
  }, timeoutInMilliseconds);

  return this;
};

waitUntil.prototype.check = function (getActual, predicate, callback, maxTimeInMilliseconds) {
  const self = this;
  getActual((result) => {
    // If the argument passed to the callback is an object,
    // it is assumed that the format is of the argument passed
    // to callbacks by the Nightwatch API,
    //  in which the object has a "value" attribute with the actual information.
    let resultValue;
    if (typeof result !== 'object') {
      resultValue = result;
    } else if (result.hasOwnProperty('value')) {
      resultValue = result.value;
    } else {
      self.error('Result object does not have a value.');
      return;
    }

    const now = new Date().getTime();
    if (predicate(resultValue)) {
      callback(resultValue, now);
    } else if (now - self.startTimeInMilliseconds < maxTimeInMilliseconds) {
      setTimeout(() => {
        self.check(getActual, predicate, callback, maxTimeInMilliseconds);
      }, TIMEOUT_RETRY_INTERVAL);
    } else {
      callback(resultValue, null);
    }
  });
};
module.exports = waitUntil;
