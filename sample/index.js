import { $ } from "../build/index.js";
import imp2 from "./import2.js";

console.log("scope 1", $);

$.set("name", "Bob");
imp2();
