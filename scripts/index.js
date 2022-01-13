const {
    contextBridge,
    ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["crash", "INT_ERROR", "getProgramVersion", "throw"];
            if (channel === 'getProgramVersion') {
               var appProgramVersion
               ipcRenderer.invoke('getProgramVersion', appProgramVersion).then((result) => {
                   window.addEventListener('load', () => {
                        document.getElementById("programVersion").innerHTML = result
                   })
               })
            }
            else if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
    }
);