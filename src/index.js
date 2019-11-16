#!/usr/bin/env node
const program = require("commander");
const inquirer = require("inquirer");

const dir = require("./dir");
// auto complete prompt
const autocompletePrompt = require("inquirer-autocomplete-prompt");
inquirer.registerPrompt("autocomplete", autocompletePrompt);

// configstore
const Configstore = require("configstore");
const fuzzy = require("fuzzy");

// child process

var cp = require("child_process");
var path = require("path");
var os = require("os");

const configStore = new Configstore("dirpathdetail");

program
  .option("-d, --switch-directory", "Switch Directory")
  .option("-a, --add-directory", "Add Directory")
  .option("-e, --edit-directory", "Edit Directory Path")
  .option("-r, ---remove-directory", "Remove Directory")
  .option("-t, --test", "Test Command");

// look up for directory in specfic folder.
// check path if exists.
//if yes then store in config store

program.parse(process.argv);

if (program.directory) {
}

if (program.addDirectory) {
}

if (program.addDirectory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "dir_name",
        message: "Enter the Name of Directory you want to add",
        validate: function(value) {
          ``;
          return value.length ? true : "Please enter the directory Name ";
        }
      },
      {
        type: "input",
        name: "path_name",
        message: "Add your directory Path",
        validate: function(value) {
          return value.length ? true : `Please enter valid directory path`;
        }
      }
    ])
    .then(answers => {
      let result = JSON.stringify(answers, null, "  ");
      let path_name, dir_name;
      path_name = result.path_name;
      dir_name = result.dir_name;
      console.log(dir_name, path_name);
      configStore.set({ dir_name: path_name });
      //Users/admin/Documents/iserve
      // if (shell.test("-d", result.path_name)) {

      // } else {
      //   console.log("Please Enter a valid directory or directory path");
      // }
      console.log(configStore.all);
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
