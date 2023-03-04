class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = this;
            this.array = [];
        }
        return Singleton.instance;
    }

    getArray() {
        return this.array;
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

}

const instance = new Singleton();

module.exports = instance;
