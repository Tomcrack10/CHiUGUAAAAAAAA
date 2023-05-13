const Discord = require("discord.js")
const client = require("../index")
const { TextInputComponent, Modal, showModal} = require("discord-modals")
const votosSchema = require("../Models/votosugs")

client.on("interactionCreate", async (interaction, message) => {

	
  if (interaction.isModalSubmit()){
    if (interaction.customId.startsWith( 'CreatedModal-')) {
      const title = interaction.fields.getTextInputValue('TitleInput');
      const description = interaction.fields.getTextInputValue('DescriptionInput');
      let footer = interaction.fields.getTextInputValue('FooterInput');
      color =        interaction.fields.getTextInputValue('ColorInput');
      const info =        interaction.fields.getTextInputValue('InfoInput');
      const info2 = info.split(",")
      const [name, icon] = info2
      const channel = interaction.customId.substring(13)
      const embed = new Discord.MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      if(footer){embed.setFooter(footer)}
      if(color){try {embed.setColor(color)} catch (error) {} }
      const Ochannel = client.channels.cache.get(channel.toString())

	    await interaction.reply("Embed Created")
      Ochannel.createWebhook("Embed Creator", {
        avatar: "https://cdn.discordapp.com/avatars/1016854204532412486/18a29d231c69534f171af895e7f47dd8.png?size=2048",
      })
        .then(async webhook => {    
          await webhook.send({
            username: name,
            avatarURL: icon || "https://cdn.discordapp.com/avatars/1016854204532412486/18a29d231c69534f171af895e7f47dd8.png?size=2048",
            embeds: [embed]
          });
          webhook.delete()
          
        })
        .catch(console.error);
    } 
        
      
    
  }
	if(interaction.isButton()) {
		
    if (interaction.customId.startsWith('CreateModal-')){try{
      const channel = interaction.customId.substring(12)
  		const modal = new Modal()
  			.setCustomId(`CreatedModal-${channel}`)
  			.setTitle('Crea un nuevo Embed');
      
  		const title = new TextInputComponent()
  			.setCustomId('TitleInput')
  			.setLabel("Coloca el nombre del Embed")
  			.setStyle("SHORT")
        .setRequired(true);
  
  		const description = new TextInputComponent()
  			.setCustomId('DescriptionInput')
  			.setLabel("Coloca la descripcion del Embed")
  			.setStyle("LONG")
        .setRequired(true);
  
  		const footer = new TextInputComponent()
  			.setCustomId('FooterInput')
  			.setLabel("Coloca el pie de pagina del Embed")
  			.setStyle("SHORT")
        .setPlaceholder("Optional")
  
  		const color = new TextInputComponent()
  			.setCustomId('ColorInput')
  			.setLabel("Coloca el color del Embed")
  			.setStyle("SHORT")
        .setPlaceholder("Opcional, Color in hex format like #FFFFFF")
  
  		const info = new TextInputComponent()
  			.setCustomId('InfoInput')
  			.setLabel("Coloca informacion sobre el Embed")
  			.setStyle("SHORT")
        .setPlaceholder("Example: Cool username,https://example.com/CoolIcon")
        .setRequired(true)
  
      
  		modal.addComponents(title, description, footer, color, info);
      //https://discordjs.guide/interactions/modals.html#building-and-responding-with-modals

      showModal(modal, {
        client: client,
        interaction: interaction
      }).catch((error)=>{console.log(error)})
    }catch(e){console.log(e)}
    }
    else{

	    await interaction.deferUpdate();
  
  		if(interaction.customId === "tic") {

			if (interaction.guild.channels.cache.find(c => c.topic == interaction.user.id && c.name.includes("ticket"))) return interaction.followUp({ content: `You have already created a ticket!`, ephemeral: true });

  
  			const ticChannel = await interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
  
  
  				type: "GUILD_TEXT",
				topic: `${interaction.user.id}`,
  				permissionOverwrites: [
  					{
  						id: interaction.guild.id,
  						deny: ["VIEW_CHANNEL"],
  					},
  					{
  						id:interaction.user.id,
  						allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS", "ADD_REACTIONS"]
  					},
  					{
  						id:client.user.id,
  						allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS", "ADD_REACTIONS"]
  					},
  				]
  			})
  
  			const embed = new Discord.MessageEmbed()
  			.setColor("RED")
  			.setTitle("Ticket")
  			.setDescription("Hola!\nEl Staff estara lo mas pronto posible, mientras cuentanos sobre tus problemas!\nGracias!")
  			.setTimestamp()
  			.setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
  
  			const ticsuEmbed = new Discord.MessageEmbed()
  			.setColor("RANDOM")
  			.setDescription(`Tu ticket ah sido correctamente creado en: ${ticChannel}`)
  
  			const row = new Discord.MessageActionRow().addComponents(
  
  				new Discord.MessageButton()
  				.setCustomId("del")
  				.setLabel("❌ Borrar Ticket")
  				.setStyle("DANGER"),
  
  				new Discord.MessageButton()
  				.setCustomId("cla")
  				.setLabel("✋ Reclamar Ticket")
  				.setStyle("PRIMARY"),
				 new Discord.MessageButton()
  				.setCustomId("reg")
  				.setLabel("📂 Registro del ticket")
  				.setStyle("DANGER"),
  
  				new Discord.MessageButton()
  				.setCustomId("arc")
  				.setLabel("📂 Cerrar Ticket (Proximamente)")
  				.setStyle("DANGER")
				.setDisabled(true),
				
  				
  			)
  
  
  			try {
  				await ticChannel.send({ content: `Bienvenido ${interaction.user}`, embeds: [embed], components: [row]}).  				then(interaction.followUp({ embeds: [ticsuEmbed], ephemeral: true })).catch(err => console.log(err))
  			}catch(err){
  				console.log(err)
  			}
  		} else if (interaction.customId === 'del') {
  
  			const channel = interaction.channel
  
  			channel.delete()
  		} else if (interaction.customId === 'cla') {
  
  			if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: "No eres un administrador de tickets para reclamarlo!", ephemeral: true })
  
  			const channel = interaction.channel
  
  			channel.send(`${interaction.user} ah reclamado el ticket!`)
  		} else if (interaction.customId === 'arc') {
			try {
			const channel = interaction.channel
		        const member = client.users.cache.get(channel.topic)
                        try {
			channel.permissionOverwrites.edit(member, { VIEW_CHANNEL: false })
			} catch (err) {
				console.log("top")
			}
                        try {
			interaction.channel.edit({ name: `archived-${member.user.username}`})
			} catch (err) {
				console.log("nio")
				message.channel.send("No se ha podido cerrar el ticket debidoa un error.")
			}
			channel.send("EL ticket ah sido cerrado")
				
			} catch(err) {
				interaction.followUp({content: "Un error ah ocurrido! "})
				console.log(err)
			}
		} else if (interaction.customId === 'reg') {
			         const { fetchMessage } = require('tech-tip-cyber')
			        fetchMessage(interaction, 99).then((data) => { // fetchMessage(message, <10>) It Will Fetch 10 Messages From Channel, Can Be Any Number Less Than 100
                                 const file = new Discord.MessageAttachment(data, "registro.html"); // Making Attachment File
                                 interaction.followUp({ files: [file] }); // Send As Attachment
                                 interaction.followUp('Descarga y abre el archivo para ver el registro del ticket');
				})
				}
	    try {

            if (!interaction.guild || !interaction.message || !interaction.user) return;



            let msg_data = await votosSchema.findOne({ messageID: interaction.message.id });

		if(!msg_data) return;
            switch (interaction.customId) {
                case "votar_si": {

                    if (msg_data.si.includes(interaction.user.id)) return interaction.followUp({ content: `Ya has votado SÍ en la sugerencia de <@${msg_data.autor}>`, ephemeral: true});

                    if (msg_data.no.includes(interaction.user.id)) msg_data.no.splice(msg_data.no.indexOf(interaction.user.id), 1)
                    msg_data.si.push(interaction.user.id);
                    msg_data.save();


                    interaction.message.embeds[0].fields[0].value = `${msg_data.si.length} votos`;
                    interaction.message.embeds[0].fields[1].value = `${msg_data.no.length} votos`;


                    interaction.message.components[0].components[0].label = msg_data.si.length.toString();
                    interaction.message.components[0].components[1].label = msg_data.no.length.toString();


                    await interaction.message.edit({ embeds: [interaction.message.embeds[0]], components: [interaction.message.components[0]] });


                }
                    break;

                case "votar_no": {

                    if (msg_data.no.includes(interaction.user.id)) return interaction.followUp({ content: `Ya has votado NO en la sugerencia de <@${msg_data.autor}>` , ephemeral: true});

                    if (msg_data.si.includes(interaction.user.id)) msg_data.si.splice(msg_data.si.indexOf(interaction.user.id), 1)
                    msg_data.no.push(interaction.user.id);
                    msg_data.save();


                    interaction.message.embeds[0].fields[0].value = `      ${msg_data.si.length} votos         `;
                    interaction.message.embeds[0].fields[1].value = `      ${msg_data.no.length} votos           `;


                    interaction.message.components[0].components[0].label = msg_data.si.length.toString();
                    interaction.message.components[0].components[1].label = msg_data.no.length.toString();


                    await interaction.message.edit({ embeds: [interaction.message.embeds[0]], components: [interaction.message.components[0]] });



                }
                    break;
                    
                case "ver_votos": {
                    await interaction.followUp({
                        embeds: [new Discord.MessageEmbed()
                        .setTitle(`Votos de la sugerencia`)
                        .addField(`✅ Votos positivos`, msg_data.si.length >= 1 ? msg_data.si.map(u => `<@${u}>\n`).toString() : "No hay votos", true)
                        .addField(`❌ Votos negativos`, msg_data.no.length >= 1 ? msg_data.no.map(u => `<@${u}>\n`).toString() : "No hay votos", true)
                        .setColor("RANDOM")
                        ],
                        ephemeral: true,
                    })
                }
                    break;

                default:
                    break;
            }
        } catch (e) { console.log(e) }
	    
    }
  }
})