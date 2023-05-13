const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'jumbo',
	aliases: ['jb'],
	description: "Nos muestra el ping actual de Floppa",
	usage: ".ping",
	cooldown: 2,
	UserPerms: [""],
	BotPerms:["MANAGE_MESSAGES"],

	async execute (client, message, cmd, args, Discord) {
	const emoji =  args[0]
        const emojiRegex = /<a?:\w+:\d+>/g;
        if (!emojiRegex.test(emoji)) return msg.reply('Eso no es un emoji valido');
        const emojiId = emoji.match(/\d+/g)[0];
        const embed = new MessageEmbed()
	    .setTitle("Emoji")
            .setImage(`https://cdn.discordapp.com/emojis/${emojiId}.png`)
            .setColor(0x00AE86);
        return message.reply({embeds: [embed]});
	}
}
