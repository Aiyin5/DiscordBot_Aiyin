const http = require('http');
const url = require( "url");
const fs = require("fs");
const instance = require("../util/caInstance");
const openai = require('../util/chatBot')

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
                try{
                    let data = JSON.parse(body); // 将字符串解析为 JSON 对象
                    let str=data.data;
                    str=str.toString();
                    let format="["
                    format=format+str+']';
                    fs.writeFile(path,format,err=>{
                        if(err){
                            console.log('写入出错了');
                            res.end('更新失败');
                        }else{
                            console.log('文件写入成功');
                            cosItem.uploadwait(path);
                            let preData=JSON.parse(format);
                            instance.cleanItem();
                            for(let item of preData){
                                instance.addItem(item);
                            }
                            res.end('更新成功');
                        }
                    })


                }
                catch (error) {
                    console.error(`解析请求体为 JSON 对象出错：${error.message}`);
                    res.statusCode = 400;
                    res.end('请求体解析错误');
                }
            });
        }
        else if (req.method === 'GET' && pathname === '/jsonfile' ) {
            let body = '';
            req.on('data', (data) => {
                console.log("接收到GET的请求");
            });
            req.on('end', () => {
                try{
                    fs.readFile(path,'utf8',(err,dataStr)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log(dataStr);
                            console.log('文件读取成功');
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify(dataStr));
                        }
                    })
                }
                catch (err){
                    console.log(err);
                }
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
                        messages: [{role: "user", content: message}],
                    });
                    res.end(completion.data.choices[0].text);
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