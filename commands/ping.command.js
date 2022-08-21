module.exports = {
    name: "ping",
    alias : ["ping","p"],
    clearCommand: false,
    roleRequirement: [],
    channelRequirement: [],
    execute: function(message,arg){
        message.channel.send("หวัดดี")
        return 0
    }
}