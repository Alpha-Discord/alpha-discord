const { Message, Collection } = require('discord.js')

const unicode = require("emoji-unicode-map");

const emojiUnicode = require("emoji-unicode");

Object.defineProperties(Message.prototype, {
    'emojis': {
        get: function getEmojis() {
            this._emojis = new Collection()
            for (let match of this.content.matchAll(/<(a)?:([\w\d]{2,32})+:(\d{17,19})>/g)) {
                const [ ,animated,name,id ] = match
                const emoji = this.client.emojis.cache.get(id) || { 
                    animated: Boolean(animated), id, name, 
                    url: this.client.rest.cdn.Emoji(id, Boolean(animated) ? 'gif' : 'png')
                }
                this._emojis.set(emoji.id, emoji)
            }
            if (this._emojis.size < 1) {
              const emojis = (this.content.split(" "))
            .filter(arg => unicode.get(arg));
            if (emojis) {
              emojis.forEach(emojo => {
                this._emojis.set(emojo, {
                  unicode: emojiUnicode(emojo)
                })
              })
            }
            }
            return this._emojis
        }
    }
})