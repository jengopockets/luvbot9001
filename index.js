const chat = require('./chatFunctions')
const channelName = process.env.CHANNEL
require('dotenv').config()
chat.connectChat(channelName, "LuvBot")
