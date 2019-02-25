import { $ } from "../build/index.js";
import imp from "./import.js";

(async () => {
    console.log("scope 1", $);

    $.set("name", "Bob");
    await imp();
})();
