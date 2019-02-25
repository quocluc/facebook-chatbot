var express = require('express');
var router = express.Router();

/* GET Webhook to verify this webhook. */
router.get('/', function (req, res, next) {
    const VERIFY_TOKEN = "123456789";
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    if (mode && token) {
        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});
/* POST Webhook */
router.post('/', function (req, res, next) {
    // Parse the request body from the POST
    let body = req.body;
    //console.log(util.inspect(body, false, null, true ));
    // Check the webhook event is from a Page subscription
    if (body.object === "page") {

        body.entry.forEach(function (entry) {

            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            // console.log(webhook_event);
            // console.log(webhook_event.message.nlp.entities.datetime);


            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            // console.log('Sender ID: ' + sender_psid);
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }
        });
        // Return a '200 OK' response to all events
        res.status(200).send("EVENT_RECEIVED");
    } else {
        res.sendStatus(404);
    }
});

function handleMessage(sender_psid, received_message) {
    let response;
    if (received_message.text) {
     
      try {
        // response = { "text": received_message.nlp.entities.datetime[0].value };
        controller.NLPController(received_message.nlp.entities, sender_psid);
      } catch (e) {
        // console.log("Your log here");
        // console.error(e);
        // console.log("Your log end here");
      }
  
      // console.log("Tin nhan duoc");
      // console.log(received_message.text)
    } else if (received_message.attachments) {
      let attachment_url = received_message.attachments[0].payload.url;
      response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "Is this the right picture?",
              "subtitle": "Tap a button to answer.",
              "image_url": attachment_url,
              "buttons": [
                {
                  "type": "postback",
                  "title": "Yes!",
                  "payload": "yes"
                },
                {
                  "type": "postback",
                  "title": "No!",
                  "payload": "no"
                }
              ]
            }]
          }
        }
      };
    }
    // callSendAPI(sender_psid, response);
  }

module.exports = router;