// Listen, this is horrendous code... but at least it works LMFAO. (This was the last time you heard from him... /j)
// Update: 4/12/22: It's *less* horrible now.

// Define and set the volume of the tada SFX.
var achievementGetSFX = new Audio('https://media-project-euphoria.surge.sh/tada.ogg')
var mythicalSFX = new Audio('https://media-project-euphoria.surge.sh/winners-short.mp3');
achievementGetSFX.volume = 0.25;
mythicalSFX.volume = 0.25;

// Get the total achievement count and convert it into a number.
var totalAchievements = Number(localStorage.getItem('totalAchieve'));

var ilhDone = false;

const achievementNames = {
    '1': 'gettingStarted',
    '2': 'firstWorm',
    '3': 'h_aNC',
    'C-1': 'c_ilh',
    'C-2': 'c_tg'
}

const pageAchievements = {
    'index.html': '1',
    'c-microsoft.html': '2',
    'cami.html': '3',
}

// Tooltip function.
function showTooltip(achievementName, achievementDescription, mythical) { 
    if (mythical == true) {
        mythicalSFX.play();
    }
    else {
        achievementGetSFX.play();
    }
    var x = document.getElementById("tooltip");
    x.innerHTML = achievementName + '<br><span class="achievementDescription"><i>' + achievementDescription; + '</i></span>';
    if (mythical == true) {
        x.className = "mythicalShow";
        setTimeout(function(){ x.className = x.className.replace("mythicalShow", ""); }, 8500);
    }
    else {
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4500);
    }
}

// Check an achievement. (The ID is passed from the achievementID hidden in pages that give you it. (TODO: Maybe improve this later.))
function checkAchievement() {
    var pageName = document.getElementById('pageName').innerHTML;
    var achievementID = pageAchievements[pageName];

    // Switch for achievement IDs.
    switch (pageName) {
        case 'index.html': // ID 1 -- 'Getting Started'
            if (localStorage.getItem(achievementNames[achievementID]) == "true") {
                break;
            }
            var achievementName = '🏅🥳 <span style="color: green">Getting Started</span>';
            var achievementDescription = 'You played the game!';
            localStorage.setItem(achievementNames[achievementID], true);

            // Add 1 to the total achievement count.
            localStorage.setItem('totalAchieve', ++totalAchievements);
            showTooltip(achievementName, achievementDescription);
            break;
        case 'c-microsoft.html': // ID 2 -- 'First Wormhole'
            if (localStorage.getItem(achievementNames[achievementID]) == 'true') {
                break;
            }
            var achievementName = '🤔 <span style="color: green">Wormholes?</span>';
            var achievementDescription = 'Traverse through a wormhole.';
            localStorage.setItem(achievementNames[achievementID], true);
            localStorage.setItem('totalAchieve', ++totalAchievements);
            showTooltip(achievementName, achievementDescription);
            break;
        case 'cami.html': // ID 3 -- 'A new chapter.'
            if (localStorage.getItem(achievementNames[achievementID]) == 'true') {
                break;
            }
            var achievementName = '♾️ <span style="color: rgb(77, 77, 77)">A new chapter.</span>';
            var achievementDescription = "This time I won't fail you.";
            localStorage.setItem(achievementNames[achievementID], true);
            localStorage.setItem('totalAchieve', ++totalAchievements);
            showTooltip(achievementName, achievementDescription);
            break;
    }
}

function checkChallenges() {
    var pageName = document.getElementById('pageName').innerHTML;
    var achievementID = pageAchievements[pageName];

    switch (pageName) {
        case 'index.html': // C-1: 'I LOVE HOME' && C-2: 'Touch grass. && C-3: 'he disconnected.'
            if (localStorage.getItem('c_ilh') == 'true' && localStorage.getItem('c_tg') == 'true') {
                break;
            }
            if (ilhDone == true) {
                var achievementName = '💀 <span class="mythical"; style="font-weight: bold;">Touch Grass.</span>';
                var achievementDescription = 'Idle for 24 hours.';
                const mythical = true;
                localStorage.setItem('c_tg', true);
                localStorage.setItem('totalAchieve', ++totalAchievements);
                showTooltip(achievementName, achievementDescription, mythical);
            }
            else if (ilhDone == false) {
                ilhDone = true;
                var achievementName = '💘🏠 <span class="legendary"; style="font-weight: bold;">I LOVE HOME</span>';
                var achievementDescription = 'Idle for 6 hours.';
                localStorage.setItem('c_ilh', true);
                localStorage.setItem('totalAchieve', ++totalAchievements);
                showTooltip(achievementName, achievementDescription);
            }
            break;
        case 'cami.html':
            if (localStorage.getItem(achievementNames[achievementID]) == "true") {
                break;
            }
            var achievementName = '♾️ <span class="rare"; style="font-weight: bold;">A new chapter.</span>';
            var achievementDescription = '...why?';
            localStorage.setItem('c_tg', true);
            localStorage.setItem('totalAchieve', ++totalAchievements);
            showTooltip(achievementName, achievementDescription);
            break;
    }
}