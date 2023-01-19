#!/usr/bin/env node

import {ChildProcess, exec} from 'child_process';
import validateBranchName from './validator';

async function run(): Promise<void> {
    const branchName = await getCurrentBranch();
    const [, results] = validateBranchName(branchName, 'JIRA');

    results.forEach(message => {
        console.log(message);
    })

    if (results.length > 0) {
        process.exit(1)
    }

    process.exit(0)
}

async function getCurrentBranch(): Promise<string> {
    const branchesOutput: ChildProcess = await exec('git branch');

    if (branchesOutput.stderr !== null) {
        throw new Error(branchesOutput.stderr.toString())
    }

    if (branchesOutput.stdout === null) {
        throw new Error('No output was generated from "git branch". Please try again.')
    }

    const branchOutput: string = branchesOutput.stdout.toString()

    const branches: string[] = branchOutput.split('\n')

    const branch: string | undefined = branches.find((branch: string) => branch.trim().charAt(0) === '*')

    if (! branch) {
        throw new Error('Unable to find the current branch. Please try again.')
    }

    // Remove "* " prefix
    return branch.trim().substring(2)
}

run();
