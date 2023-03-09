class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = this;
            this.array = [];
            this.unPrearray = [];
        }
        return Singleton.instance;
    }

    getArray() {
        return this.array;
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
