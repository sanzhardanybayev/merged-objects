# Introduction
This function merges two objects together.

# Example
```js
const merge = require('merged-objects');

const first = {
    isProd: false
};

const second = {
    logs: true;
}

const merged = merge(first, second);
/**
 *  {
 *   isProd: false,
 *   logs: true
 *  }
 * /
```