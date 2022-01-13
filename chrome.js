const { BrowserWindow, dialog, app } = require('electron');
const {chromeVersion} = require('electron-util');
const window = BrowserWindow.getFocusedWindow();

app.on('ready', () => {
    console.log('Chrome: ' + chromeVersion)
    dialog.showMessageBoxSync(window, {
        title: "Project Cutie - Chrome",
        message: "Electron is using:",
        detail: "Chromium: " + chromeVersion,
        type: "info"
    });
    app.quit();
})