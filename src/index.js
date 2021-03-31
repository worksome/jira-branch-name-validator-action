import validateBranchName from './validator';
const core = require('@actions/core')

let branchName = core.getInput("branch-name")
core.info(`Received the following branch name ${branchName}.`)
core.info("The format should be `JIRA-123_fixing-bug`.")

const results = validateBranchName(branchName)

results.forEach(message => {
    core.setFailed(message)
})