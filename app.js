const express = require('express')
const app = express()

/* Set up the app preferences. */
app.use( require('body-parser').urlencoded({ 'extended': true }) )

/* DB variable. */
var db;

/* Connect to MongoDB. */
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://peak-user:littlebylittle@ds023485.mlab.com:23485/messages', (err, database) => {
        if (err) return console.log(err)
        db = database
        app.listen(3000, () => {
                console.log('Peak server is now listening on port 3000...')
        })
})

/* Create some routes. */
app.get('/', (req, res) => {
  res.send('Peak text messaging server version 1.0.')
})

app.post('/sms', (req, res) => {

  const data = req.body
  const message = data.Body
  const sender = data.From

  console.log('We\'ve received a text...')
  console.log('It\'s from: ', sender)
  console.log('Message: ', message)

})
