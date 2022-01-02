const {
    contextBridge,
    ipcRenderer
} = require("electron");

// electron uses "electron [version]-[branch].[build]"
var electronVersion = new String(process.versions.electron)
electronVersion = electronVersion.substring(0, electronVersion.lastIndexOf('.'))
console.log(electronVersion)
window.addEventListener('load', () => {
    document.getElementById('electron-version').innerHTML = electronVersion;
})

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel) => {
            // whitelist channels
            let validChannels = ["getProgramVersion"];
            if (validChannels.includes(channel)) {
               var appProgramVersion
               ipcRenderer.invoke('getProgramVersion', appProgramVersion).then((result) => {
                window.addEventListener('load', () => {
                    var ProgramVersionBuildNumber = "4";
                    console.log(result)
                    document.getElementById("programVersion").innerHTML = ProgramVersionBuildNumber + " (" + result + ")"
                })
           })
            }
        },
    }
)