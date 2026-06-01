import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const packageJsonPath = join(root, "package.json");
const packageLockPath = join(root, "package-lock.json");

function bumpPatch(version) {
  const [major, minor, patch] = version.split(".").map((part) => Number(part));
  if ([major, minor, patch].some((part) => Number.isNaN(part))) {
    throw new Error(`Invalid version: ${version}`);
  }
  return `${major}.${minor}.${patch + 1}`;
}

const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
packageJson.version = bumpPatch(packageJson.version);
writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");

if (existsSync(packageLockPath)) {
  const packageLock = JSON.parse(readFileSync(packageLockPath, "utf8"));
  packageLock.version = packageJson.version;
  if (packageLock.packages && packageLock.packages[""]) {
    packageLock.packages[""].version = packageJson.version;
  }
  writeFileSync(packageLockPath, `${JSON.stringify(packageLock, null, 2)}\n`, "utf8");
}

console.log(`Bumped version to ${packageJson.version}`);
