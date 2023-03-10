const AxiosTool=require('../util/axiosTool')
const instance = require("../util/caInstance");
const {baseURL} = require('../../config.json')
const axiosIns=new AxiosTool(baseURL);
const fs = require('fs');
const path = require('path');

// 示例 Base64 字符串
const base64String = 'data:image/jpeg;base64,/9j/4AAQSkZ...';

// 将 Base64 字符串转换成图片文件
const base64ToImage = (base64String, outputFilePath) => {
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(outputFilePath, buffer);
};

// 保存图片文件到本地


module.exports =async (lpath)=> {
    try {
        let preData = await axiosIns.get("/data",{"data":"get"});
        for(let item of preData){
            let prompt=item.prompt.toString();
            prompt=prompt.replace(/\s*!/g,"");
            prompt=prompt.toLowerCase();
            prompt=prompt.split(",");
            let completion=item.completion;
            instance.addItem({
                "prompt":prompt,
                "completion":completion
            });
        }
        let preData2 = await axiosIns.get("/unpre",{"data":"get"});
        for(let item of preData2){
            instance.addUnPreItem({
                "keywords":item.keywords,
                "content":item.content
            });
        }
        let preData3 =await axiosIns.get("/botInfo",{"data":"get"});
        let item3=preData3[0];
        instance.setBotInfo(item3.name,item3.contents);
        let base64String=item3.avatar;
        const outputFilePath = path.join(lpath, 'output.jpg');
        base64ToImage(base64String, outputFilePath);
    }
    catch(error){
        console.log(error);
    }
}