#!/usr/bin/env node/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 426:
/***/ ((module) => {

module.exports = eval("require")("string.prototype.startswith/implementation");


/***/ }),

/***/ 129:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");;

/***/ }),

/***/ 669:
/***/ ((module) => {

"use strict";
module.exports = require("util");;

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
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__nccwpck_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./src/validator.js
/* harmony default export */ function validator(branchName, prTitle, commits) {

    let result = []

    if (!branchName.startsWith('JIRA')) {
        result.push(`Branch doesn't start with \`JIRA\` prefix, found ${branchName}.`)
    }

    branchName = branchName.substring(4)
    if (!branchName.startsWith('-')) {
        result.push(`Separator after prefix is not \`-\`, found ${branchName.substring(0, 1)}.`)
    }

    branchName = branchName.substring(1);
    const rawJiraId = branchName.match(/^\d*/)[0]
    const jiraId = parseInt(rawJiraId)
    if (isNaN(jiraId) || jiraId === 0) {
        result.push(`JIRA id is not a positive number, found ${rawJiraId}.`)
    }
    if (rawJiraId.length !== jiraId.toString().length) {
        result.push(`JIRA id has leading zeros, found ${rawJiraId}.`)
    }

    branchName = branchName.substring(rawJiraId.length)
    if (!branchName.startsWith('_')) {
        result.push(`Separator after JIRA id is not \`_\`, found ${branchName.substring(0, 1)}.`)
    }

    branchName = branchName.substring(1)
    if (!/^[a-zA-Z0-9\-_]+$/.test(branchName)) {
        result.push(`Description after JIRA id should use hyphen or underscore as word separator, found ${branchName}.`)
    }

    if (branchName.length > 100) {
        result.push(`Description after JIRA id has to be shorter than 100 characters, found ${branchName}.`)
    }

    rawJiraId = "JIRA-" + rawJiraId

    if (prTitle.search(rawJiraId) < 0) {
        result.push(`PR title <${prTitle}> does not contain Jira ID inferred from branch name, ${rawJiraId}`)
    }

    commits["commit"].forEach(function(commit) {
         if (commit.message.search(rawJiraId) < 0) {
             result.push(`Commit message <${commit.message}> does not contain Jira ID inferred from branch name, ${rawJiraId}`)
         }
    })
    
    return result
}

;// CONCATENATED MODULE: ./src/pre-commit.js


const startsWith = __nccwpck_require__(426);
const childProcessExec = __nccwpck_require__(129).exec;
const util = __nccwpck_require__(669);


const exec = util.promisify(childProcessExec);

if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    value: function(search, rawPos) {
        return startsWith(this, search, rawPos)
    }
  });
}

run();

async function run(){
  const branchName = await getCurrentBranch();
  const results = validator(branchName);
  
  results.forEach(message => {
    console.log(message);
  })
  if(results.length > 0){
      process.exit(1)
  }
  process.exit(0)
}

async function getCurrentBranch() {
    const branchesOutput = await exec('git branch');
    if( branchesOutput.stderr){
      throw new Error(stderr)
    }
    const branches = branchesOutput.stdout
    return branches.split('\n').find(b => b.trim().charAt(0) === '*' ).trim().substring(2)
}
})();

module.exports = __webpack_exports__;
/******/ })()
;