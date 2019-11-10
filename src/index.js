#!/usr/bin/env node
const program = require("commander");
const inquirer = require("inquirer");
const inquirerAutoPrompt = require("inquirer-autocomplete-prompt");
const Configstore = require("configstore");
var shell = require("shelljs");
const configStore = new Configstore("dirpathdetail");

program
  .option("-d, --directory", "Switch Repo")
  .option("-a, --add-directory", "Add Directory")
  .option("-e, --edit-directory", "Edit Directory Path");

program.parse(process.argv);

if (program.directory) {
}

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
          return value.length ? true : `Please enter valid directory path`;
        }
      }
    ])
    .then(answers => {
      let result = JSON.stringify(answers, null, "  ");
      let path_name, dir_name;
      path_name = result.path_name;
      dir_name = result.dir_name;
      debugger
      console.log(dir_name, path_name)
      configStore.set({dir_name: path_name});
      //Users/admin/Documents/iserve
      // if (shell.test("-d", result.path_name)) {
        
      // } else {
      //   console.log("Please Enter a valid directory or directory path");
      // }
      console.log(configStore.all)
    });
}
