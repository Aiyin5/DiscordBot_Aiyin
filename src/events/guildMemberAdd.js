
module.exports = {
    name: 'guildMemberAdd',
    async execute(guildmember, client) {
        console.log(guildmember);
        let user=guildmember.user.username;
        //await guildmember.send(`hello,\`${user}\``)
    },
};