const { request } = require('undici');
const { Client, Events,GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMembers,GatewayIntentBits.DirectMessages] });
const  preDataMap=require('./data/perception.json');
client.commands = new Collection();

client.preData =preDataMap;


const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

const { token } = require('./config.json');
const http = require('http');
const axios = require('axios');

axios.get('http://43.153.209.106:3000')
    .then(response => {
        client.preData =JSON.parse(response.data);
    })
    .catch(error => {
        console.error(error);
    });
// 创建 HTTP 服务端
http.createServer((req, res) => {
    // 监听 POST 请求
    if (req.method === 'POST') {
        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('POST 请求已收到\n');
            res.end();
            axios.get('http://43.153.209.106:3000')
                .then(response => {
                    client.preData =JSON.parse(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('不支持该请求方法\n');
        res.end();
    }
}).listen(3001, () => {
    console.log('Node.js 服务已启动，正在监听 3001 端口');
});

//data_check_console

(async () => {
    //console.log(client.nounwordsmap.keys());
    for (file of functions) {
        require(`./src/functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(token);
})();