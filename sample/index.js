import { $ } from "../build/index.js";
import imp from "./import.js";

console.log("scope 1", $);

$.set("name", "Bob");
imp();
