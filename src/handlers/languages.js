const { readdirSync, lstatSync } = require("fs");
const { join, basename } = require('path');

module.exports = (bot) => {
    const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(source => lstatSync(source).isDirectory()).map(f => basename(f));
    const getFiles = source => readdirSync(source).map(name => join(source, name)).filter(source => !lstatSync(source).isDirectory()).map(f => basename(f));

    function loadFolders(path = []){
        const currPath = join(process.cwd(),...path);
        const stringPath = path.slice(1).join('\\') || path[0];

        const files = getFiles(currPath);

        if(files.includes('.ignoreall')) return;

        if(!files.includes('.ignorefiles')){
            files.filter(d => d.match(bot.supportedFiles))
            .forEach(file => {
                try{
                    (bot.require||require)(join(currPath,file))();
                    (bot.log||console.log)(`${stringPath.padEnd(32,' ')}|${' '.repeat(8)}${file}`.debug);
                }catch(err){
                    (bot.log||console.log)(`${stringPath.padEnd(32,' ')}|${' '.repeat(8)}${file} ERROR!`.error);
                    (bot.log||console.log)(err.message.error);
                }
            })
        }

        if(!files.includes('.ignoredirs')){
            getDirectories(currPath)
            .forEach(dir => {
                try{
                    loadFolders([...path,dir]);
                }catch(err){
                    (bot.log||console.log)(`ERROR WHILE LOADING ${stringPath+"\\"+dir} FOLDER!`.error);
                    (bot.log||console.log)(String(err).error);
                }
            })
        }
    }
    loadFolders(['languages']);

    bot.supportedFiles = new RegExp("("+Object.keys(require.extensions).join('|')+")$");
}
