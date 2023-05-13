/*const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'buy',
	aliases: ['comprar'],
	description: "Nos muestra el ping actual de Floppa",
	usage: ".ping",
	cooldown: 2,
	UserPerms: [""],
	BotPerms:["MANAGE_MESSAGES"],

	async execute (client, message, cmd, args, Discord) {
        const top10 = await db.startsWith(`money_${message.guild.id}`, { sort: '.data' });
        if (!top10.length) return message.channel.send('No hay usuarios en el top 10');

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(top10.map((data, i) => `**${i + 1}.** <@${data.ID.slice(7)}> - ${data.data} monedas`).join('\n'));

        message.channel.send(embed);
	}
}
*/