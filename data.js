// Progression check.

if (localStorage.getItem('chp') && localStorage.getItem('totalAchieve')) { // Check for both chapter data and achievement data. If one of them doesn't exist, create them.

    // Chapter
    var chapterValue = localStorage.getItem('chp');

    // Achievements (this is messy, but... oh well)
    var totalAchieve = localStorage.getItem('totalAchieve');
    
    // log
    console.log("Baka's Debugger - The user already has data.");
    console.log("User data: \nChapter: " + chapterValue + "\nTotal Achievements: " + totalAchieve);
} else { // When no data.
    console.log("Baka's Debugger - The user doesn't have data. Creating defaults...");
    localStorage.setItem('chp', 1); // 1 is default.

    // Achievements
    // Each achievement will have its own Item, being set to true or false. (Defaulting false here.)
    // A total achievement value will also be present.
    // Changing this would be to define the total achievement value and then add 1 to it.
    localStorage.setItem('gettingStarted', false) // (Default: false) ID 1; Achievement Name: 'Getting Started.'; Get it by playing the game.
    // Total
    localStorage.setItem('totalAchieve', 0) // 0 is always default.
}