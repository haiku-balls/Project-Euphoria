// This script creates a tooltip. :)

// Checks what achievement by ID, and then checks whether it already exists. If it doesnt, the player got the achievement.

// Listen, this is horrendous code... but at least it works LMFAO.

var achievementGetSFX = new Audio('https://project-cutie-electron.surge.sh/BGM/tada.ogg')
achievementGetSFX.volume = 0.5;
function checkAchievement() {
    var achievementID = document.getElementById('achievementID').innerHTML;
    console.log('The achievement passed was ID: ' + achievementID); // Verbose
    var achievementValue = localStorage.getItem('gettingStarted');
    if (achievementValue == 'true') { // Check if they already have it.
        
    } else {
        switch (achievementID) {
            case '1': // ID 1 -- 'Getting Started'
                var totalAchievements = Number(localStorage.getItem('totalAchieve'));
                var achievementName = 'Getting Started';
                var achievementDescription = 'You played the game!';
                localStorage.setItem('gettingStarted', true);
                achievementGetSFX.play();
                var x = document.getElementById("tooltip");
                x.innerHTML = '🏅🥳! ' + achievementName + '<br><span class="achievementDescription"><i>' + achievementDescription; + '</i></span>';
                x.className = "show";
                localStorage.setItem('totalAchieve', ++totalAchievements);
                console.log("Total Achievements is now:  " + totalAchievements)
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4200);
                break;
        }
    }
}


checkAchievement();