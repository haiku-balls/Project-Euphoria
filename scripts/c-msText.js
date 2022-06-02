console.log(
    'An error has occurred. To continue: \n \n Press ENTER to return to windows, or \n Press CTRL+ALT+DELETE to restart your computer. If you do this, \n you will lose any unsaved information in all open applications. \n \n ERROR: U1lTX0VSUl9DT0RFOiBFUlJPUl9CQURfRU5WSVJPTk1FTlQ='
)

document.addEventListener('keydown', function(event) {
    if (event.code == 'Enter') {
      window.location.href = './c-microsoft-catalog'
    }
  });