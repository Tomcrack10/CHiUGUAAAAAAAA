const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'add-item',
	aliases: ['additm', 'aitem', 'aitm', 'añadir-item'],
	description: "Añade un item a la tienda del servidor",
	usage: ".add-item <item> <precio>",
	cooldown: 2,
	UserPerms: ["ADMINISTRATOR"],
	BotPerms:["MANAGE_MESSAGES"],

	async execute (client, message, cmd, args, Discord) {
	const item = args[0];
        if (!item) return message.channel.send('Especifica el item que quieres añadir');

        const price = args[1];
        if (!price) return message.channel.send('Especifica el precio del item');

	if(isNaN(price)){
		return message.channel.send('El precio debe ser un número');
	}
        const items = await db.fetch(`shop-${message.guild.id}`)
        if (items && items.find(x => x.name.toLowerCase() === item.toLowerCase())) return message.channel.send('Ese item ya existe en la tienda del servidor');

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`Has añadido ${item} a la tienda del servidor por ${price} monedas`);

        message.channel.send({ embeds: [embed]});
        db.push(`shop-${message.guild.id}`, { name: item, price: price });
	}
}
