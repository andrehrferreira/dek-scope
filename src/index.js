//Global scope driver

import path from "path";
import globby from "globby";
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

//Plugins
export let plugins = async (pluginsPath) => {
    const pluginsPathResolve = path.join(process.cwd(), pluginsPath);

    return await globby([`${pluginsPathResolve}/index.js`, `${pluginsPathResolve}/**/index.js`]).then((paths) => {
        paths.forEach(async (pluginPath) => {
            var pluginRequest = require(path.resolve(pluginPath));

            if(typeof pluginRequest == "function")
                await pluginRequest();
            else if(typeof pluginRequest.default == "function")
                await pluginRequest.default();
        });
    });
};

//Controllers
export let controllers = async (controllersPath) => {
    const controllersPathResolve = path.join(process.cwd(), controllersPath);

    return await globby([`${controllersPathResolve}/*.js`, `${controllersPathResolve}/**/*.js`]).then((paths) => {
        paths.forEach(async (controllerPath) => {
            var controllerRequest = require(path.resolve(controllerPath));

            if(typeof controllerRequest == "function")
                await controllerRequest();
            else if(typeof controllerRequest.default == "function")
                await controllerRequest.default();
        });

        return true;
    });
}
