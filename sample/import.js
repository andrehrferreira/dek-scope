import { name, age } from "../build/index.js";

export default async () => {
    console.log("import after wait");
    console.log("end:", name, age);
};
