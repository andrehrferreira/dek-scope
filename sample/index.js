import { $ } from "../build/index.js";
import imp from "./import.js";

(async () => {
    console.log("scope 1", $);

    $.set("name", "Bob");
    console.log("name", $.name);

    setTimeout(() => {
        console.log("set age");
        $.set("age", "29");
    }, 2000);

    $.wait(["name", "age"], 5000).then(imp).catch((err) => {
        console.log(err);
        process.exit(1);
    })
})();
