const AlphaError = require('../errors/create.js');

module.exports = class Thread {
    contructor() {
      this.create = this.create;
    }
    create({
      message=null,
      name=false,
      duration=1440
    }) {
      if (!message) throw new AlphaError(`No message was provided`, {method: 'createThread', status: 404});
    if (!name) throw new AlphaError(`No name was provided`, {method: 'createThread', status: 404})
    this.client.api.channels(message.channel.id).messages(message.id).threads.post({
      data: {
        name: name,
        auto_archive_duration: duration,
        type: 'GUILD_TEXT'
      }
    })
    }
  }