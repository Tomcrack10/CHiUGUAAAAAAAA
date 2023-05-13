const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
const client = require("discord.js")
const votosSchema = require("../../Models/votosugs")

module.exports = {
	name: 'sugerir',
	aliases: ['suggest'],
	description: "Sugiere algo",

	async execute (client, message, cmd, args, Discord) {

  let channel = await db.fetch(`sug-${message.guild.id}`)
    if (channel === null) return;
  
  const suggestionQuery = args.join(" ")
  if(!suggestionQuery) return message.reply("Por favor sugiere algo.")
      try {
        if (!message.guild || !message.channel || message.author.bot) return;

        

            message.reply(`Enviado a <#${channel}>`)

            let botones = new Discord.MessageActionRow().addComponents([

                new Discord.MessageButton().setStyle("SECONDARY").setLabel("0").setEmoji("✅").setCustomId("votar_si"),

                new Discord.MessageButton().setStyle("SECONDARY").setLabel("0").setEmoji("❌").setCustomId("votar_no"),

                new Discord.MessageButton().setStyle("PRIMARY").setLabel("¿Quién ha votado?").setEmoji("❓").setCustomId("ver_votos"),
            ])

            let msg = await message.guild.channels.cache.get(channel).send({
                embeds: [
                    new Discord.MessageEmbed()
                        .setAuthor({ name: "Sugerencia de " + message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                        .setDescription(`>>> ${suggestionQuery}`)
                        .addField(`✅ Votos positivos`, "      0 votos            ", true)
                        .addField(`❌ Votos negativos`, "      0 votos            ", true)
			.addField(`:medal: Estado:`, "Pendiente", false)
                        .setColor(client.color)
                        .setFooter({ text: "Quieres sugerir algo? Envia f!suggest {sugerencia}!", iconURL: "https://images.emojiterra.com/google/android-pie/512px/1f4a1.png" })
                ],
                components: [botones]
            })
            let data_msg = new votosSchema({
                messageID: msg.id,
                autor: message.author.id,
            })
            data_msg.save();
            } catch (e) { console.log(e) }	
	       }
	}