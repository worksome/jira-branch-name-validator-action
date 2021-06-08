export default function(branchName, prTitle, commits) {

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
    }
    
    return result
}
