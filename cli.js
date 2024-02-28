#!/usr/bin/env node

import { program } from "commander";
import { exec } from "child_process";
import path from "path";
import fs from "fs-extra"; // Import fs-extra en lugar de fs

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
    exec(`git clone ${repositoryUrl} ${projectName}`, (error) => {
      if (error) {
        console.error(`Error cloning the repository: ${error}`);
        return;
      }

      // Change to the project directory
      process.chdir(projectPath);

      // Remove the existing .git directory using fs-extra
      fs.remove(path.join(projectPath, ".git"), (error) => {
        if (error) {
          console.error(`Error removing the existing .git directory: ${error}`);
          return;
        }

        console.log(".git directory removed successfully.");

        // Initialize a new git repository
        exec("git init", (error) => {
          if (error) {
            console.error(`Error initializing a new git repository: ${error}`);
            return;
          }

          // Add all files to the new repository
          exec("git add .", (error) => {
            if (error) {
              console.error(`Error adding files to the repository: ${error}`);
              return;
            }

            // Commit the changes
            exec('git commit -m "Initial commit"', (error) => {
              if (error) {
                console.error(`Error creating the initial commit: ${error}`);
                return;
              }

              console.log("Initial commit created successfully.");

              // Install project dependencies
              exec("npm install", (error) => {
                if (error) {
                  console.error(`Error installing dependencies: ${error}`);
                  return;
                }

                console.log("Project setup complete.");
              });
            });
          });
        });
      });
    });
  });

program.parse(process.argv);
