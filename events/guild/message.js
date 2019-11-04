const { RichEmbed, deletable } = require('discord.js')

module.exports = async (bot, msg) => {
    const s_settings = require('../../../s_settings.json')
    const u_settings = require('../../../u_settings.json')
    const { prefix, owner } = require('../../../config.json')
    var color;
    try{
        if (msg.author.id == bot.user.id || msg.channel.type == "dm") return;
        if(s_settings[msg.guild.id]){
            if(s_settings[msg.guild.id].mtechannel){
                if(msg.channel.id == s_settings[msg.guild.id].mtechannel){
                    try{
                        console.log(`${msg.author.username} "${msg.content}" (${msg.author.id}, ${msg.channel.id}, ${msg.guild.id})`);
//                        if(msg.deletable){
                            if(u_settings[msg.member.id]){
                                if(u_settings[msg.member.id].embedcolor){
                                    color = `${u_settings[msg.member.id].embedcolor}`;
                                }
                            }else{
                                color = `${(Math.random()*0xFFFFFF<<0).toString(16)}`;
                            }
                            var embed = new RichEmbed()
                                .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
                                .setDescription(`${msg.content}`)
                                .setImage(msg.attachments.url)
                                .setColor(`#${color}`);
                            msg.delete();
                            msg.channel.send(embed);
                            
//                         }else{console.log("Message is not deletable")}
                    }catch(e){
                        console.log("Error in MTE system (message.js) occurred");
                    }
                }
            }
        }   
    }catch(err){console.log(err)}
    

    if (!msg.content.toLowerCase().startsWith(prefix) || msg.author.bot || msg.channel.type === "dm") return;
    
    let args = msg.content.toLowerCase().split(" ");
    var command = args[0];

    const maxtimes = 100;
    var times = 0;

    while((args[0] == prefix) && (times <= maxtimes)){
        const fix = `${args[0]}${args[1]}`
        args[1] = fix;
        command = fix;
        args = args.slice(1);
    }
    if(times >= maxtimes){
        return
    }

    args = args.slice(1);

    let cmd = bot.commands.get(command.slice(prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(prefix.length)));
    if(cmd){
        console.log(`${command.toUpperCase().slice(prefix.length)}: actived by ${msg.author.username} (${msg.author.id}, ${msg.channel.id}, ${msg.guild.id})`);
        cmd.run(bot, msg, args, owner, prefix);
    }else{
        console.log(`${command.toUpperCase().slice(prefix.length)}: (REJECTED) actived by ${msg.author.username} (${msg.author.id}, ${msg.channel.id}, ${msg.guild.id})`);
        msg.reply("we didn't find the command you were looking for. Sowwy UwU");
    }
}