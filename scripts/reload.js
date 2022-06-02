const pageAccessedByReload = (
    (window.performance.navigation && window.performance.navigation.type === 1) ||
      window.performance
        .getEntriesByType('navigation')
        .map((nav) => nav.type)
        .includes('reload')
);

function showReloadTooltip(achievementName, achievementDescription) {
    achievementGetSFX.play();
    var x = document.getElementById("tooltip");
    x.innerHTML = achievementName + '<br><span class="achievementDescription"><i>' + achievementDescription; + '</i></span>';
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4200);
}

function reloaded(reloadCount) {
    var state = history.state || {};
    var reloadCount = state.reloadCount || 0;
    if (pageAccessedByReload == false) {
        reloadCount = 0;
    }
    else if (pageAccessedByReload == true) { // Reload
        state.reloadCount = ++reloadCount;
        history.replaceState(state, null, document.URL);
        console.log(reloadCount + ' reload(s)');
        document.getElementById('reloadCounter').innerHTML = 'Reloads: ' + reloadCount;
    }
    else if (reloadCount) {
        delete state.reloadCount;
        reloadCount = 0;
        history.replaceState(state, null, document.URL);
    }
    if (reloadCount >= 50) { // this threshold makes a reload counter on the homepage visible.
        document.getElementById('reloadCounter').style.display = 'block';
    }
    if (reloadCount == 500) {
        delete state.reloadCount;
        reloadCount = 0;
        console.log('You have reloaded the page 500 times. You are a bad person.'); // github copilot is the funniest person ever.
        var achievementName = '🔌 <span class="rare"; style="font-weight: bold;">he disconnected.</span>';
        var achievementDescription = 'Reload the homepage 500 times.';
        localStorage.setItem('c_hd', true);
        localStorage.setItem('totalAchieve', ++totalAchievements);
        showReloadTooltip(achievementName, achievementDescription);
    }
}