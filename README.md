# JIRA Branch Name Validation Action
A GitHub action for validating if the branch name is contains JIRA id

## Inputs

### `branch-name`

**Required** The name of the branch to validate against.

## Example usage

```
uses: worksome/jira-branch-name-validator-action@master
with:
  branch-name: $BRANCH_NAME
```