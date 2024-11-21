import { spinner, intro, outro, isCancel, cancel, text } from "@clack/prompts";
import { checkMark, runCommand } from "../src/utils";
import pkg from "../package.json";

import * as color from "picocolors";

async function main() {
  try {
    intro(`Committing changes to Git`);
    const commitString = await text({
      message: "Git commit message:",
      validate(value) {
        if (value.length === 0) return `Value is required!`;
      },
    });
    if (isCancel(commitString)) {
      cancel("Operation cancelled.");
      process.exit(0);
    }
    //
    const s = spinner();
    s.start(`Running ${color.bgBlue(" git add . ")}`);
    await runCommand(`git add .`);
    s.stop(
      `${checkMark} Ran ${`${color.bgBlack(
        ` ${color.green("git add .")} `
      )}`} successfully`
    );

    s.start(`Running ${color.bgBlue(" git commit -m ")}`);
    await runCommand(`git commit -m "${commitString}"`);
    s.stop(
      `${checkMark} Ran ${color.bgBlack(
        ` ${color.green("git commit -m")} `
      )} successfully`
    );

    s.start(`Running ${color.bgBlue(" git push -u origin master ")}`);
    const { stdout, stderr } = await runCommand(`git push -u origin master`);
    s.stop(
      `${checkMark} Ran ${color.bgBlack(
        ` ${color.green("git push -u origin master")} `
      )} successfully`
    );
    //
    outro(
      `${color.green(stdout)} > ${color.blue(color.underline(pkg.homepage))}`
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
