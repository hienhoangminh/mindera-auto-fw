import { exec } from "child_process";
import * as process from "process";
import dotenv from "dotenv";

dotenv.config({ path: "./env/.env" });

const parallelValue = process.env.PARALLEL || "1";
const retryValue = process.env.RETRY || "0";
const common =
  `cucumber-js src/features/*.feature ` +
  `--require-module ts-node/register ` +
  `--require src/step-definitions/**/**/*.ts ` +
  `-f json:./reports/report.json ` +
  `--format html:./reports/report.html ` +
  `--retry ${retryValue} --parallel ${parallelValue} --tags "not @ignore"`;

// Define an interface for the profiles object
// It defines an interface where each key is a string and each value is also a string
interface ProfileCommands {
  [key: string]: string;
}

// Define a command strings for different test profiles
const profiles: ProfileCommands = {
  smoke: `${common} --tags "@smoke"`,
  regression: `${common} --tags "@regression"`,
  cart: `${common} --tags "@cart"`,
};

// Get the third command-line argument and assign it to the profile
// i.e. smoke, regression etc
const profile = process.argv[2];

// Construct the command string based on the selected profile
// command is the full command to run the tests for selected profile
let command = `npx cucumber-js ${
  profiles[profile as "smoke" | "regression" | "cart"]
}`;

// print the constructed command
// console.log(command);

// Execute the command:
exec(command, { encoding: "utf-8" }, (error: Error | null, stdout: string) => {
  // log the output of the command
  console.log(stdout);
  //if error is occurred during execution
  if (error) {
    throw new Error(
      "⚠️ 💥 Some automation test(s) have failed! - Please review ⚠️ 💥"
    );
  }
});
