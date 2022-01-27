const { app, BrowserWindow, Menu, dialog, nativeImage, Tray, ipcMain } = require('electron');
let tray = null
const path = require('path');

// Updater code
// const updater = require('src/index');
// updater.init('https://raw.githubusercontent.com/megahertz/electron-simple-updater/master/example/updates.json');

// Program variables, makes changing strings less tedious :>
var ProgramVersionName = "Build 4";
var ProgramVersionNumber = app.getVersion();
var ProgramBranch = "Internal "
var BuildDate = '1/24/22'

// Discord RPC consts
const rpc = require("discord-rpc");
const client = new rpc.Client({ transport: 'ipc' });
const config = require('./config.json');
var RPCVersion = 'Internal Build 4 int-'

function betaWarning() {
   const window = BrowserWindow.getFocusedWindow();
   dialog.showMessageBoxSync(window, {
      title: "Project Cutie - Internal Build",
      message: "Woah! This is experimental!",
      detail: "You're running an internal build of the Project Cutie Program. This version uses experimental electron builds, and the program itself may have issues. Please report them if you encounter any, thanks.",
      type: "error"
   });
}

// For crashes.
function crashExitNotice() {
   const window = BrowserWindow.getFocusedWindow();
   dialog.showMessageBoxSync(window, {
      title: "Project Cutie - Crash",
      message: "Uh oh, Electron has crashed.",
      detail: "This may or may not have been intentional. The program will be terminated. I'm sorry :(",
      type: "error"
   });
}

function ElectronDebugWindow() {
   const window = BrowserWindow.getFocusedWindow();
   const {electronVersion } = require('electron-util');
   const {chromeVersion} = require('electron-util');
   dialog.showMessageBox(window, {
      title: "Debug Info",
      type: "info",
      message: "Version: " + ProgramBranch + ProgramVersionName + " (" + ProgramVersionNumber + ")" + "\nBuild Date: " + BuildDate + "\nElectron: " + electronVersion + "\nChrome: " + chromeVersion,
   });
}

function AboutWindow() {
   const aboutWin = new BrowserWindow({ 
      width: 350, 
      height: 350, 
      maximizable: false, 
      minimizable: false,
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
      closable: false,
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
   const icon = nativeImage.createFromPath(path.join(__dirname, './etc/trayIcon.png'))
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
         label: 'Debug Tools', 
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
      client.request('SET_ACTIVITY', {
            pid: process.pid,
            activity: {
            timestamps: {
               start: config.TimeStart == "" ? new Date().getTime(): Number(config.TimeStart),
            },
            details: 'Build Internal? Internal Build Internal Build Internal Build Internal Build Internal Build Internal Build',
            state: 'Completing?????????????@??<$nil;:>',
            assets: {
               large_image: config.LargeImage,
               large_text: config.LargeImageText
            },
            buttons : [
               {
                  label : config.Button1,url : config.Url1
               }
            ]
         }
      })
     }
     else {
        return;
     }
  });

   ipcMain.on('resetData', (event, args) => {
      function resetData() {
         win.webContents.session.clearStorageData();
         win.reload();
      }
      setTimeout(() => { resetData(); }, 3000) // Waits for the tooltip, and the window to close.
   })

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
   crashExitNotice();
   process.crash();
});

ipcMain.on("throw" , (event, args) => {
   throw "[18364:0108/223912.226:ERROR:CONSOLE(1)] 'TypeError: Cannot read properties of undefined (reading 'RPC_GATE_FAILED') TypeError: Cannot read properties of undefined (reading 'RPC_GATE_FAILED')"
   const window = BrowserWindow.getFocusedWindow();
   dialog.showMessageBoxSync(window, {
      type: 'error',
      title: "Project Cutie - Uncaught Exception",
      message: "An unhandled expection was thrown in the main process.",
      detail: "'TypeError: Cannot read properties of undefined (reading 'RPC_GATE_FAILED') at: index.js:-1'"
   })
   dialog.showMessageBoxSync(window, {
      type: 'error',
      title: "Project Cutie - Uncaught Exception",
      message: "An unknown error occurred.",
      detail: "ERROR:gpu_init.cc(454) Passthrough is not supported. The program will be terminated."
   })
   app.quit();
});

ipcMain.handle("getProgramVersion", async (event, appProgramVersion) => {
   const result = await app.getVersion();
   return result
});

// Crash, error events.

app.on('child-process-gone', () => {
   crashExitNotice();
})

app.on('renderer-process-crashed', () => {
   crashExitNotice();
})

process.on('unhandledRejection', (error) => {
   console.log('An unhandled rejection was thrown.')
   console.log(error)
})

process.on('uncaughtException', (error) => {
   console.log('An uncaught exception was thrown.')
   console.log(error)
})

// Discord RPC

try {
   client.login({ clientId : config.ClientID })
}
catch {
   console.error('(RPC) Failed to initialize.')
}

// Discord RPC

client.on('ready', () => {
try {
   client.request('SET_ACTIVITY', {
      pid: process.pid,
      activity: {
      timestamps: {
         start: config.TimeStart == "" ? new Date().getTime(): Number(config.TimeStart)
      },
      details: RPCVersion + ProgramVersionNumber,
      state: config.State,
      assets: {
         large_image: config.LargeImage,
         large_text: config.LargeImageText
      },
      buttons : [
         {
            label : config.Button1,url : config.Url1
         }
      ]
      }
   })
} 
catch {
   console.error('(RPC) Failed to set the activity.')
}
})