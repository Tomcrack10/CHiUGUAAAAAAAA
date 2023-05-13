const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'deny',
	aliases: ['rechazar'],
	description: "Recahaza una sugerencia",

	async execute (client, message, cmd, args, Discord) {


	let channel = await db.fetch(`sug-${message.guild.id}`);

        if (channel === null) return message.channel.send('No se ha establecido ningun canal de sugerencias, por favor establecelo!');

        if (channel === null) return;

        const rgx = /^(?:<@!?)?(\d+)>?$/;
        const messageID = args[0];
        const replyQuery = args.slice(1).join(' ') || 'No se ha dado razon';



        const number = new MessageEmbed()
            .setDescription(`Por favor da la id valida de un mensaje.`)
            .setColor('FF2052')

        const id = new MessageEmbed()
            .setDescription('Te olvidaste de especificar la id de un mensaje.')
            .setColor('FF2052')

    const query = new MessageEmbed()
            .setDescription(`Olvidaste especificar una razon.`)
            .setColor('FF2052')

        const reply = new MessageEmbed()
            .setDescription(`Se ah aceptado correctamente la sugerencia.`)
            .setColor('00FFFF')

        const noChannel = new MessageEmbed()
            .setDescription(`No se ha encontrado canal de sugerencia.`)
            .setColor('FF2052')

        const noMessage = new MessageEmbed()
            .setDescription(`No pude encontrar ningun mensaje con esa id.`)
            .setColor('FF2052')

        if (!messageID) return message.reply({ embeds: [id] });
        if (!rgx.test(messageID)) return message.reply({ embeds: [number] });//ahora a buscar una imagen del tablero
        if (!replyQuery) return message.reply({ embeds: [query] })//xd epico //ok //El original es de 2-8 tal vez 4 estaria bien
        try {

            const suggestionChannel = message.guild.channels.cache.get(channel)
            if (!suggestionChannel) return message.reply({ embeds: [nochannel] })

            const suggestedEmbed = await suggestionChannel.messages.fetch(messageID).catch(error => {
                const noMessage = new MessageEmbed()
                    .setDescription(`No pude encontrar ningun mensaje con esa id`)
                    .setColor('FF2052')
                return message.reply({ embeds: [noMessage] });
            })


	    const data = suggestedEmbed.embeds[0];
	    suggestedEmbed.embeds[0].fields[2].value = `Rechazado - ${replyQuery}`;
	    suggestedEmbed.embeds[0].color = "RED";



            suggestedEmbed.edit({ embeds: [suggestedEmbed.embeds[0]] });
  		message.reply(":white_check_mark: Se ha denegado la sugerencia correctamente.")
            const user = await client.users.cache.find((u) => u.tag === data.author.id)

            const embed = new MessageEmbed()
                .setDescription(`Tu [sugerencia](https://discord.com/channels/${message.guild.id}/${channel}/${messageID}) ha sido rechazada.`)
                .setColor('GREEN')
          //  user.send({ embeds: [embed] })

        } catch (err) {
            console.log(err);
            return;
        }
	       }
	}