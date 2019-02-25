import { $, name, age } from "../build/index.js";

export default () => {
    console.log("scope 2", $);
    console.log(name, age);
};
