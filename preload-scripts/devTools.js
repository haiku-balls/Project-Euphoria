// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// This script is used by the developer tools.
// DiscordRPC



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
    const electron_hang_button = document.getElementById('electron-hang')

    electron_crash_button.addEventListener('click', ()=>{
      console.log('With pleasure.')
      process.crash();
    })
    
    electron_hang_button.addEventListener('click', ()=>{
      console.log("With pleasure.")
      process.hang();
    })
    // DiscordRPC
})