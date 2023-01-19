export default function (branchName: string, prefix: string): [string, string[]] {

    let result: string[] = []

    if (!branchName.startsWith(prefix)) {
        result.push(`Branch doesn't start with \`${prefix}\` prefix, found ${branchName}.`)
    }

    branchName = branchName.substring(prefix.length)
    if (!branchName.startsWith('-')) {
        result.push(`Separator after prefix is not \`-\`, found ${branchName.substring(0, 1)}.`)
    }

    branchName = branchName.substring(1);
    let matches: string[] | null = branchName.match(/^\d*/);

    const rawJiraId = matches ? matches[0] : '0'
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

    return [`${prefix}-${jiraId}`, result]
}

