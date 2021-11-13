const { app, BrowserWindow, Menu } = require('electron')
const { dialog } = require('electron')
const isMac = process.platform === 'darwin' // Mac fallback, not sure if mac will be supported in the first place.
const {debugInfo} = require('electron-util');

function betaWarning() {
   const window = BrowserWindow.getFocusedWindow();
   dialog.showMessageBox(window, {
      title: "This is in beta!",
      type: "warning",
      message: "This version of the puzzle is in early development phases. Currently only available internally, you will encounter issues.",
   });
}

function startupDebugWindow() {
   const window = BrowserWindow.getFocusedWindow();
   dialog.showMessageBox(window, {
      title: "Debug Info",
      type: "info",
      message: "Debug info \n" + debugInfo(),
   });
}

app.on('ready', () => {
   const win = new BrowserWindow ({
     width: 1280,
     height: 720
   })
   win.loadFile('./before.html')

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
      label: 'Debug',
      submenu: [
         {
            label: 'Client Info',
            click: async () => {
               startupDebugWindow();
            }
         }
      ],
   },
]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

app.whenReady().then(() => {
   setTimeout(() => { betaWarning(); }, 1000);
})
})