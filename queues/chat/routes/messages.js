const router = require('express').Router();
const Utils = require('../utils/messaging-utils');

const msgUtils = new Utils();

router.route('/')
  .post((req, res) => {

    const message                    = req.body.message;
    let failedMessageQueue;
    let failureTriggerCount          = 0;
    let failureTriggerCountThreshold = 3;
    let newMsgNode                   = {
      message: message,
      priority: 0
    };

    // try to send the message
    msgUtils.sendMessage(message)
      .then((message) => {
        console.log('first attempt success');
        res.send(`Message received from: ${req.body.from} to ${req.body.to} with message ${req.body.message}`);
      })
      .catch((failedMessage) => {

        // If message couldn't be sent, create a unique queue for this channel
        failedMessageQueue = msgUtils.getUniqueFailureQueue(req.body.from, req.body.to);

        // add the message to the queue
        failedMessageQueue.add(failedMessage);

        // trigger failure protocol
        triggerFailureProtocol();

      });

    // Failure protocol functionality
    function triggerFailureProtocol() {

      console.log('trigger failure protocol');
      console.log(failureTriggerCount);

      // Get front failed message from queue
      let frontMsgNode = failedMessageQueue.front();

      // Low priority and hasn't hit retry threshold
      if (frontMsgNode.priority === 0
      && failureTriggerCount <= failureTriggerCountThreshold) {

        console.log(failureTriggerCount);
        // try to send message
        msgUtils.sendMessage(frontMsgNode.message)
          .then(() => {
            console.log('resend success');
            // success, so remove from queue
            failedMessageQueue.remove();
            // inform user
            res.send('OK!');
          })
          .catch(() => {
            console.log('resend failure');
            // increment count
            failureTriggerCount++;
            // retry failure protocol
            triggerFailureProtocol();
          });

      } else {

        console.log('resend failed too many times');

        // replace top message with higher priority message
        let prevMsgNode = failedMessageQueue.remove();

        prevMsgNode.priority = 1;

        // gets added to front
        failedMessageQueue.add(prevMsgNode);

        res.status(500).send('Critical Server Error! Failed to send message');

      }

      // // Get first failed message in queue
      // let msg = failedMessageQueue.front();
      //
      // // try to send front message again
      // msgUtils.sendMessage(msg)
      //   .then((message) => {
      //     failedMessageQueue.remove();
      //     res.send('Ok!');
      //   })
      //   .catch((failedMessage) => {
      //     // retry failure protocol
      //     triggerFailureProtocol();
      //   });

    }

  });

module.exports = router;
