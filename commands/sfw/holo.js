module.exports = {
    name: "holo",
	description: "Gives you a holo!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ['kemo']
}

module.exports.run = async (bot, msg) => {
    if(require('./functions/nsfw')(msg)){
        //SFW
        require('./functions/img')('holo', msg)
    }else{
        //NSFW
        require('../nsfw/functions/img')(["holo","holoEro"].pick(), msg);
    }
}

