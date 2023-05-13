const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'poll',
	aliases: ['encuesta'],
	description: "Crea una nueva encuesta!",
	usage: ".poll <encuesta>",
	cooldown: 2,
	UserPerms: ["MANAGE_CHANNELS"],
	BotPerms:["MANAGE_MESSAGES"],

	async execute (client, message, cmd, args, Discord) {

		    let pollChannel = message.mentions.channels.first() 
                  if(!pollChannel) return message.channel.send('Menciona un canal para enviar la encuesta!'); 
    
                 let polldescription = args.slice(1).join(' ');
                if (!polldescription) return message.channel.send('Por favor incluye una descripcion') 
    
                 let embedPoll = new Discord.MessageEmbed()
                 .setTitle('😮 Nueva encuesta 😮') 
                .setDescription(polldescription)
                 .setColor('YELLOW') 
                  let msgEmbed = await pollChannel.send({ embeds: [embedPoll] }); 
    
                 await msgEmbed.react('👍') 
                  await msgEmbed.react('👎')
	}
}