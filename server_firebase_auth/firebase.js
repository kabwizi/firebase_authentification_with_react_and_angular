var admin = require('firebase-admin')
require('dotenv').config()

/*
You can find the steps to complete this step on this link:
https://firebase.google.com/docs/reference/admin/node/admin.credential

Don't forget to install the firebase
npm install firebase-admin --save
*/

var app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY
  })
})

module.exports = app
