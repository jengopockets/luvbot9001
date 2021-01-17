const tmi = require('tmi.js');
require('dotenv').config()

const channelName = process.env.CHANNEL
const options = {
    options: {
        debug: true,
    },
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        username: process.env.USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels:[channelName]
};

const client = new tmi.client(options);


client.connect();

client.on('connected', (address, port) => {
    client.action(channelName, 'Stumbled in...')
});