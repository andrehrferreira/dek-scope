import { $ } from "../build/index.js";
import imp from "./import.js";

(async () => {
    console.log("scope 1", $);

    $.set("name", "Bob");
    console.log("name", $.name);

    setTimeout(() => {
        console.log("set age");
        $.set("age", "29");
    }, 3000);

    $.wait(["name", "age"]).then(imp)
})();
