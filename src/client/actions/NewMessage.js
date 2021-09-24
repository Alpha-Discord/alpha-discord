const Action = require('./Action.js');
class NewMessage extends Action {
  handle(data) {
    const client = this.client;
    const channel = this.getChannel(data);
    if (channel) {
      const existing = channel.messages.cache.get(data.id);
      if (existing) return { message: existing };
      const message = channel.messages._add(data);
      const user = message.author;
      let member = message.member;
      channel.lastMessageID = data.id;
      if (user) {
        user.lastMessageID = data.id;
        user.lastMessageChannelID = channel.id;
      }
      if (member) {
        member.lastMessageID = data.id;
        member.lastMessageChannelID = channel.id;
      }
      client.emit('newMessage', message);
      return { message };
    }

    return {};
  }
}

module.exports = NewMessage;