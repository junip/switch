#!/usr/bin/env node
const program = require("commander");
const fuzzy = require("fuzzy");
const inquirer = require("inquirer");
const autocompletePrompt = require("inquirer-autocomplete-prompt");
inquirer.registerPrompt("autocomplete", autocompletePrompt);
const Configstore = require("configstore");
const configStore = new Configstore("directorydetails");
const chalk = require('chalk');

const dir = require("./dir");


program
  .option("-d, --switch-directory", "Switch Directory")
  .option("-a, --add-directory", "Add Directory")
  .option("-e, --edit-directory", "Edit Directory Path")
  .option("-r, ---remove-directory", "Remove Directory");

program.parse(process.argv);


// Switch Directory
if (program.switchDirectory) {
  let dirs = Object.keys(configStore.all);
  if(dirs.length > 0) {
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
      let selectedDirectory = answers["directory"];
      let path = configStore.get(selectedDirectory);
      dir.changeDirectory(path);
    });
  } else {
    console.log(chalk.green(
      'Please add directories first that you frequently switch.' + ' Use ' +
      chalk.blue.underline.bold('switch -a ') +
      'command to add directories. '
    ));
  }
}


// 2. Add Directory
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


// 3. Edit Directory

if(program.editDirectory) {
  inquirer
  .prompt([
    {
      type: "autocomplete",
      name: "directory",
      message: "Search for the directory you want to EDIT",
      source: dir.searchDirectory,
      pageSize: 5
    },
    {
      type: "input",
      name: "dir_name",
      message: "Enter the Name of Directory you want to add",
      validate: function(value) {
        return value.length ? true : "Please enter the directory Name ";
      }
    },

  ])
  .then(function(answers) {
    let selectedDirectory = answers["directory"];
    let path = configStore.get(selectedDirectory);
    dir.changeDirectory(path);
  });
}


//4. Remove Directory
if(program.removeDirectory) {
  inquirer
  .prompt([
    {
      type: "autocomplete",
      name: "directory",
      message: "Search for the directory you want to REMOVE",
      source: dir.searchDirectory,
      pageSize: 5
    }
  ])
  .then(function(answers) {
    let selectedDirectory = answers["directory"];
    configStore.delete(selectedDirectory);
    console.log(chalk.bgRed.bold(`Removed ${selectedDirectory} successfully`))
  });

}
