#!/usr/bin/env node
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 637:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const child_process_1 = __nccwpck_require__(81);
const validator_1 = __importDefault(__nccwpck_require__(630));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const branchName = yield getCurrentBranch();
        const [, results] = (0, validator_1.default)(branchName, 'JIRA');
        results.forEach(message => {
            console.log(message);
        });
        if (results.length > 0) {
            process.exit(1);
        }
        process.exit(0);
    });
}
function getCurrentBranch() {
    return __awaiter(this, void 0, void 0, function* () {
        const { stdout, stderr } = yield exec('git branch');
        if (stderr !== '') {
            throw new Error(stderr);
        }
        if (stdout === '') {
            throw new Error('No output was generated from "git branch". Please try again.');
        }
        const branchOutput = stdout.toString();
        const branches = branchOutput.split('\n');
        const branch = branches.find((branch) => branch.trim().charAt(0) === '*');
        if (!branch) {
            throw new Error('Unable to find the current branch. Please try again.');
        }
        // Remove "* " prefix
        return branch.trim().substring(2);
    });
}
function exec(command, options = { cwd: process.cwd() }) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((done, failed) => {
            (0, child_process_1.exec)(command, Object.assign({}, options), (err, stdout, stderr) => {
                if (err) {
                    process.stdout.write(stdout);
                    process.stderr.write(stderr);
                    failed(err);
                    return;
                }
                done({ stdout, stderr });
            });
        });
    });
}
run();


/***/ }),

/***/ 630:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function default_1(branchName, prefix) {
    let result = [];
    if (!branchName.startsWith(prefix)) {
        result.push(`Branch doesn't start with \`${prefix}\` prefix, found ${branchName}.`);
    }
    branchName = branchName.substring(prefix.length);
    if (!branchName.startsWith('-')) {
        result.push(`Separator after prefix is not \`-\`, found ${branchName.substring(0, 1)}.`);
    }
    branchName = branchName.substring(1);
    let matches = branchName.match(/^\d*/);
    const rawJiraId = matches ? matches[0] : '0';
    const jiraId = parseInt(rawJiraId);
    if (isNaN(jiraId) || jiraId === 0) {
        result.push(`JIRA id is not a positive number, found ${rawJiraId}.`);
    }
    if (rawJiraId.length !== jiraId.toString().length) {
        result.push(`JIRA id has leading zeros, found ${rawJiraId}.`);
    }
    branchName = branchName.substring(rawJiraId.length);
    if (!/^[\-_]/.test(branchName)) {
        result.push(`Separator after JIRA id is not \`_\` or \`-\`, found ${branchName.substring(0, 1)}.`);
    }
    branchName = branchName.substring(1);
    if (!/^[a-zA-Z0-9\-_]+$/.test(branchName)) {
        result.push(`Description after JIRA id should use hyphen or underscore as word separator, found ${branchName}.`);
    }
    if (branchName.length > 100) {
        result.push(`Description after JIRA id has to be shorter than 100 characters, found ${branchName}.`);
    }
    return [`${prefix}-${jiraId}`, result];
}
exports["default"] = default_1;


/***/ }),

/***/ 81:
/***/ ((module) => {

module.exports = require("child_process");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(637);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;