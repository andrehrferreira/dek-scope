import { $ } from "../build/index.js";

export default () => {
    console.log("scope 2", $);
    console.log("name", $.get("name"));
};