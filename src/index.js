import validateBranchName from './validator';
const core = require('@actions/core')
const github = require('@actions/github');

let branchName = core.getInput("branch-name")
let prTitle = core.getInput("pr-title")
let commits = core.getInput("commits")
let event = core.getInput("event")
core.info("Event:")
core.info(JSON.stringify(event, undefined, 2))
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

const results = validateBranchName(branchName, prTitle, commits)

results.forEach(message => {
    core.setFailed(message)
})
