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
  .option("-r, --remove-directory", "Remove Directory");

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
              return "Please enter a valid directory path. The given path doesnot exists";
            }
          } else {
            return "Please enter directory path";
          }
        }  
      }
    ])
    .then(answers => {
      let path, directory;      
      directory = answers["dir_name"]
      path = answers["path_name"]
      dir.addDirectoryPath(directory, path);
      console.log(chalk.green.bold(`Directory added successfully`))
    });
}

// 3. Edit Directory
if(program.editDirectory) {
  let dirs = Object.keys(configStore.all);
  if(dirs.length > 0) {
    inquirer
    .prompt([
      {
        type: "autocomplete",
        name: "directory",
        message: "Search for the directory you want to EDIT",
        source: dir.searchDirectory,
        pageSize: 5
      }
    ])
    .then(function(answers) {
      let selectedDirectory = answers["directory"];
      inquirer.prompt([
        {
          type: 'list',
          name: 'option',
          message: 'What do you want to change?',
          choices: ['Directory name', 'Directory path']
        }
      ]).then(answers => {
        if(answers['option'] === 'Directory name') {
          // DIRECTORY NAME EDIT
          inquirer
            .prompt([
              {
                type: "input",
                name: "dir_name",
                message: "Enter the new name of the directory",
                validate: function(value) {
                  return value.length ? true : "Please enter the directory Name ";
                }
              }
            ]).then(answers => {
              let dirname = answers['dir_name']
              let existingPath = configStore.get(selectedDirectory) 
              configStore.delete(selectedDirectory)
              dir.addDirectoryPath(dirname, existingPath)
              console.log(chalk.blue.bold('Directory has renamed successfully'))
            })
        } else {
          // DIRECTORY PATH EDIT
          inquirer
            .prompt([
              {
                type: "input",
                name: "path_name",
                message: "Enter the path for the directory",
                validate: function(value) {
                  if(value.length) {
                    if(dir.isExists(value)) {
                      return dir.isDirectory(value) ? true : "Please enter a valid directory path. The given path is not a directory"
                    } else {
                      return "Please enter a valid directory path. The given path doesnot exists";
                    }
                  } else {
                    return "Please enter directory path";
                  }
                }
              }
            ]).then(answers => {
              let newPath = answers['path_name']
              let existingPath = configStore.get(selectedDirectory)
              configStore.delete(selectedDirectory)
              dir.addDirectoryPath(selectedDirectory, newPath)
              console.log(chalk.blue.bold('Directory path has changed successfully'))
          })
        }
      })
    });
  } else {
    console.log(chalk.cyan.bold(
      'No directories found to edit.' + ' Use ' +
      chalk.blue.underline.bold('switch -a ') +
      'command to add directories. '
    ));
  } 
}


//4. Remove Directory
if(program.removeDirectory) {
  let dirs = Object.keys(configStore.all);
  if(dirs.length > 0) {
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
  } else {
    console.log(chalk.cyan.bold(
      'No directories found to delete.' + ' Use ' +
      chalk.blue.underline.bold('switch -a ') +
      'command to add directories. '
    ));
  }  

}
