const { app, BrowserWindow, Menu, dialog } = require('electron');
const EventEmitter = require('events')
const loading = new EventEmitter()

// Program variables, makes changing strings less tedious :>
var ProgramVersionName = "Build 3";
var ProgramVersionNumber = "0.3.0";
var ProgramBranch = "Internal Branch"

function betaWarning() {
   const window = BrowserWindow.getFocusedWindow();
   dialog.showMessageBox(window, {
      title: "Beta?!",
      detail: "This version of the puzzle is under development. This program also uses highly experimental builds of Electron. You will encounter issues.",
      type: "error",
      message: "This version is in Beta!"
   });
}

function ElectronDebugWindow() {
   const window = BrowserWindow.getFocusedWindow();
   const {electronVersion} = require('electron-util');
   const {chromeVersion} = require('electron-util');
   dialog.showMessageBox(window, {
      title: "Debug Info",
      type: "info",
      message: "Version " + ProgramVersionName + " (" + ProgramVersionNumber + ") - " + ProgramBranch + "\nElectron: " + electronVersion + "\nChrome: " + chromeVersion,
   });
}

function AboutWindow() {
   const aboutWin = new BrowserWindow({ width: 350, height: 350, maximizable: false, minimizable: false, movable: false, resizable: false, alwaysOnTop: true, skipTaskbar: false})
   aboutWin.loadFile("./about.html")
   aboutWin.removeMenu();
}

app.on('ready', () => {
   const win = new BrowserWindow ({
     width: 1280,
     height: 720,
   })
   loading.on('finished', () => {
   win.loadURL('http://electron-project-cutie.baka.host/');
})

  function goForward() {
    if(win.webContents.canGoForward())
      win.webContents.goForward();
  }

  function goBack() {
    if(win.webContents.canGoBack())
      win.webContents.goBack();
  }

const template = [
   {
      label: 'Tools',
      submenu: [
         {
            label: 'Back',
            accelerator: 'left',
            click: async () => {
               goBack();
            }
         },
         {
            label: 'Foward',
            accelerator: 'right',
            click: async () => {
               goForward();
            }
         },
         {
            type: 'separator'
         },
         {
            role: 'reload'
         },
         {
            role: 'forcereload'
         },
         {
            role: 'toggledevtools'
         },
         {
            type: 'separator'
         },
         {
            role: 'togglefullscreen'
         }
      ],
   },
   {
      label: 'About',
      submenu: [
         {
            label: 'Program Info',
            accelerator: 'ctrl+a',
            click: async () => {
               AboutWindow();
            }
         },
         {
            label: 'Electron',
            accelerator: 'ctrl+shift+a',
            click: async () => {
               ElectronDebugWindow();
            }
         }
      ],
   },
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.whenReady().then(() => {
   setTimeout(() => { betaWarning(); }, 1000);
   setTimeout(() => loading.emit('finished'), 5000);
})
}) // this here in the end of the app.on, DONT REMOVE PLEASE.


// DiscordRPC

const client = require("discord-rich-presence")('909662852850257941');

client.updatePresence({
   details: ProgramVersionName + " - " + ProgramBranch,
   state: 'Completing Puzzles...',
   startTimestamp: Date.now(),
   largeImageKey: "logo",
   largeImageTooltip: "Electron 16",
   instance: true
})