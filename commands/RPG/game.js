const map1 = require("./Mapas/main.json")
const model = require("../../Models/rpg")
module.exports = {
	name: 'rpg',
	aliases: [],
	description: "Juega el Floppa RPG",
	usage: ".rpg",
	cooldown: 10,
	BotPerms:["MANAGE_MESSAGES"],

  async	execute(client, message, cmd, args, Discord) {
    try{
    const userV = await model.findOne({user: message.author.id})
    if(!userV) return message.reply('No estás registrado en el Floppa RPG, inicia tu aventura con el comando "rpg-start"')
    function Convertir (text){
      if(text=="green") return "<:verde:1024743490816589895>"
      if(text=="darkgreen") return "<:Verde2:1024743501247828039>"
      if(text=="gris") return "<:gris1:1023705840038973520>"
    }
    function ConvertirInv (text){
      if(text=="null") return "<:null:1024821259479040110>"
    }
    function Texto (Lista){
      let texto = `${Lista[0]}`
      Lista.shift()
      Lista.forEach(element => {
        texto = texto + `${element}`
      })
      return texto
    }
    function Texto2 (Lista){
      let texto = `${Lista[0]}`
      Lista.shift()
      Lista.forEach(element => {
        texto = texto + `\n${element}`
      })
      return texto
    }
    async function itemBar() {
      const userBar = await model.findOne({user:message.author.id})
      barra = userBar.items_barra
      for (let i = 0; i < barra.length; i++) {
        if(barra[i]=="null"){barra.splice(i,1,"<:null:1024821259479040110>")}
      }
      let texto = `[${barra[0]}]`
      barra.shift()
      barra.forEach(element => {
        texto = texto + ` [${element}]`
      })
      return texto
    }
    async function Renderizar(){
      const user = await model.findOne({user: message.author.id})
      const Render = []
      positionX = user.positionX
      positionY = user.positionY
      
      minIndexX = positionX - 7
      maxIndexX = positionX + 8
      minIndexY = positionY - 4
      maxIndexY = positionY + 5

      if(minIndexX == -1){++minIndexX;++maxIndexX
        await model.findOneAndUpdate({user:message.author.id},{positionX: ++positionX})}
      if(maxIndexX == 41){--minIndexX;--maxIndexX
        await model.findOneAndUpdate({user:message.author.id},{positionX: --positionX})}
      if(minIndexY == 0){++minIndexY;++maxIndexY
        await model.findOneAndUpdate({user:message.author.id},{positionY: ++positionY})}
      if(maxIndexY == 31){--minIndexY;--maxIndexY
        await model.findOneAndUpdate({user:message.author.id},{positionY: --positionY})}
  
      for(i = minIndexY; i < maxIndexY; i++){
        fila = map1[`${i}`]
        indexX = []
        
        for(In = minIndexX; In < maxIndexX; In++){
          if(i == positionY && In == positionX){
            indexX.push("<:el_prota:1024815627560554557>")
          } else{
            indexX.push(Convertir(fila[In]))
          }
        }
        Render.push(Texto(indexX))
      }
      return Texto2(Render)
    }  
    async function RenderizarInv(type,inv){
      if(type==1){inventario = inv.items;filas = 4}
      else if(type==2){inventario = inv.herramientas;filas = 2}
      else if(type==3){inventario = inv.armaduras;filas = 1}
      else{console.log("algo pasó al pasar el dato de tipo de inventario");inventario = inv.items;filas = 4}
      Render = []
      for(i = 0; i < filas; i++){
        const i2 = i*5
        fila = [inventario[`${i2+1}`].nombre,inventario[`${i2+2}`].nombre,inventario[`${i2+3}`].nombre,inventario[`${i2+4}`].nombre,inventario[`${i2+5}`].nombre]
        indexX = []
        
        for(In = 0; In < 5; In++){
          indexX.push(ConvertirInv(fila[In]))
        }
        Render.push(Texto(indexX))
      }
      return Texto2(Render)
    }
    
    async function Load (m, filter){
      m.awaitReactions({ filter,max: 1, time: 120000, errors: ['time'] }).then(async collected =>{
        const userO = await model.findOne({user: message.author.id})
        collected2 = collected.first()
        const emoji = collected2["_emoji"].name
        if (emoji === '⬆️'){
        const Auser = await model.findOneAndUpdate({user: message.author.id},{positionY:userO.positionY-1})
        } 
        if (emoji === '⬇️'){
        const Auser = await model.findOneAndUpdate({user: message.author.id},{positionY:userO.positionY+1})
        }
        if (emoji === '⬅️'){
        const Auser = await model.findOneAndUpdate({user: message.author.id},{positionX:userO.positionX-1})
        } 
        if (emoji === '➡️'){
        const Auser = await model.findOneAndUpdate({user: message.author.id},{positionX:userO.positionX+1})
        }
        if (emoji === '🎒'){
          const IuserO2 = await model.findOne({user: message.author.id})
          
          const InvEmbed = new Discord.MessageEmbed()
          .setTitle("Inventario")
          .addFields(
        		{ name: 'Items', value: await RenderizarInv(1,IuserO2).catch((error) => {console.log(error)}) },
        		{ name: 'Herramientas', value: await RenderizarInv(2,IuserO2).catch((error) => {console.log(error)}) },
        		{ name: 'Armaduras', value: await RenderizarInv(3,IuserO2).catch((error) => {console.log(error)}) },
        	)
          message.reply({ embeds: [InvEmbed] })
         
        }
        const userReactions = m.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
        for (const reaction of userReactions.values()) {
          await reaction.users.remove(message.author.id);
        }
        const newEmbed = new Discord.MessageEmbed()
        .setTitle(await itemBar())
        .setDescription(await Renderizar())
        m.edit({embeds:[newEmbed]})
        await Load(m, filter)
      }).catch((error) => {console.log(error) })
    
    }
    const embed = new Discord.MessageEmbed()
      .setTitle(await itemBar())
      .setDescription(await Renderizar())
      message.reply({ embeds:[embed] }).then(async m => {
        await m.react('⬅️')
        await m.react('⬆️')
        await m.react('⬇️')
        await m.react('➡️')
        await m.react('🎒')
        const filter = (reaction, user) => {
    	    return ['⬅️', '⬇️', '⬆️', '➡️', '🎒'].includes(reaction.emoji.name) && user.id == message.author.id
        }
        await Load(m, filter).catch((error) => { console.log(error) })
      })
    }catch(e){console.log(e)} 
  }
}