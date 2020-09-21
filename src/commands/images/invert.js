module.exports = {
    name: "invert",
    description: "Invert the color of the image!",
    category: "images"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    return require(join(__dirname,'functions','methods'))(bot, msg,'invert',false,false,"png");
}
