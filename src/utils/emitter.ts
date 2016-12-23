export default class Emit {

    private messages;
    private lastId: number;
    private middlewares: any[];
    constructor () {
        this.messages = {};
        this.lastId = 0; 
    };

    public dispatch (message: string, data?) {
        return this.emit(message, data);
    };

    public subscribe (message, func?) {
        if (typeof message === 'object' && !func) return this.subscribeWithObject(message);
        if (func instanceof Array) return func.map(item => this.subscribe(message, item));
        if (typeof func !== 'function') return false;
        if (!this.messages.hasOwnProperty(message)) this.messages[message] = {};
        
        const token = `uid_${++this.lastId}`;
        this.messages[message][token] = func;
        return token;
    };

    private subscribeWithObject (funcObject) {
        let key = '';

        for (key in funcObject) {
            
            if (funcObject.hasOwnProperty(key)) {
                this.subscribe(key, funcObject[key]);
            }
        }
    };

    private emit (message, data) {
        const deliver = this.getMessageHandle(message);
        return this.callAsync(deliver, data);
    };

    private getMessageHandle (message) {
        let key:string;
        const subscribes = this.messages[message], array = [];
        for (key in subscribes) {
            if (subscribes.hasOwnProperty(key)) {
                return typeof subscribes[key] === 'function'? subscribes[key]: () => {};
            }
        }
        return array;
    };

    private callAsync (func, data) {
        if (typeof func !== 'function') return Promise.resolve();

        return new Promise(r => {
            setTimeout(()=> {
                r(func(data));
            }, 0);
        });
    };

};

export const Emitter = new Emit; 