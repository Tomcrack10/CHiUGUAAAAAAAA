const blacklist = require('../../Models/blacklist')

const { Message } = require('discord.js')
//ok
module.exports = {
    name : 'blacklist-add',
    description: "Añade un usuario a la blacklist",
     async execute(client, message, args) {
	 if(message.author.id !== '650333757525458966' && message.author.id !== '590606524682993751') return message.channel.send(':x: Este comando solo lo puede usar mi owner')

        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || client.users.cache.get(args[0])
        if(!User) return message.channel.send('Usuario no valido.')

        blacklist.findOne({ id : User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.channel.send(`:x: **${User.user.tag}** has already been blacklisted!`)
            } else {
                data = new blacklist({ id : User.user.id })
                data.save()
                .catch(err => console.log(err))
            message.channel.send(`${User.user.tag} has been added to blacklist.`)
            }
           
        })
    }
}