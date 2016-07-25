const express = require('express')
const Promise = require('bluebird')
const twilio  = require('twilio')
const app     = express()

/* Set up the app preferences. */
app.use( require('body-parser').urlencoded({ 'extended': true }) )
const client = twilio('AC03e3a536e021b967055135bd661eddbc', 'c9c55b4affaf124730f64c16992af455')

/* DB variable. */
var db;

/* Connect to MongoDB. */
const MongoDB = Promise.promisifyAll( require('mongodb') )

/* Start off the database connection. */
const MongoClient = MongoDB.MongoClient;
MongoClient.connectAsync('mongodb://peak-user:littlebylittle@ds023485.mlab.com:23485/messages')
  .then( (database) => {
    db = database
    app.listen(3000, () => {
      console.log('Peak server is now listening on port 3000...')
    })
  })

/* Create some routes. */
app.get('/', (req, res) => {
  res.end('Peak text messaging server version 1.0.')
})

app.post('/sms', (req, res) => {

  // Retrieve the relevant data.
  const data = req.body
  const message = data.Body
  const sender = data.From

  // Log the received text message.
  console.log('Sender: ', sender)
  console.log('Message: ', message)

  const responses = [
    'Awesome goal, David. What could you do daily for 3 minutes or less that would help you get there?',
    'Fantastic. What time of day do you like to be reminded?',
    'Scheduled! You\'re on your way :)',
    'Great work. Way to follow through!'
  ]

  // Check with the database which response we should send.
  let collection = db.collection('metadata')
  let index = 0

  collection.findOneAsync({})
    .then( (doc) => {

      // For testing purposes.
      console.log(doc)

      // Logic for incrementing & looping.
      let currentCount = doc.messages
      doc.messages = (currentCount + 1) % responses.length
      index = doc.messages

      return collection.saveAsync(doc)

    })
    .then( () => {

      // Testing.
      console.log('And we leave with...', index)

      // Respond using Twilio's XML.
      let response = new twilio.TwimlResponse()
      response.message( responses[ index ] )

      // Twilio response code.
      res.writeHead(200, {
        'Content-Type': 'text/xml'
      })
      res.end(response.toString())

    })

})
