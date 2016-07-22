const twilio  = require('twilio')
const client = twilio('AC03e3a536e021b967055135bd661eddbc', 'c9c55b4affaf124730f64c16992af455')

client.sendMessage({

    to: '+16507141506',
    from: '+16506141866',
    body: 'Good morning, David! What\'s your biggest goal right now?'

}, function(err, responseData) {

    if (!err) {
        console.log(responseData.from)
        console.log(responseData.body)
    }

});
