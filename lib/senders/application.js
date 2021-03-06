var util                  = require('util');
var debug                 = require('debug')('castv2-client');
var Sender                = require('./sender');
var ConnectionController  = require('../controllers/connection');
var MessageController     = require('../controllers/message');

function Application(client, session) {
  var senderId = randomSenderId();
  Sender.call(this, client, senderId, session.transportId);

  this.session = session;

  this.connection = this.createController(ConnectionController);
  this.connection.connect();

  this.message = new MessageController(client, senderId, session.transportId);

  this.connection.on('disconnect', ondisconnect);
  this.on('close', onclose);

  var self = this;

  function ondisconnect() {
    self.emit('close');
  }

  function onclose() {
    self.removeListener('close', onclose);
    self.connection.removeListener('disconnect', ondisconnect);
    self.connection.close();
    self.connection = null;
    self.session = null;
    Sender.prototype.close.call(this);
  }

}

util.inherits(Application, Sender);

Application.prototype.close = function() {
  this.connection.disconnect();
  this.emit('close');
};

function randomSenderId() {
  return 'client-' + Math.floor(Math.random() * 10e5);
}

Application.prototype.sendMessage = function(message, time, type) {
  
  this.message.sendMessage(message, time, type);
};



module.exports = Application;