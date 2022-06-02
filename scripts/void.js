console.error('The system has encountered an unhandled exception.\nERROR_NOT_READY - Error Code 21 (0x15)')
setTimeout(() => { console.log('Where are you?') }, 15000);
setTimeout(() => { console.log('Hello? Are you there?') }, 30000);
setTimeout(() => { console.log('We have to get you out of there immediately.') }, 35000);
setTimeout(() => { console.log("Something isn't right, the system is rejecting my commands.") }, 40000);

// event
setTimeout(() => { document.getElementById('audio').muted = true; }, 41000);
setTimeout(() => { console.clear(); }, 41000);
setTimeout(() => { document.getElementById('audio2').muted = false; }, 42000);
setTimeout(() => { document.getElementById('audio2').play(); }, 42000);

setTimeout(() => { console.warn(':)') }, 45000);
setTimeout(() => { document.getElementById('counter').style.display = 'block'; }, 61000);
setTimeout(() => { document.getElementById('subCounter').style.display = 'block'; }, 61000);