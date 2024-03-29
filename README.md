# switch
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)]() [![forthebadge](https://forthebadge.com/images/badges/built-with-swag.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/powered-by-oxygen.svg)](https://forthebadge.com)

![npm](https://img.shields.io/npm/dm/switchd) ![made with nodejs](https://img.shields.io/badge/madewith-node.js-green.svg) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![license](https://img.shields.io/github/license/visionmedia/superagent.svg)](LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=shields)](http://makeapullrequest.com)

<div align="center">
<img src="assets/switch-icon.png"  width=180 >
</div>

## Motivation

We often need to switch among different projects and it becomes hectic to change workspace or remember your workspace path so that you can instanly change to a different workspace from one workspace.

So the goal of this project is to minimize the effort of workspace change with tab's autocomplete or remembering project path. Meanwhile it gives you the flexibility to instantly switch among your dependent project/directory and do the necessary stuff in your terminal.

### Forget typing `cd ..` & tab autocompletion or adding aliases for directories.

<p align="center">
<img src="assets/switch.gif" height="300" width="340">
</p>

## Install using NPM

You can use directly install the package using 
[NPM](https://www.npmjs.com/package/switch)  or  [YARN](https://yarnpkg.com/en/package/switch)

```sh
 npm install -g switchd
```
```   
 yarn add switchd
```

### use the below command to get started

```sh
 npx switchd
```

## Or By Cloning the repository

Install all dependency 


```sh
npm install 
```

### Create the symlink. This command will help you execute `switch` commands at global level 

```
npm link or sudo npm link
```

## After install  

### Run the following

To get the available commands
```
switch --help 
```

![](assets/switch-commands.png)

You need to add directory name & directory path first to start with.While adding directory give the full path using `pwd`

```
switch -a
```
![](assets/add-directory.png)

After adding switch to any workspace on the fly

```
switch -d
```

![](assets/switch-dir.png)


## Contribution

We hope that you will consider contributing to switch. Please read this short overview [Contribution Guidelines](https://github.com/junipdewan/switch/blob/master/CONTRIBUTING.md) for some information about how to get started 

## MIT License

**switch** is available under the **MIT license**. See the [LICENSE](https://github.com/junipdewan/switch/blob/master/LICENSE) file for more info.

Copyright (c) 2019 <junipd2@gmail.com>


