const fs = require("fs");

class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = this;
            this.array = [];
            this.unPrearray = [];
            this.botInfo = {
                "name":"AMA_BOT",
                "url":"../../ama_bot.jpg",
                "info":" "
            }
            this.busyType=false;
        }
        return Singleton.instance;
    }

    getArray() {
        return this.array;
    }
    getBotInfo(){
        return this.botInfo;
    }
    setBotInfo(name,info){
        this.botInfo.name=name;
        this.botInfo.info=info;
    }
    getUnPreArray() {
        return this.unPrearray;
    }
    addUnPreItem(item) {
        this.unPrearray.push(item);
    }
    getBusyType(){
        return this.busyType;
    }
    setBusyType(type){
        this.busyType=type;
    }
    addItem(item) {
        this.array.push(item);
    }

    removeItem(item) {
        const index = this.array.indexOf(item);
        if (index > -1) {
            this.array.splice(index, 1);
        }
    }

    cleanItem(){
        this.array = [];
    }
    cleanUnPreItem(){
        this.unPrearray = [];
    }
    // 将 Base64 字符串转换成图片文件
    base64ToImage(base64String, outputFilePath) {
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(outputFilePath, buffer);
    };
}

const instance = new Singleton();

module.exports = instance;
