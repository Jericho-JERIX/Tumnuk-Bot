const {Client,Intents,MessageButton,MessageActionRow, Message} = require('discord.js')
const {getAllCommands,getAllInteractions} = require('./utils/generate')
const fs = require('fs')

const dotenv = require('dotenv')
const LoginEvent = require('./modules/LoginEvent')
dotenv.config()

const PREFIX = "-"
const Command = getAllCommands()
const Interaction = getAllInteractions()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ]
})

client.on('ready',async (test)=>{
    console.log("Mint-Tutor Bot Online!")
    // LoginEvent.setPresence(client)
})
client.login(process.env.TOKEN)

//TODO--- User Command ---

client.on('messageCreate',(message)=>{
    let arg = message.content.split(' ')
    if(arg[0].slice(0,PREFIX.length) == PREFIX){
        let command = arg[0].slice(PREFIX.length)
        let result = -1
        for(var i in Command){
            if(Command[i].name == command || Command[i].alias.includes(command)){
                
                if(Command[i].clearCommand){
                    message.channel.bulkDelete(parseInt(1))
                }

                if(Command[i].roleRequirement != 0 && Command[i].roleRequirement.filter((value) => message.member._roles.includes(value)).length == 0){
                    result = 2
                }
                else if(Command[i].channelRequirement.length != 0 && !Command[i].channelRequirement.includes(message.channelId)){
                    result = 3
                }
                else{
                    result = Command[i].execute(message,arg)
                }
                break
            }
        }

        /* Command Result / Special Execute
           -1 - No Command Found
            0 - Success
            1 - Error(Bad Input)
            2 - Permission Required
            3 - Restrict Channel
        */

        if     (result == -1 || result == 0) {}
        else if(result == 1) message.channel.send("Something went Wrong! Please try again")
        else if(result == 2) message.channel.send("You need Permission!")
        else if(result == 3) message.channel.send("That command cannot be use in this channel!")
    }
})

// Active Interaction(Button)
client.on('interactionCreate',async (interact)=>{
    if(interact.isButton()){
        var arg = interact.customId.split('-')
        Interaction[arg[0]].execute(interact,arg)
    }
})