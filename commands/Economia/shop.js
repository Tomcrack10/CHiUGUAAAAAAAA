const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'shop',
	aliases: ['shp'],
	description: "Ve la tienda del servidor y la tienda de Floppa Utilities!",
	usage: ".ping",
	cooldown: 2,
	UserPerms: [""],
	BotPerms:["MANAGE_MESSAGES"],

	async execute (client, message, cmd, args, Discord) {

        let shop = await db.fetch(`shop-${message.guild.id}`);
	if(shop === null && shop === []) {
	const embed1 = new Discord.MessageEmbed()
        .setTitle('Tienda del servidor: ')
	.setDescription("**No hay items en la tienda del servidor**")
	.addField("\u200B", "Tienda de Floppa Utilities")
	.addField(`\u200B`, `:x: - ${message.author.tag} Por el momento la tienda de Floppa Utilities esta vacia...`, false)
	.setColor('RANDOM')
	message.channel.send({embeds: [embed1]})
	return;
	}
         console.log(shop);

        const embed = new Discord.MessageEmbed()
        .setTitle('Tienda del servidor: ')
	.setDescription(shop.map(data => `**${data.name}** - ${data.price}$`).join('\n'))
	.addField("\u200B", "**Tienda de Floppa Utilities**")
	.addField(`\u200B`, `:x: - ${message.author.tag} Por el momento la tienda de Floppa Utilities esta vacia...`, false)
	.setColor('RANDOM')
	.setFooter("Quieres comprar algo? Utiliza f!buy <item>!, y si quieres comprar algo de la tienda de Floppa utilities usa f!fbuy <item>!")
        message.channel.send({ embeds: [embed] });
	}
}