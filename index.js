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

  const body = req.body;

  if (body.object === 'page') {
    body.entry.forEach((entry) => {
      const webhookEvent = entry.messaging[0];
      console.log(webhookEvent);

      let data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "250787561924",
        "type": "text",
        "text": {
          "preview_url": false,
          "body": "Message from WhatsApp received"
        }
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://graph.facebook.com/v20.0/353617044511044/messages',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer EAAL87FVcNuYBO3wmVFHZCWQyIfYNNZAFNT0HZCqDoUNytx55hoEK3vfFCIISwV6l11k3Ci0ovmFZA1JWZCU3UyRtyM0XDKNbT1b3cCcz5BhkuPa0ZBjYL3CJOFcGUgAHXZCgPIZAuq20PMuOpMGFwPHbuI3iOpQgpkIcICN74ShujBkzcHt5ZCKHHF7sR60gjsh5zXWSWcqCZAfC8FlE3niZCCf4GxbwpXCFiVy6595l8B0c0WchuOVOwAp'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      

    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
