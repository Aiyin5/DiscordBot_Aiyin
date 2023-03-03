const fs = require("fs")
const COS = require('cos-nodejs-sdk-v5');

class cosInstance {
    CosItem;
    constructor(SecretId,SecretKey) {
        this.CosItem = new COS({
            SecretId: SecretId, // 推荐使用环境变量获取；用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
            SecretKey: SecretKey, // 推荐使用环境变量获取；用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
        })
    }
    async getItem(path){
        try {
            let data = await this.CosItem.getObject({
                Bucket: 'config-1256742492', /* 必须 */
                Region: 'ap-singapore',    /* 必须 */
                Key: 'perceptConfig.json',              /* 必须 */
                Output: fs.createWriteStream('./perceptConfig.json'),
            });
            return data;
        } catch (err) {
            console.log(err);
        }
    }
    async upload (path){
        try {
            let data = await this.CosItem.putObject({
                Bucket: 'config-1256742492', /* 必须 */
                Region: 'ap-singapore',    /* 必须 */
                Key: 'perceptConfig.json',              /* 必须 */
                Body: fs.createReadStream(path), // 上传文件对象
                ContentLength: fs.statSync(path).size
            });
            return data;
        } catch (err) {
            console.log(err);
        }
    }
    uploadwait(path){
        this.CosItem.putObject({
            Bucket: 'config-1256742492', /* 必须 */
            Region: 'ap-singapore',    /* 必须 */
            Key: 'perceptConfig.json',              /* 必须 */
            Body: fs.createReadStream(path), // 上传文件对象
            ContentLength: fs.statSync(path).size
        }, (err, data)=> {
            console.log(err || data);
        });
    }
}
module.exports = cosInstance;






