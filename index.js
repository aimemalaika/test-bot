const express = require('express');
const app = express();
const port = 3000;

app.get('/wa/webhooks', (req, res) => {
  console.log('----------------- GET /wa/webhooks  -------------------');
  const verificationToken = req.query.verificationToken;
  const token = 'f0b4d6d7e0c8b8b';
  res.status(200).json({ message: 'Webhook GET endpoint' });
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
