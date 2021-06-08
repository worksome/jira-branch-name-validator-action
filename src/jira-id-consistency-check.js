const core = require('@actions/core')

export default function(jiraId, prTitle, commits) {

    let result = []

    if (prTitle.search(jiraId) < 0) {
        result.push(`PR title <${prTitle}> does not contain Jira ID inferred from branch name, ${jiraId}`)
    }

    JSON.parse(commits).filter(c => c.commit.message.search(jiraId) < 0).forEach(c => {
        result.push(`Commit message <${c.commit.message}> does not contain Jira ID inferred from branch name, ${jiraId}`)
    })
    return result
}

