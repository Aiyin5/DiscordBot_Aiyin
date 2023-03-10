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

}

const instance = new Singleton();

module.exports = instance;
