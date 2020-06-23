import * as core from "@actions/core";

let defaultBranchName = core.getInput("defaultBranchName");
console.log(`Using default branch name: ${defaultBranchName}`);

const keysInput = core.getInput("keys", {
	required: true
});

const keys = keysInput.split(/\r?\n/);
console.log("evaluating", keys);

const branchName = process.env.GITHUB_REF;
if (!branchName) {
	throw new Error("GITHUB_REF not available. Could not determine branch name.");
}

for (let key of keys) {
	if (branchName == `refs/heads/${defaultBranchName}`) {
		const value = process.env[`${key}_PROD`];
		console.log(`replacing ${key} with value from ${key}_PROD`);
		core.exportVariable(key, value);
	} else {
		const value = process.env[key];
		if (value) {
			core.exportVariable(key, value);
		}
	}
}
