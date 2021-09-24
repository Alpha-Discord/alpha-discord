const Discord = require('discord.js'),
{ Message } = require('discord.js');
const ActionsManager = require('./actions/ActionsManager');
const ReactionEmoji = Discord.ReactionEmoji;
const AlphaError = require('../errors/create.js');
module.exports = class Client extends Discord.Client {
  constructor(options) {
   super({ intents: options.intents, partials: ["USER", "CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"]})
   if (!options) throw new AlphaError('The value token must not be empty', { method: 'new Client', status: 405 })
   if (!options.token) throw new AlphaError('The value token must not be empty', { method: 'new Client', status: 405 });
   if (!options.prefix) throw new AlphaError('The value prefix must not be empty', { method: 'new Client', status: 405 })
    this.token = options.token;
    this.prefix = options.prefix;
    this.client = this;
    this.actions.newMessage = new ActionsManager(this);
    super.login(this.token);
    require('../services/React.js');
    require('../services/Emojis.js');
    require('../services/Collector.js')
  }

  createThread({message, name, duration=1440}) {
    if (!message) throw new AlphaError(`No message was provided`, {method: 'createThread', status: 404});
    if (!name) throw new AlphaError(`No name was provided`, {method: 'createThread', status: 404})
    this.api.channels(message.channel.id).messages(message.id).threads.post({
      data: {
        name: name,
        auto_archive_duration: duration,
        type: 'GUILD_TEXT'
      }
    })
    return true
  }
}