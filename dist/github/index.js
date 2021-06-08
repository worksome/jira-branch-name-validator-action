/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 320:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 280:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


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

;// CONCATENATED MODULE: ./src/index.js

const core = __nccwpck_require__(320)
const github = __nccwpck_require__(280);

let branchName = core.getInput("branch-name")
let prTitle = core.getInput("pr-title")
let commits = core.getInput("commits")
let src_event = core.getInput("event")
core.info("Event:")
core.info(JSON.stringify(src_event, undefined, 2))
core.info("Github:")
core.info(JSON.stringify(github, undefined, 2))
core.info("Event via module:")
core.info(JSON.stringify(github.event, undefined, 2))
core.info(`Received the following branch name: ${branchName}.`)
core.info("The format should be `JIRA-123_fixing-bug`.")
core.info(`Received the following PR title: ${prTitle}`)
core.info("Should contain the same JIRA ID.")
core.info("Received the following commits information:")
core.info(commits)
core.info("Commit message should contain the same JIRA ID as above.")

const payload = JSON.stringify(github.context.payload, undefined, 2)
console.log(`The event payload:`);
console.log(`${payload}`);

const results = validator(branchName, prTitle, commits)

results.forEach(message => {
    core.setFailed(message)
})

})();

module.exports = __webpack_exports__;
/******/ })()
;