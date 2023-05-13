const chalk = import(`chalk`)
const { MessageSelectMenu, MessageActionRow } = require(`discord.js`)
const client = require("../index")

const create_mh = (array) => {

	if(!array) throw new Error(chalk.red.bold(`The options were not provided! Make sure your provide all the options!`))
	if(array.lenght < 0) throw new Error(chalk.red.bold(`The Array has to have atleast one thing to select`))
	let select_menu

	let id = `help-menus`
	let menus = []

	//Getting Emojis
	const emojiA = "💾"
	const emojiB = "💾"
	const emojiC = "💾"
	const emojiD = "💾"
	const emojiE = "💾"
	const emojiF = "💾"
	const emojiG = "💾"
	const emojiH = "💾"
	const emojiI = "💾"
	const emojiJ = "💾"
	const emojiK = "💾"
	const emojiL = "💾"

	const emo = {

		Community: `${emojiA}`,
		Information: `${emojiC}`,
		Moderation: `${emojiB}`,
		Utility: `${emojiE}`,
		Owner: `${emojiK}`,
		Games: `${emojiH}`,
		
	}

	array.forEach(cca => {
		let name = cca
		let sName = `${name.toUpperCase()}`
		let tName = name.toLowerCase()
		let fName = name.toUpperCase()

		return menus.push({
			label: sName,
			description: `Comandos de la categoria ${tName}`,
			value: fName
		})
	})

	let chicken = new MessageSelectMenu()
	.setCustomId(id)
	.setPlaceholder(`Escoje la categoria de comando!`)
	.addOptions(menus)
	select_menu = new MessageActionRow()
	.addComponents(
		chicken
	)
	return {
		smenu: [select_menu],
		sid: id
	}
}
module.exports = create_mh