const express = require('express');
const app = express();

/* Set up the app preferences. */
app.use( express.urlencoded() );

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
  res.send('Hello world!');
})

app.post('/sms', (req, res) => {
  console.log('We\'ve received a text: ', req.body);
})
