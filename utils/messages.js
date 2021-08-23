const moment = require('moment');

function formatMessage(username, text) {
  return {
    username,
    text,
    // a = am/pm
    time: moment().format('h:mm a') 
  }
}

module.exports = formatMessage;

