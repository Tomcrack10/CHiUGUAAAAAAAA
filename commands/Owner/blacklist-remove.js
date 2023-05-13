const blacklist = require('../../Models/blacklist')

const { Message } = require('discord.js')
//ok
module.exports = {
    name : 'blacklist-remove',
    description: "Remueve a un usuario a la blacklist",
    async execute(client, message, args) {
        if(message.author.id !== '650333757525458966' && message.author.id !== '590606524682993751') return message.channel.send(':x: Este comando solo lo puede usar mi owner')
        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLocaleLowerCase())
        if(!User) return message.channel.send('Usuario no valido.')

        blacklist.findOne({ id : User.user.id }, async(err, data) => {
		if(err) throw err;
              if(data) {
               await blacklist.findOneAndDelete({ id : User.user.id })
                .catch(err => console.log(err))
                message.reply(`**${User.displayName}** Ha sido removido de la blacklist`)
            } else {
               message.channel.send(`**${User.displayName}** no esta en la blacklist.`)
            }
           
        })
    }
}