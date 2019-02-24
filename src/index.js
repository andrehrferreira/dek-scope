//Global scope driver

import _ from "lodash";

var Scope = {};

Scope.get = function(name) {
    try{
        if(this.hasOwnProperty(name))
            return this[name]
        else
            throw `${name} does not exist in scope`;
    }
    catch(e){
        console.log(e.message);
        return false;
    }
};

Scope.set = function(name, value) {
    try{
        if(this.hasOwnProperty(name))
            console.log(`${name} was replaced by the value ${value}`);
    } catch(e) { }

    if(name !== "get" && name !== "set" && name !== "use"){
        this[name] = value;
        exports[name] = value;
    }
    else{
        console.log(`Do not use the names "get", "set" or "use"`);
    }
};

Scope.use = function(obj) {
    if(typeof obj == "object"){
        Object.keys(obj).forEach((key) => {
            this[key] = obj[key];
        });
    }
};

export let $ = Scope;
export default Scope;
