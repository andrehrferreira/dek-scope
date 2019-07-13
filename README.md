# @dekproject/scope

Scope global driver

What does the CLI do?

* Creates a global scope
* Keep accessible properties in all scripts that perform import
* Eliminates the need to import previously imported modules

## Functions

The scope has 3 basic functions, SET, GET and USE, and the last one receives an object that will be incorporated

```js
import { $ } from "@dekproject/scope";
$.set("name", "Bob");
console.log($.name);

$.use({
    age: 26,
    email: "bob@gmail.com";
});

console.log($.name, $.age, $.email);
```

## Build

To make changes in code and buildar for testing use the command

```bash
$ yarn build
```

## Sample

The attached example shows how it will be possible to configure a property in scope and how it becomes accessible in other imports:

index.js
```js
import { $ } from "@dekproject/scope";
import imp from "./import";

console.log("scope 1", $);

$.set("name", "Bob");
imp();
```

import.js
```js
import { $, name } from "@dekproject/scope";

export default () => {
    console.log("scope 2", $);
    console.log("name", name);
};
```

Result
```bash
scope 1 { get: [Function], set: [Function], use: [Function] }
scope 2 { get: [Function], set: [Function], use: [Function], name: 'Bob' }
name Bob
```
