const instance = require("../util/caInstance");
module.exports = {
    name: 'guildMemberAdd',
    async execute(guildmember, client) {
        //console.log(guildmember);
        let user=guildmember.user.username;
        let id=guildmember.id;
        //await guildmember.send(`hello,\`${user}\``)
       await client.users.send(id,instance.getBotInfo().info);
    },
};