module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    const notAlphaNumRegEx = /[^A-Za-z0-9\s]+/g
    const LettersRegEx = /[A-Za-z\s]+/g
    const numbersRegEx = /[0-9]+/g

    if(msg.channel.topicSetting('no-mixed-chars')){
        const matches1= msg.content.match(notAlphaNumRegEx);
        const matches2= msg.content.match(LettersRegEx);
        const matches3= msg.content.match(numbersRegEx);

        const result = Number(Boolean(matches1))+Number(Boolean(matches2))+Number(Boolean(matches3))

        if(result > 1){
            msg.delete().catch(()=>{});
        }
    }
}