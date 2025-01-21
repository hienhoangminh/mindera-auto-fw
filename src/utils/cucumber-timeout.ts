import { setDefaultTimeout } from "@cucumber/cucumber";
import { config as loadEnv } from "dotenv";

const env = loadEnv({ path: "./env/.env" });
const cucumberTimeout = parseInt(env.parsed?.CUCUMBER_TIMEOUT || "600000");

// if it is too low then this will affect Playwright timeouts;
// Throwable exception: `function timed out, ensure the promise resolves within 5000 milliseconds`
setDefaultTimeout(cucumberTimeout);
