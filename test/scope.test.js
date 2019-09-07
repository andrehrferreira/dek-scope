//Utils test

import "@babel/polyfill/noConflict";
import { $ } from "../src/index";

describe("Unitary tests", async () => {
    it("Testing 'set' function", (done) => {
        try{
            if(typeof $.set == "function"){
                $.set("test", 123);
                ($.test === 123) ? done() : done("The behavior of the function was not correct");
            }
            else{
                done("'Set' is not a function");
            }
        } catch(e){
            done(e.message);
        }
    });

    it("Calling test function with restricted name", (done) => {
        try{
            (!$.set("set", 123)) ? done() : done("The behavior of the function was not correct");
        } catch(e){
            done(e.message);
        }
    });

    it("Testing 'get' function", (done) => {
        try{
            if(typeof $.get == "function"){
                ($.get("test") === 123) ? done() : done("The behavior of the function was not correct");
            }
            else{
                done("'Get' is not a function");
            }
        } catch(e){
            done(e.message);
        }
    });

    it("Testing 'use' function", (done) => {
        try{
            if(typeof $.use == "function"){
                if($.use({ name: "bob", age: 19 }))
                    ($.name == "bob" && $.age == 19) ? done() : done("The behavior of the function was not correct");
                else
                    done("Function could not register all object elements");    
            }
            else{
                done("'Use' is not a function");
            }
        } catch(e){
            done(e.message);
        }
    });

    it("Using 'use' function with restricted names", (done) => {
        try{
            if(typeof $.use == "function")
                (!$.use({ get: "error" })) ? done() : done("Function could not register all object elements"); 
            else
                done("'Use' is not a function");
        } catch(e){
            done(e.message);
        }
    });

    it("Testing 'wait' function", (done) => {
        try{
            if(typeof $.wait == "function"){
                setTimeout(() => { $.set("model", 123); }, 200);

                $.wait("model", 5000).then(() => {
                    done();
                }).catch((err) => {
                    done("Could not load dependency");
                });
            } 
            else
                done("'Wait' is not a function");
        } catch(e){
            done(e.message);
        }
    });

    it("Requesting dependency that will not load", (done) => {
        try{
            if(typeof $.wait == "function"){
                $.wait("express", 1000).then(() => {
                    done("For some unknown reason the dependency has been loaded");
                }).catch((err) => {
                    done();
                });
            } 
            else
                done("'Wait' is not a function");
        } catch(e){
            done(e.message);
        }
    });
});