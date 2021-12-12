// Making strings less tedious since '21
window.addEventListener('DOMContentLoaded', () => {
    var ProgramVersionNumber = process.env.npm_package_version;
    try {
        document.getElementById("programVersion").innerHTML = ProgramVersionNumber
    }
    catch {
        
    }
})

// For the INT_ERROR page.
const {
    contextBridge,
    ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["crash", "INT_ERROR"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
    }
);