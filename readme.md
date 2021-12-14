[![Build/release](https://github.com/bakabakabakabakabaka/Project-Cutie-Electron/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/bakabakabakabakabaka/Project-Cutie-Electron/actions/workflows/build.yml)
  
# About this program
This program is based off the original Project Cutie, a simple website with puzzles for the user's to solve.  
[original build here](http://project-cutie.baka.host/) & [original repo](https://github.com/bakabakabakabakabaka/Project-Cutie)  
This version of the program uses Electron (subject to change) to enhance the possible puzzles, and to create a much more streamlined client.  
*Please note: This program is not finished, and uses experimental builds of Electron.*

# Master branch
Used for stable builds, and will have the best code. 
The [dev branch](https://github.com/bakabakabakabakabaka/Project-Cutie-Electron/tree/dev) is used for experimental and under-development builds, usually containing early features that could cause issues.  
  
  
# Dev Notes
```
For pushing release:
Update the version in your project's package.json file (e.g. 1.2.3)
Commit that change (git commit -am v1.2.3)
Tag your commit (git tag v1.2.3). Make sure your tag name's format is v*.*.*. Your workflow will use this tag to detect when to create a release
Push your changes to GitHub (git push && git push --tags)
```
