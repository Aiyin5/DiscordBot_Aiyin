
module.exports = {
    name: 'guildMemberAdd',
    async execute(guildmember, client,chatBot) {
        console.log(guildmember);
        let user=guildmember.user.username;
        //await guildmember.send(`hello,\`${user}\``)
    },
};