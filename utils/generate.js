const fs = require('fs')

/* module.exports */ const x = {
    getAllCommands: function(){
        const CommandList = fs.readdirSync('commands')
        var Command = {}
    
        for(var i in CommandList){
            Command[CommandList[i].split('.')[0]] = require(`../commands/${CommandList[i].slice(0,-3)}`)
        }
        return Command
    },
    getAllInteractions: function(){
        const InteractionList = fs.readdirSync('interactions')
        var Interaction = {}
    
        for(var i in InteractionList){
            Interaction[InteractionList[i].split('.')[0]] = require(`../interactions/${InteractionList[i].slice(0,-3)}`)
        }
        return Interaction
    }
}