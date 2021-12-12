// This script creates a tooltip. :)

// Checks what achievement by ID, and then checks whether it already exists. If it doesnt, the player got the achievement.

// Listen, this is horrendous code... but it is what it is.
function checkAchievement() {
    var achievementID = document.getElementById('achievementID').innerHTML;
    console.log('The achievement passed was ID: ' + achievementID); // Verbose
    var achievementValue = localStorage.getItem('gettingStarted');
    if (achievementValue == 'true') { // Check if they already have it.
        console.log('Nevermind.');
    } else {
        switch (achievementID) {
            case '1': // ID 1 -- 'Getting Started'
                var totalAchievements = Number(localStorage.getItem('totalAchieve'));
                var achievementName = 'Getting Started';
                var achievementDescription = 'You played the game!';
                localStorage.setItem('gettingStarted', true);
                
                var x = document.getElementById("tooltip");
                x.innerHTML = '🏅🥳! ' + achievementName + '<br><span class="achievementDescription"><i>' + achievementDescription; + '</i></span>';
                x.className = "show";
                localStorage.setItem('totalAchieve', ++totalAchievements);
                console.log("Total Achievements is now:  " + totalAchievements)
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2800);
                break;
        }
    }
}


checkAchievement();