const {
  contextBridge,
  ipcRenderer
} = require("electron");

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }


    // etc
    var memory = process.getSystemMemoryInfo()
    var memoryMB = Math.floor(memory.total / 1000);
    var memoryGB = Math.floor(memoryMB / 1000);
    document.getElementById('host-os').innerHTML = process.getSystemVersion();
    document.getElementById('host-memory').innerHTML = memoryMB + ' MB (' + memoryGB + ' GB)'

    const electron_crash_button = document.getElementById('electron-crash');
    const electron_hang_button = document.getElementById('electron-hang');

    electron_crash_button.addEventListener('click', ()=>{
      console.log('With pleasure.')
      process.crash();
    })
    
    electron_hang_button.addEventListener('click', ()=>{
      console.log("With pleasure.")
      process.hang();
    })
    // DiscordRPC
    contextBridge.exposeInMainWorld(
      "api", {
          send: (channel, data) => {
              // whitelist channels
              let validChannels = ["resetData"];
              if (channel === 'resetData') {
                 ipcRenderer.send(channel, data);
              }
          },
      }
    );

    function resetData() {
      var x = document.getElementById("tooltip");
      document.getElementById("tooltip").innerText = 'Resetting data...'
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2800);
      setTimeout(function(){ window.close(); }, 3000);
  }
  document.getElementById("reset-data").addEventListener("click", resetData); 
})