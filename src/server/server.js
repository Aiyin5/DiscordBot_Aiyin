const http = require('http');
const url = require( "url");
const fs = require("fs");
const instance = require("../util/caInstance");
const openai = require('../util/chatBot')
const axios = require("axios");

function serverStart(client,cosItem,path){
    http.createServer((req, res) => {
        // 监听 POST 请求
        const { pathname } = url.parse(req.url, true);
        if (req.method === 'POST' && pathname === '/update' ) {
            let body = '';
            req.on('data', (data) => {
                body += data;
                console.log("接收到Post的请求");
            });
            req.on('end',   () => {
                let preData;
                axios.get('http://www.free-be.xyz:3000/data').
                then(response => {
                    preData=response.data;
                    // 处理响应
                    instance.cleanItem();
                    for(let item of preData){
                        let prompt=item.prompt.toString();
                        prompt=prompt.replace(/\s*/g,"");
                        prompt=prompt.toLowerCase();
                        prompt=prompt.split(",");
                        let completion=item.completion;
                        instance.addItem({
                            "prompt":prompt,
                            "completion":completion
                        });
                    }
                    res.end("更新完成");
                }).catch(error => {
                    console.log(error);
                    res.statusCode = 400;
                    res.end("更新失败");
                });
            });
        }
        else if (req.method === 'POST' && pathname === '/question' ) {
            let body = '';
            req.on('data', (data) => {
                body += data;
                console.log("接收到Post的请求");
            });
            req.on('end',   async () => {
                try{
                    let data = JSON.parse(body); // 将字符串解析为 JSON 对象
                    let message=data.message;
                    const completion = await openai.createChatCompletion({
                        model: "gpt-3.5-turbo",
                        temperature: 0,
                        messages: [{role: "user", content: message}],
                    });
                    res.end(JSON.stringify(completion.data.choices[0].message.content));
                }
                catch (error) {
                    console.error(`解析请求体为 JSON 对象出错：${error.message}`);
                    res.statusCode = 400;
                    res.end('请求体解析错误');
                }
            });
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('不支持该请求方法\n');
            res.end();
        }
    }).listen(3001, () => {
        console.log('Node.js 服务已启动，正在监听 3001 端口');
    });
}
module.exports = serverStart;