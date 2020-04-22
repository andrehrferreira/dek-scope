//Global scope driver

import path from "path";
import globby from "globby";
import express from "express";

var Scope = { debug: false };

Scope.get = function(name) {
    try{
        if(this.hasOwnProperty(name))
            return this[name];
        else
            throw `${name} does not exist in scope`;
    }
    catch(e){
        if(this.debug)
            console.log(e.message);

        return false;
    }
};

Scope.set = function(name, value) {
    let restrictedNames = ["get", "set", "use", "wait", "map", "plugins", "controllers", "routes"]; 

    if(restrictedNames.indexOf(name) === -1 && !restrictedNames.hasOwnProperty(name)){
        try{
            if(this.hasOwnProperty(name))
                if(this.debug)
                    console.log(`'${name}' was replaced by the value '${value}'`);
        } catch(e) { 
            if(this.debug)
                console.log(e.message);
        }

        this[name] = value;
        exports[name] = value;
        return true;
    }
    else{
        if(this.debug)
            console.log(`Do not use the names: ${restrictedNames.join(", ")}`);

        return false;
    }
};

Scope.use = function(obj) {
    if(typeof obj == "object"){
        let status = true;
        const keys = Object.keys(obj);

        for(let key in keys){
            if(!this.set([keys[key]].toString(), obj[keys[key]]))
                status = false;
        }

        return status;
    }
    else{
        return false;
    }
};

Scope.wait = function(obj, timeout) {
    let _this = this;
    let waitTime = timeout || 3000;
    let pInterval = null, pWaitTimeout = null;

    return new Promise(async (resolve, reject) => {
        try{
            pWaitTimeout = setTimeout(() => {
                if(pInterval)
                    clearInterval(pInterval);

                if(typeof obj == "object"){
                    let unloadDependencies = obj.filter((key) => (!_this.hasOwnProperty(key)));
                    reject(`The wait timeout was reached without loading the dependencies: ${unloadDependencies.join(", ")}`);
                }
                else if(typeof obj == "string"){
                    reject(`The wait timeout was reached without loading the dependencies: ${obj}`);
                }                
            }, waitTime);

            if(typeof obj == "object"){
                pInterval = setInterval(() => {
                    if(obj.every((key) => { return _this.hasOwnProperty(key); })){
                        if(pInterval) clearInterval(pInterval);
                        if(pWaitTimeout)  clearTimeout(pWaitTimeout);

                        resolve();
                    }
                }, 100);
            }
            else if(typeof obj == "string"){
                pInterval = setInterval(() => {
                    if(_this.hasOwnProperty(obj)){
                        if(pInterval) clearInterval(pInterval);
                        if(pWaitTimeout) clearTimeout(pWaitTimeout);

                        resolve();
                    }
                }, 100);
            }
            else{
                reject("Dependencies must be 'object' or 'string'.");
            }
        } 
        catch(e){
            reject(e);
        }
    });
};

export let $ = Scope;
export default Scope;

//Plugins
export let plugins = async (pluginsPath) => {
    try{
        const pluginsPathResolve = path.join(process.cwd(), pluginsPath);

        await globby([`${pluginsPathResolve}/**/build/index.js`]).then(async (paths) => {
            paths.forEach(async (pluginPath) => {
                if(process.env.DEBUG == "true")
                    console.log(`[ Plugins ] - Load ${pluginPath}`);

                var pluginRequest = require(path.resolve(pluginPath));

                if(typeof pluginRequest == "function")
                    await pluginRequest();
                else if(typeof pluginRequest.default == "function")
                    await pluginRequest.default();                
            });
        });
    } catch(e){
        console.log(`[ Plugins ] - ${e.message}`);
    }
};

//Controllers
export let controllers = async (controllersPath) => {
    try{
        const controllersPathResolve = path.join(process.cwd(), controllersPath);

        await globby([`${controllersPathResolve}/*.js`, `${controllersPathResolve}/**/*.js`]).then(async (paths) => {
            paths.forEach(async (controllerPath) => {
                if(process.env.DEBUG == "true")
                    console.log(`[ Controllers ] - Load ${controllerPath}`);

                var controllerRequest = require(path.resolve(controllerPath));

                if(typeof controllerRequest == "function")
                    await controllerRequest();
                else if(typeof controllerRequest.default == "function")
                    await controllerRequest.default();
            });
        });
    }
    catch(e){
        console.log(`[ Controllers ] - ${e.message}`);
    }
};

//Routes
export let routes = async (routesPath) => {
    try{
        const routesPathResolve = path.join(process.cwd(), routesPath);
        const router = express.Router();

        await globby([`${routesPathResolve}/*.js`, `${routesPathResolve}/**/*.js`]).then((paths) => {
            paths.forEach((routePath) => {
                var routeRequest = require(path.resolve(routePath));

                if(typeof routeRequest == "function")
                    routeRequest(router);
                else if(typeof routeRequest.default == "function")
                    routeRequest.default(router);
            });

            return true;
        });

        return router;
    }
    catch(e){
        console.log(`[ Routes ] - ${e.message}`);
        throw e;
    }
};

//Maps
export let map = async (mapPath) => {
    try{
        const mapPathResolve = path.join(process.cwd(), mapPath);

        await globby([`${mapPathResolve}/*.js`, `${mapPathResolve}/**/*.js`]).then((paths) => {
            paths.forEach((filePath) => {
                let fileRequire = require(path.resolve(filePath));

                if(typeof fileRequire == "function")
                    fileRequire();
                else if(typeof fileRequire.default == "function")
                    fileRequire.default();
            });

            return true;
        });
    }
    catch(e){
        console.log(`[ Routes ] - ${e.message}`);
        throw e;
    }
};
