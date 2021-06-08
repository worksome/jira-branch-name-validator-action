import validateBranchName  from './validator';
import checkJiraIdConsistency from './jira-id-consistency-check'
const core = require('@actions/core')

let branchName = core.getInput("branch-name")
let prTitle = core.getInput("pr-title")
let commits = core.getInput("commits")

let prValidation = (prTitle.length > 0 && commits.length > 0) ? true : false

core.info(`Received the following branch name: ${branchName}.`)
core.info("The format should be `JIRA-123_fixing-bug`.")

let [jiraId, results] = validateBranchName(branchName)

core.info(`Extracted the following JIRA ID from branch name: ${jiraId}`)

if (prValidation) {
    core.info(`Received the following PR title: ${prTitle}`)
    core.info("Should contain the same JIRA ID.")
    core.info("Received the following commits information:")
    JSON.parse(commits).forEach(c => {
        core.info(`  ${c.commit.message}`)
    })
    core.info("Commit message(s) should contain the same JIRA ID as above.")
    results = results.concat(checkJiraIdConsistency(jiraId, prTitle, commits))
} else {
    core.info(`PR title or commits information is missing`)
}

results.forEach(message => {
    core.setFailed(message)
})

