#!/usr/bin/env node

const startsWith = require('string.prototype.startswith/implementation');
const childProcessExec = require('child_process').exec;
const util = require('util');
import validateBranchName from './validator';

const exec = util.promisify(childProcessExec);

if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    value: function(search, rawPos) {
        return startsWith(this, search, rawPos)
    }
  });
}

run();

async function run(){
  const branchName = await getCurrentBranch();
  const [, results] = validateBranchName(branchName);
  
  results.forEach(message => {
    console.log(message);
  })
  if(results.length > 0){
      process.exit(1)
  }
  process.exit(0)
}

async function getCurrentBranch() {
    const branchesOutput = await exec('git branch');
    if( branchesOutput.stderr){
      throw new Error(stderr)
    }
    const branches = branchesOutput.stdout
    return branches.split('\n').find(b => b.trim().charAt(0) === '*' ).trim().substring(2)
}

