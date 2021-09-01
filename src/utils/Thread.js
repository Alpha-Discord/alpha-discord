const AlphaError = require('../errors/create.js');

module.exports = class Thread {
    contructor(options) {
      this.message = options.message;
      this.name = options.name;
      this.duration = options.duration || 1440;
      function createThread() {
    if (!this.message) throw new AlphaError(`No message was provided`, {method: 'createThread', status: 404});
    if (!this.name) throw new AlphaError(`No name was provided`, {method: 'createThread', status: 404})
    this.client.api.channels(this.message.channel.id).messages(this.message.id).threads.post({
      data: {
        name: this.name,
        auto_archive_duration: duration,
        type: 'GUILD_TEXT'
      }
    })
    return true
  }

  
    }
  }