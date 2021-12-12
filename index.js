const { app, BrowserWindow, Menu, dialog, nativeImage, Tray, ipcMain } = require('electron');
let tray = null
const path = require('path');

// Program variables, makes changing strings less tedious :>
var ProgramVersionName = "Build 4";
var ProgramVersionNumber = process.env.npm_package_version;
var ProgramBranch = "Internal Branch"

function betaWarning() {
   const window = BrowserWindow.getFocusedWindow();
   dialog.showMessageBoxSync(window, {
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
   const aboutWin = new BrowserWindow({ 
      width: 350, 
      height: 350, 
      maximizable: false, 
      minimizable: false, 
      movable: false, 
      resizable: false, 
      alwaysOnTop: true, 
      skipTaskbar: false,
      webPreferences: {
         devTools: true,
         preload: path.join(__dirname, './scripts/about.js') // Used for electron version.
      }
   })
   aboutWin.loadFile("./about.html")
   aboutWin.removeMenu();
}

function INTERRORWindow() {
   const intErrorWin = new BrowserWindow({ 
      width: 1280,
      height: 720,
      maximizable: false, 
      minimizable: false, 
      movable: false, 
      resizable: false, 
      alwaysOnTop: true, 
      skipTaskbar: false,
      title: 'Project Cutie - INT_ERROR',
      webPreferences: {
         devTools: true,
         preload: path.join(__dirname, './scripts/index.js')
      }
   })
   intErrorWin.loadURL('http://electron-project-cutie.baka.host/A/INT_ERROR.html')
   intErrorWin.removeMenu();
   intErrorWin.webContents.openDevTools();
}

function debugWindow() {
   const debugWin = new BrowserWindow ({
      width: 1200,
      height: 900,
      maximizable: false,
      resizable: false,
      movable: false,
      title: 'Debug Tools',
      icon: path.join(__dirname, './dev/debugWinIcon.png'),
      webPreferences: {
         preload: path.join(__dirname, './preload-scripts/devTools.js')
      }
   })
   debugWin.loadFile('./dev/devTools.html')
   debugWin.removeMenu();
   debugWin.webContents.openDevTools();
}

app.on('ready', () => {
   // Other functions
   betaWarning();

   // System Tray
   const icon = nativeImage.createFromPath('./etc/trayIcon.png')
   tray = new Tray(icon)
   const contextMenu = Menu.buildFromTemplate([
      {
         label: 'Project Cutie Build 4', 
         type: 'normal', 
         enabled: false
      },
      {
         label: '', 
         type: 'separator'
      },
      {
         label: 'Dev Tools', 
         type: 'normal',
         click: async () => {
            debugWindow();
         }
      },
      {
         label: 'Quit', 
         type: 'normal',
         click: async () => {
            app.quit();
         }
      }
   ])
   
   tray.setContextMenu(contextMenu)
   tray.setToolTip('Project Cutie')

   // Main Browser Window
   const win = new BrowserWindow ({
     width: 1280,
     height: 720,
     show: false,
     webPreferences: {
        preload: path.join(__dirname, './scripts/index.js'),
     }
   })
   win.loadURL('http://electron-project-cutie.baka.host/');
   win.webContents.session.clearCache();
   win.webContents.setFrameRate(60);
   win.webContents.setBackgroundThrottling(true);
   win.once('ready-to-show', () => {
      win.show();
   })

  function goForward() {
    if(win.webContents.canGoForward())
      win.webContents.goForward();
  }

  function goBack() {
    if(win.webContents.canGoBack())
      win.webContents.goBack();
  }
  // Special Event for the INT_ERROR page.
  var intRAN = false;
  ipcMain.on("INT_ERROR", (event, args) => {
     if (intRAN === false) { // funny debounce.
      intRAN = true;
      win.webContents.goBack();
      INTERRORWindow();
     }
     else {
        return
     }
  });

const mainWindowMenu = [
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
            accelerator: 'ctrl+shift+e',
            click: async () => {
               ElectronDebugWindow();
            }
         }
      ],
   },
   {
      label: 'Debug',
      submenu: [
         {
            label: 'Debug Options',
            accelerator: 'ctrl+shift+d',
            click: async () => {
               debugWindow();
            }
         },
         {
            type: 'separator'
         },
         {
            label: 'Electron Crash',
            click: async () => {
               process.crash();
            }
         },
         {
            label: 'Electron Hang',
            click: async () => {
               process.hang();
            }
         },
      ],
   },
]

const menu = Menu.buildFromTemplate(mainWindowMenu)
Menu.setApplicationMenu(menu)

}) // this here in the end of the app.on, DONT REMOVE PLEASE.

// ooo shiny.
app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
     app.quit()
   }
 })

// Renderer Events
ipcMain.on("crash", (event, args) => {
   console.log('Night night.')
   process.crash();
});

// DiscordRPC

const client = require("discord-rich-presence")('909662852850257941');
client.updatePresence({
   details: ProgramVersionName + " - " + ProgramBranch,
   state: 'Completing Puzzles...',
   startTimestamp: Date.now(),
   largeImageKey: "logo",
})