var util        = require('util');
var debug       = require('debug')('castv2-client');
var Application = require('./application');
var MediaController = require('../controllers/media');

function CustomMediaReceiver(client, session) {
  Application.apply(this, arguments);

  this.media = this.createController(MediaController);

  this.media.on('status', onstatus);

  var self = this;

  function onstatus(status) {
    self.emit('status', status);
  }

}

CustomMediaReceiver.APP_ID = '3D297B69';

util.inherits(CustomMediaReceiver, Application);

CustomMediaReceiver.prototype.getStatus = function(callback) {
  this.media.getStatus.apply(this.media, arguments);
};

CustomMediaReceiver.prototype.load = function(media, options, callback) {
  this.media.load.apply(this.media, arguments);
};

CustomMediaReceiver.prototype.play = function(callback) {
  this.media.play.apply(this.media, arguments);
};

CustomMediaReceiver.prototype.pause = function(callback) {
  this.media.pause.apply(this.media, arguments);
};

CustomMediaReceiver.prototype.stop = function(callback) {
  this.media.stop.apply(this.media, arguments);
};

CustomMediaReceiver.prototype.seek = function(currentTime, callback) {
  this.media.seek.apply(this.media, arguments);
};

CustomMediaReceiver.prototype.queueLoad = function(items, options, callback) {
  this.media.queueLoad.apply(this.media, arguments);
};

CustomMediaReceiver.prototype.queueInsert = function(items, options, callback) {
  this.media.queueInsert.apply(this.media, arguments);
};

CustomMediaReceiver.prototype.queueRemove = function(itemIds, options, callback) {
  this.media.queueRemove.apply(this.media, arguments);
};

CustomMediaReceiver.prototype.queueReorder = function(itemIds, options, callback) {
  this.media.queueReorder.apply(this.media, arguments);
};

CustomMediaReceiver.prototype.queueUpdate = function(items, callback) {
  this.media.queueUpdate.apply(this.media, arguments);
};

module.exports = CustomMediaReceiver;
