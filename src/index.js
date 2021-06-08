import validateBranchName from './validator';
const core = require('@actions/core')

let branchName = core.getInput("branch-name")
let prTitle = core.getInput("pr-title")
let commits = core.getInput("commits")

core.info(`Received the following branch name: ${branchName}.`)
core.info("The format should be `JIRA-123_fixing-bug`.")
core.info(`Received the following PR title: ${prTitle}`)
core.info("Should contain the same JIRA ID.")
core.info("Received the following commits information:")
core.info(JSON.stringify(commits, undefined, 2))
Array.from(commits).forEach(c => {
  core.info("  ${c.commit.message}")
})
core.info("Commit message(s) should contain the same JIRA ID as above.")

const results = validateBranchName(branchName, prTitle, commits)

results.forEach(message => {
    core.setFailed(message)
})
