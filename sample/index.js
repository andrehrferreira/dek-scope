import { $ } from "../build/index.js";
import imp from "./import.js";

$.set("name", "Bob");
console.log("set name:", $.name);

setTimeout(() => {
    $.set("age", "29");
    console.log("set age:", $.age);
}, 2000);

$.wait(["name", "age"], 5000).then(imp).catch((err) => {
    console.log(err);
    process.exit(1);
});
