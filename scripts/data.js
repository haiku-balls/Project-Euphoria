
// Check for missing achievments.
let achievements = ['gettingStarted', 'firstWorm', 'h_aNC', 'c_ilh', 'c_tg', 'c_hd']
let dataValues = ['chp', 'totalAchieve', 'pg']

let trueAchievements = []
const achievementIDs = {
    gettingStarted: '1',
    firstWorm: '2',
    h_aNC: '3',
    c_ilh: 'C-1',
    c_tg: 'C-2',
    c_hd: 'C-3'
}

for (const achievement of achievements) {
    if (localStorage.getItem(achievement) == null) {
        // Achievements
        localStorage.setItem(achievement, false)
    }
    if (localStorage.getItem(achievement) == 'true') {
        // Add the trueAchievements
        trueAchievements.push(achievement)
        // Then update the totalAchieve value.
        localStorage.setItem('totalAchieve', trueAchievements.length);
    }
}

for (const data of dataValues) {
    switch (data) {
        case 'chp':
            if (localStorage.getItem(data) == null) {
                localStorage.setItem(data, 1);
            }
            break;
        case 'totalAchieve':
            if (localStorage.getItem(data) == null) {
                localStorage.setItem(data, 0);
            }
            break;
        case 'pg':
            if (localStorage.getItem(data) == null) {
                localStorage.setItem(data, 'index.html');
            }
            break;
    }
}

function getData() {
    var chapterValue = localStorage.getItem('chp');
    var totalAchieve = localStorage.getItem('totalAchieve');
    document.getElementById('playerChapter').innerText = 'Chapter: ' + chapterValue;
    document.getElementById('playerTotalAchieve').innerText = 'Total Achievements: ' + totalAchieve + '/' + achievements.length;
    for (const achievement of achievements) {
        if (localStorage.getItem(achievement) == 'true') {
            var achievementID = achievementIDs[achievement]
            document.getElementById(achievementID).innerText = 'GOT!';
            document.getElementById(achievementID).style.color = 'green';
        }
    }
}