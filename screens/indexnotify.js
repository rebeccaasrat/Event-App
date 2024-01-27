// const express = require('express');
// const admin = require('firebase-admin');
// const bodyParser = require('body-parser');

// const app = express();
// const port = process.env.PORT || 3000;

// // Replace with your Firebase credentials
// const serviceAccount = require('./path/to/your/serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://your-firebase-project-id.firebaseio.com',
// });

// app.use(bodyParser.json());

// app.post('/send-notification', (req, res) => {
//   const { token, title, body } = req.body;

//   const message = {
//     notification: {
//       title,
//       body,
//     },
//     token,
//   };

//   admin.messaging().send(message)
//     .then((response) => {
//       console.log('Notification sent successfully:', response);
//       res.status(200).json({ success: true });
//     })
//     .catch((error) => {
//       console.error('Error sending notification:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
