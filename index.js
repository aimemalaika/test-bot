const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/webhooks', (req, res) => {
  console.log('----------------- GET /wa/webhooks  -------------------');

  const mode = req.query['hub.mode'];
  const challenge = req.query['hub.challenge'];
  const verifyToken = req.query['hub.verify_token'];

  if (mode && verifyToken) {
    if (mode === 'subscribe' && verifyToken === 'f0b4d6d7e0c8b8b') {
      console.log('Webhook verified');
      res.status(200).send(challenge);
    } else {
      console.log('Webhook verification failed');
      res.sendStatus(403);
    }
  }
});

app.post('/webhooks', (req, res) => {
  console.log('----------------- POST /wa/webhooks  -------------------');
  let bodyreq = req.body;
  console.log(JSON.stringify(bodyreq, null, 2));

  console.log('res :>> ', res);

  if (bodyreq.object) {
    if ( bodyreq.entry && bodyreq.entry[0].changes && bodyreq.entry[0].changes[0].value.message 
      && bodyreq.entry[0].changes[0].value.message[0]) {
      console.log('Echo message');
      console.log(res);
      res.sendStatus(200);
    }
  }
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
