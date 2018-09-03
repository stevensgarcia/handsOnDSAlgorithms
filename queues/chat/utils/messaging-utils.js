const PriorityQueue = require('./priority-queue');

const Utils = (() => {
  class Utils {

    constructor() { }

    getUniqueFailureQueue(from, to) {

      return new PriorityQueue();
    }

    sendMessage(message) {
      return new Promise((resolve, reject) => {
        // randomize successes and failure of message being sent
        if (Math.random() < 0.1) {
          resolve(message);
        } else {
          reject(message);
        }
      });
    }
  }

  return Utils;

})();

module.exports = Utils;
