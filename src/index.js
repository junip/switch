#!/usr/bin/env node
const program = require("commander");
const fuzzy = require("fuzzy");
const inquirer = require("inquirer");
const autocompletePrompt = require("inquirer-autocomplete-prompt");
inquirer.registerPrompt("autocomplete", autocompletePrompt);
const Configstore = require("configstore");
const configStore = new Configstore("directorydetails");

const dir = require("./dir");


program
  .option("-d, --switch-directory", "Switch Directory")
  .option("-a, --add-directory", "Add Directory")
  .option("-e, --edit-directory", "Edit Directory Path")
  .option("-r, ---remove-directory", "Remove Directory");

program.parse(process.argv);

if (program.addDirectory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "dir_name",
        message: "Enter the Name of Directory you want to add",
        validate: function(value) {
          return value.length ? true : "Please enter the directory Name ";
        }
      },
      {
        type: "input",
        name: "path_name",
        message: "Add your directory Path",
        validate: function(value) {
          if(value.length) {
            if(dir.isExists(value)) {
              return dir.isDirectory(value) ? true : "Please enter a valid directory path. The given path is not a directory"
            } else {
              return "Please enter a valid path. The given path doesnot exist"
            } 
          } else {
            return "Please enter directory path";
          }
        }
      }
    ])
    .then(answers => {
      let path, directory;
      path = answers["path_name"]
      directory = answers["dir_name"]
      dir.addDirectoryPath(path, directory);
      console.log("Directory Added")
    });
}

// Switch Directory
if (program.switchDirectory) {
  inquirer
    .prompt([
      {
        type: "autocomplete",
        name: "directory",
        message: "Search for the directory you want to change",
        source: dir.searchDirectory,
        pageSize: 5
      }
    ])
    .then(function(answers) {
      // assign the issue to selected user
      let selectedDirectory = answers["directory"];
      let path = configStore.get(selectedDirectory);
      dir.changeDirectory(path);
    });
}
