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

Scope.wait = function(obj) {
    var _this = this;

    return new Promise(async (resolve, reject) => {
        try{
            if(typeof obj == "object"){
                var pInterval = setInterval(() => {
                    if(obj.every((key) => { return _this.hasOwnProperty(key); })){
                        clearInterval(pInterval);
                        resolve();
                    }
                }, 100);
            }
            else if(typeof obj == "string"){
                var pInterval = setInterval(() => {
                    if(_this.hasOwnProperty(obj)){
                        clearInterval(pInterval);
                        resolve();
                    }
                }, 100);
            }
        } catch(e){
            reject(e.message);
        }
    });
};

export let $ = Scope;
export default Scope;

//Plugins
export let plugins = async (pluginsPath) => {
    return new Promise(async (resolve, reject) => {
        try{
            const pluginsPathResolve = path.join(process.cwd(), pluginsPath);

            await globby([`${pluginsPathResolve}/build/index.js`, `${pluginsPathResolve}/*/build/index.js`]).then(async (paths) => {
                await paths.forEach(async (pluginPath) => {
                    if(process.env.DEBUG == 'true')
                        console.log(`[ Plugins ] - Load ${pluginPath}`);

                    var pluginRequest = require(path.resolve(pluginPath));

                    if(typeof pluginRequest == "function")
                        await pluginRequest();
                    else if(typeof pluginRequest.default == "function")
                        await pluginRequest.default();
                });

                resolve();
            });
        } catch(e){
            console.log(`[ Plugins ] - ${e.message}`);
            reject();
        }
    });
};

//Controllers
export let controllers = async (controllersPath) => {
    return new Promise(async (resolve, reject) => {
        try{
            const controllersPathResolve = path.join(process.cwd(), controllersPath);

            await globby([`${controllersPathResolve}/*.js`, `${controllersPathResolve}/**/*.js`]).then(async (paths) => {
                paths.forEach(async (controllerPath) => {
                    if(process.env.DEBUG == 'true')
                        console.log(`[ Controllers ] - Load ${pluginPath}`);

                    var controllerRequest = require(path.resolve(controllerPath));

                    if(typeof controllerRequest == "function")
                        await controllerRequest();
                    else if(typeof controllerRequest.default == "function")
                        await controllerRequest.default();
                });

                resolve();
            });
        }
        catch(e){
            console.log(`[ Controllers ] - ${e.message}`);
            reject();
        }
    });

}
