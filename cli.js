#!/usr/bin/env node

import { program } from "commander";
// import packageJson from "./package.json";
import { exec } from "child_process";
import path from "path";

// program.version(packageJson.version);

program
  .arguments("<project-name>")
  .description("Create a new React Server Components project")
  .option("--ssr", "create rsc + ssr app")
  .action((projectName, options) => {
    const projectPath = path.join(process.cwd(), projectName);
    let repositoryUrl = "https://github.com/roggc/rsc.git";

    if (options.ssr) {
      repositoryUrl = "https://github.com/roggc/rsc-ssr.git";
    }

    console.log(
      `Creating a new React Server Components project: ${projectName}`
    );

    // Clone the repository
    exec(
      `git clone ${repositoryUrl} ${projectName}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error cloning the repository: ${error}`);
          return;
        }

        // Change to the project directory
        process.chdir(projectPath);

        exec("git remote remove origin", (error, stdout, stderr) => {
          if (error) {
            console.error(`Error removing the 'origin' remote: ${error}`);
            return;
          }

          console.log("'origin' remote removed successfully.");

          // Install project dependencies
          exec("npm install", (error, stdout, stderr) => {
            if (error) {
              console.error(`Error installing dependencies: ${error}`);
              return;
            }

            console.log("Project setup complete.");
          });
        });
      }
    );
  });

program.parse(process.argv);
