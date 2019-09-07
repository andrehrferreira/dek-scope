# @dekproject/scope

[![npm package](https://nodei.co/npm/@dekproject/scope.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@dekproject/scope/)

Scope global driver

What does the CLI do?

* Creates a global scope
* Keep accessible properties in all scripts that perform import
* Eliminates the need to import previously imported modules
* Simple plugin importation
* Imports controllers and routes

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

### Wait

You can request a dependency wait to perform the debug action

```js
import { $ } from "@dekproject/scope";

setTimeout(() => {
    $.set("name", "Bob");
    console.log("set name:", $.name);
}, 2000);

$.wait(["name"], 5000).then(() => {
    console.log(`The 'name' was loaded: ${$.name}`);
}).catch((err) => {
    console.log(err);
    process.exit(1);
});
```

### Plugins

There are a number of plugins that can be added to the scope available at https://github.com/dekproject, which is intended to facilitate integration with other services that require configuration or prior upload for use such as MongoDB, Redis, Elastic Search and others.

In the example below we will import the Mongoose plugin:

```bash
$ yarn add @dekproject/mongoose dotenv --save
$ nano .env
```

.env
```bash
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB=test
```

```js
import dotenv from "dotenv";
import { $, plugins } from "@dekproject/scope";

(async () => {
    dotenv.config();
    await plugins("node_modules/@dekproject");

    $.wait(["mongoose"], 5000).then(() => {
        console.log("Successfully loaded mongoose");
    }).catch((err) => {
        console.log(err);
        process.exit(1);
    });
})();
```

### 

## Build

To make changes in code and buildar for testing use the command

```bash
$ yarn build
```