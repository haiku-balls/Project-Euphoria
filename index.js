const {app, BrowserWindow, Menu, MenuItem} = require('electron')
const url = require('url')
const path = require('path')

let win

function createWindow() {
   win = new BrowserWindow({width: 1280, height: 720})
   win.loadURL(url.format ({
      pathname: path.join(__dirname, '/before.html'),
      protocol: 'file:',
      slashes: true
   }))
}

const template = [   
   {
      label: 'View',
      submenu: [
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
      ]
   },
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
app.on('ready', createWindow)