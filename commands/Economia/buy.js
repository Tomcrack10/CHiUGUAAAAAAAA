const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'buy',
	aliases: ['comprar'],
	description: "Compra un item de la tienda",
	usage: ".ping",
	cooldown: 2,
	UserPerms: [""],
	BotPerms:["MANAGE_MESSAGES"],

	async execute (client, message, cmd, args, Discord) {
	const item = args.join(" ");
        if (!item) return message.channel.send('Especifica el item que quieres comprar');

        const items = await db.fetch(`shop-${message.guild.id}`);
        if (!items) return message.channel.send('No hay items en la tienda del servidor');

        const itemInfo = items.find(data => data.name.toLowerCase() === item.toLowerCase());
        if (!itemInfo) return message.channel.send('Ese item no existe en la tienda del servidor');

        const userBalance = await db.fetch(`economy-${message.author.id}-${message.guild.id}.balance`);
        if (userBalance < itemInfo.price) return message.channel.send('No tienes suficiente dinero para comprar ese item');

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`Has comprado ${itemInfo.name} por ${itemInfo.price}$`);

        message.channel.send({ embeds: [embed]});
        db.subtract(`economy-${message.author.id}-${message.guild.id}.balance`, parseInt(itemInfo.price))
        db.push(`inventory-${message.author.id}-${message.guild.id}`, itemInfo.name);
	}
}