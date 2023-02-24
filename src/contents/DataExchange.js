
export default class DataExchange {

    data = {};
    functions = [];

    constructor(props) {
        this.data = props;
    }

    subscribeFunctions(fn) {
        this.functions[this.functions.length] = fn;
    }

    getData() {
        return this.data;
    }

    setData(data, fire = true) {
        this.data = data;
        if (fire) {
            this.functions.forEach((f) => {
                f(this.data);
            });
        }
    }

}