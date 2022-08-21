let serverIconIndex = 0

module.exports = {
    switchServerIcon: function(client){
        setInterval(()=>{
            client.guilds.cache.get('814810394912358430').setIcon(`./img/logo_${serverIconIndex+1}.jpg`)
            serverIconIndex = (serverIconIndex + 1) % 15
        },10*1000)
    }
}