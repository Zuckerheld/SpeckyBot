module.exports = {
    name: "ero",
	description: "Gives you erotic images!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: ["erotic"]
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')(["holoEro","eroFeet","ero","eroKitsune","eroKemonomimi","eroNeko","eroYuri"].pick(),msg);
}
