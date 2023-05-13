const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'remove-item',
	aliases: ['rmvitm', 'ritem', 'ritm', 'remover-item'],
	description: "Remueve un item de la tienda del servidor!",
	usage: ".add-item <precio> item",
	cooldown: 2,
	UserPerms: ["ADMINISTRATOR"],
	BotPerms:["MANAGE_MESSAGES"],

	async execute (client, message, cmd, args, Discord) {
	const item = args.join(" ");
        if (!item) return message.channel.send('Especifica el item que quieres eliminar');

        const items = await db.fetch(`shop-${message.guild.id}`);
        if (!items) return message.channel.send('No hay items en la tienda del servidor');

        const itemInfo = items.find(data => data.name.toLowerCase() === item.toLowerCase());
        if (!itemInfo) return message.channel.send('Ese item no existe en la tienda del servidor');

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`Has eliminado ${itemInfo.name} de la tienda del servidor`);

        message.channel.send({embeds: [embed]});
        const newItems = items.filter(data => data.name.toLowerCase() !== item.toLowerCase());
        db.set(`shop-${message.guild.id}`, newItems);
	}
}
