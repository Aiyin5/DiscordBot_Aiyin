const AxiosTool=require('../util/axiosTool')
const instance = require("../util/caInstance");
const {baseURL} = require('../../config.json')
const axiosIns=new AxiosTool(baseURL);
module.exports =async ()=> {
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
        console.log(instance.getArray())
        console.log(instance.getUnPreArray())
    }
    catch(error){
        console.log(error);
    }
}