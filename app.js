const express = require('express')
const app = express()

/* Set up the app preferences. */
app.use( require('body-parser').urlencoded({ 'extended': true }) )
const client = require('twilio')('AC03e3a536e021b967055135bd661eddbc', 'c9c55b4affaf124730f64c16992af455')

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
  console.log('Sender: ', sender)
  console.log('Message: ', message)

  const responses = [
    'Great work. Absolutely massive!',
    'You can do it! You\'ll be proud after you\'ve finished!',
    'Morning, David! Take 3 minutes to complete your activity: stretching.',
    'Today is the best day for massive action! (3 minutes of stretching).'
  ]

  client.sendMessage({

      to: '+16507141506', // Any number Twilio can deliver to
      from: '+16506141866', // A number you bought from Twilio and can use for outbound communication
      body: responses[ Math.floor(Math.random() * 4) ] // body of the SMS message

  }, function(err, responseData) { //this function is executed when a response is received from Twilio

      if (!err) { // "err" is an error received during the request, if any

          console.log(responseData.from); // outputs "+14506667788"
          console.log(responseData.body); // outputs "word to your mother."

      } else {

        res.send({
          message: "Thanks, your message has been received!"
        })

      }
  });

})
