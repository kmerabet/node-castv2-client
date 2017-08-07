var util            = require('util');
var debug           = require('debug')('castv2-client');
var JsonController  = require('./json');

function MessageController(client, sourceId, destinationId) {
  JsonController.call(this, client, sourceId, destinationId, 'urn:x-cast:com.sii.cast.messaging');
}

util.inherits(MessageController, JsonController);

MessageController.prototype.sendMessage = function(message, time, type) {
  this.send({ type: type, time: time, text: message});
};


module.exports = MessageController;