# JIRA Branch Name Validation Action

A GitHub action for ensuring that the branch name contains a valid JIRA id (as format) and whether the same JIRA id is contained in the PR title and commit message(s).

The same code is npm-packaged and used for local pre-commit validation of the branch name, only (via git hooks / husky). The PR title and commits are not checked locally because they are not relevant at this step in the workflow (PR doesn't have to exist when still developing locally and local commit messages can be whatever the developer wants - i.e. before squash and push).

## Inputs

### `branch-name`

**Required** The name of the branch to validate against.

### `pr-title`

**Required** The title of the PR to validate.

### `commits`

**Required** The GitHub API response JSON containing the commits of the PR.

### `prefix`

**Optional** The Jira project prefix (default is `JIRA`).

***

## Example usage

```
uses: worksome/jira-branch-name-validator-action@main
with:
  branch-name: $BRANCH_NAME
```

## Full example usage

```
name: Code Analysis

on:
  pull_request

jobs:
  branchName:
    name: Branch Validation
    runs-on: ubuntu-latest
    steps:

      - uses: octokit/request-action@v2.x
        id: get_pr_commits
        with:
          route: GET /repos/{owner}/{repo}/pulls/{pull_number}/commits
          owner: worksome
          repo: platform
          pull_number: ${{ github.event.pull_request.number }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Validate JIRA branch name and PR/commit consistency
        uses: worksome/jira-branch-name-validator-action@v1.7.1
        with:
          branch-name: ${{ github.event.pull_request.head.ref }}
          pr-title: ${{ github.event.pull_request.title }}
          commits: ${{ steps.get_pr_commits.outputs.data }}
          prefix: JIRA

```

## Setting up for action development
```
npm i -g @vercel/ncc
```

## Building and releasing the action

```
npm run build
```

The resulting (generated) code requires pushing to GitHub, after which a new release can be drafted with this new code as source. Once the PR is merged, a new release off main branch can be drafted with a major.minor.patch version. A release off the PR branch can be drafted with a major.minor.patch-rcnumber version or similar. To use the new action functionality on GitHub, the action needs to be published on the GitHub Marketplace (during release drafting).

## Setting up for hook deployment

Access to Worksome npm registry is required. Ask about it in `#devtalk`.
New versions of the package should be published to the npm registry, trying to maintain version consistency between the npm package and the GitHub action release version. 

## Testing

The GitHub action requires the new version to be pushed to PR branch and a new release to be drafted (and published to GitHub marketplace). After that, update the version of the GitHub action as used in the "client" repository (as well as any other changes it might require, e.g. add newly introduced parameters to the module) and push and test (by triggering the relevant events, whenever possible).

The local branch validator can be manually triggered on repositories that use the module (requires publish of the new package to worksome registry or [locally](https://medium.com/@debshish.pal/publish-a-npm-package-locally-for-testing-9a00015eb9fd)). To do this, use the following command:

```shell
node_modules/.bin/branch-validator
```
