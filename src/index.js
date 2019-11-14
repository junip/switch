#!/usr/bin/env node
const program = require("commander");
const inquirer = require("inquirer");
const autocompletePrompt = require("inquirer-autocomplete-prompt");
inquirer.registerPrompt("autocomplete", autocompletePrompt);
const Configstore = require("configstore");
var shell = require("shelljs");
const fuzzy = require("fuzzy");
const configStore = new Configstore("dirpathdetail");

program
  .option("-d, --directory", "Switch Repo")
  .option("-a, --add-directory", "Add Directory")
  .option("-e, --edit-directory", "Edit Directory Path")
  .option("-c, --change-directory", "Change Directory")

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
        validate: function(value) {``
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


if(program.changeDirectory) {
  
  inquirer
    .prompt([
      {
        type: "autocomplete",
        name: "directory",
        message: "Search for the directory you want to change",
        source: searchDirectory,
        pageSize: 5
      }
    ])
    .then(function(answers) {
      // assign the issue to selected user
      console.log(answers)
    });

}

function searchDirectory(answers, input) {
  input = input || '' ;
  let dirName = Object.keys(configStore.all);
  return new Promise(function(resolve) {
    setTimeout(function() {
      var fuzzyResult = fuzzy.filter(input, dirName);
      resolve(
        fuzzyResult.map(function(el) {
          return el.original
        })
      );
    }, 2000);
  });
}

