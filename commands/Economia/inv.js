const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'inv',
	aliases: ['inventory', 'inventario'],
	description: "Ve tu inventario de items",
	usage: ".ping",
	cooldown: 2,
	UserPerms: [""],
	BotPerms:["MANAGE_MESSAGES"],

	async execute (client, message, cmd, args, Discord) {
	const user = message.mentions.users.first() || message.author
	const items = await db.fetch(`inventory-${user.id}-${message.guild.id}`);
        if (items === null) return message.channel.send('No tiene items en el inventario');

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
	     .setTitle(`**Inventario de ${user.username}:**`)
            .setDescription(items.map(data => `**${data}**`).join('\n'));

        message.channel.send({ embeds: [embed]});
	}
}