#!/usr/bin/env node

import {exec as cpExec} from 'child_process';
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
    const {stdout, stderr} = await exec('git branch');

    if (stderr !== '') {
        throw new Error(stderr)
    }

    if (stdout === '') {
        throw new Error('No output was generated from "git branch". Please try again.')
    }

    const branchOutput: string = stdout.toString()

    const branches: string[] = branchOutput.split('\n')

    const branch: string | undefined = branches.find((branch: string) => branch.trim().charAt(0) === '*')

    if (!branch) {
        throw new Error('Unable to find the current branch. Please try again.')
    }

    // Remove "* " prefix
    return branch.trim().substring(2)
}

async function exec(
    command: string,
    options = {cwd: process.cwd()}
): Promise<{ stdout: string; stderr: string }> {
    return new Promise((done, failed) => {
        cpExec(command, {...options}, (err, stdout, stderr) => {
            if (err) {
                process.stdout.write(stdout);
                process.stderr.write(stderr);
                failed(err);
                return;
            }

            done({stdout, stderr});
        });
    });
}

run();
