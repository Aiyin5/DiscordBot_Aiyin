const instance = require("../util/caInstance");
module.exports = {
    name: 'guildMemberAdd',
    async execute(guildmember, client,chatBot) {
        //console.log(guildmember);
        let user=guildmember.user.username;
        let id=guildmember.id;
        //await guildmember.send(`hello,\`${user}\``)
        try {
            await client.users.send(id,instance.getBotInfo().info);
        }
        catch (err){
            console.log(err);
        }

    },
};