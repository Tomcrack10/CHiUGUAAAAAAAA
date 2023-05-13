const fetch = require("node-fetch")
const client = require("../index")
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const quickmongo = new Database(mongourl)
const token = process.env['cbtoken']
const traductor = require('@iamtraction/google-translate');



client.on("messageCreate", async(message) => {

	if(message.author.bot || !message.guild) return

	const channell = await quickmongo.fetch(`chatbot-${message.guild.id}`)
           traductor(message, {
         to: "en"
         }).then(res => {
         const mensaje =  res.text
		   	if(message.channel.id === channell) {
	  fetch(`https://api.popcat.xyz/chatbot?msg=${mensaje}&owner=Tom&botname=Floppa`, {
            }).then(response => response.json())
            .then(data => {
		    fetch(`https://api.popcat.xyz/translate?to=es&text=${data.response}`, {
		    }).then(translated => translated.json())
		    .then(data => {
			    message.reply(data.translated)
		    })
		    
        
	    }).catch(err => {
		  message.reply("No se pudo obtener respuesta")
	    })
	   }


		//chatbot.obtener(`${message}`).then(respuesta => {
          //    message.reply(respuesta) //respuesta al texto
          //    }).catch(err => {
            //  console.log(err) //Solo saltara si hay un error mandando el error a la consola
           //  })
	})
})
