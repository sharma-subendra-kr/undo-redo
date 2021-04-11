/** @license undo-redo

undo-redo, a undo redo stack data structure.

Copyright © 2020-2021 Subendra Kumar Sharma. All rights reserved. (jobs.sharma.subendra.kr@gmail.com)

This file is part of undo-redo.

undo-redo is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

undo-redo is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with undo-redo.  If not, see <https://www.gnu.org/licenses/>.

Written by Subendra Kumar Sharma.

*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["UndoRedo"] = factory();
	else
		root["UndoRedo"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** @license undo-redo

undo-redo, a undo redo stack data structure.

Copyright © 2020-2021 Subendra Kumar Sharma. All rights reserved. (jobs.sharma.subendra.kr@gmail.com)

This file is part of undo-redo.

undo-redo is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

undo-redo is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with undo-redo.  If not, see <https://www.gnu.org/licenses/>.

Written by Subendra Kumar Sharma.

*/
/*
    node = {
        next: <Node>,
        prev: <Node>,
        data: <any>,
    }

 */
class UndoRedo {
    constructor(options) {
        this.HEAD = undefined;
        this.TAIL = undefined;
        this.CURR = undefined;
        this.size = (options === null || options === void 0 ? void 0 : options.size) || 50;
        this.length = 0;
    }
    constructNode(data) {
        return {
            next: undefined,
            prev: undefined,
            data,
        };
    }
    undo() {
        if (this.CURR !== this.TAIL) {
            this.CURR = this.CURR.prev;
            return this.CURR.data;
        }
    }
    isUndoAvailable() {
        return !(this.CURR === this.TAIL);
    }
    redo() {
        if (this.CURR !== this.HEAD) {
            this.CURR = this.CURR.next;
            return this.CURR.data;
        }
    }
    isRedoAvailable() {
        return !(this.CURR === this.HEAD);
    }
    push(data) {
        const node = this.constructNode(data);
        if (this.CURR === undefined) {
            this.CURR = node;
            this.HEAD = node;
            this.TAIL = node;
            this.length++;
            this.checkLength();
        }
        else if (this.CURR === this.HEAD) {
            this.HEAD = node;
            this.HEAD.prev = this.CURR;
            this.CURR.next = this.HEAD;
            this.CURR = this.HEAD;
            this.length++;
            this.checkLength();
        }
        else {
            let next = this.CURR.next;
            node.prev = this.CURR;
            this.CURR.next = node;
            this.CURR = this.CURR.next;
            this.HEAD = this.CURR;
            let count = 0;
            while (next !== undefined) {
                next = next.next;
                count++;
            }
            this.length -= count;
            this.length++;
        }
        return data;
    }
    checkLength() {
        if (this.length > this.size) {
            this.TAIL = this.TAIL.next;
            this.length--;
        }
    }
    getCurrent() {
        var _a;
        return (_a = this.CURR) === null || _a === void 0 ? void 0 : _a.data;
    }
    getData() {
        let curr = this.TAIL;
        const res = new Array(this.length);
        let count = 0;
        while (curr !== undefined) {
            res[count++] = curr.data;
            curr = curr.next;
        }
        return res;
    }
    reset() {
        this.HEAD = undefined;
        this.TAIL = undefined;
        this.CURR = undefined;
        this.length = 0;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (UndoRedo);


/***/ })
/******/ ]);
});