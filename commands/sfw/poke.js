module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')('poke', msg);
}

module.exports.config = {
    name: "poke",
	description: "Gives you a poke!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}