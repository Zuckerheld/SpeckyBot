module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')('hug', msg);
}

module.exports.config = {
    name: "hug",
	description: "Gives you a hug!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}
