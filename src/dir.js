/**
 * Directory related APIs
 * i.e Add/Edit/Remove/Search
 */

// configstore
const Configstore = require("configstore");
const configStore = new Configstore("dirpathdetail");
const fuzzy = require("fuzzy");
const cp = require("child_process");

module.exports = {
  /**
   * Search Directroy on the fly powered by fuzzy search
   * @param {} answers
   * @param {*} input
   */
  searchDirectory: function(answers, input) {
    input = input || "";
    // returns the stored directory names which is stored with its location
    // in configstore
    let dirName = Object.keys(configStore.all);
    return new Promise(function(resolve) {
      setTimeout(function() {
        var fuzzyResult = fuzzy.filter(input, dirName);
        resolve(
          fuzzyResult.map(function(el) {
            return el.original;
          })
        );
      }, 2000);
    });
  },

  /**
   * Add Directory 
   */
  addDirectoryPath: function(path, cb) {},

  removeDirectoryPath: function(path, cb) {},

  editDirectoryPath: function(path, cb) {},

  /**
   * Check if the directory path is valid or not
   */

  checkValidPath: function(path,cb) {},

  /**
   * Change Directory on the base of its given file path
   *
   *  A child process cannot modify the environment of a parent proces
   * `https://stackoverflow.com/questions/19803748/change-working-directory-in-my-current-shell-context-when-running-node-script`
   *
   * Below solution is extracted from `stackoverflow`
   * `https://stackoverflow.com/questions/54165208/how-can-i-change-actual-shell-cd-with-nodejs`
   *
   */
  changeDirectory: function(path) {
    cp.spawn(
      // With this variable we know we use the same shell as the one that started this process
      process.env.SHELL,
      {
        // Change the cwd
        cwd: `${path}`,

        // This makes this process "take over" the terminal
        stdio: "inherit"
      }
    );
  }
};
