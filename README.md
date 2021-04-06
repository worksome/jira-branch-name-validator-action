# JIRA Branch Name Validation Action
A GitHub action for validating if the branch name is contains JIRA id

## Inputs

### `branch-name`

**Required** The name of the branch to validate against.

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
      - name: Validate JIRA branch name
        uses: worksome/jira-branch-name-validator-action@v1.6.1
        with:
          branch-name: ${{ github.event.pull_request.head.ref }}

```
