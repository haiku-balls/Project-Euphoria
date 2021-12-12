// Making strings less tedious since '21
window.addEventListener('DOMContentLoaded', () => {
    var ProgramVersionName = "Build 4";
    var ProgramVersionNumber = process.env.npm_package_version;
    document.getElementById("programVersion").innerHTML = ProgramVersionName + " (" + ProgramVersionNumber + ")"
    // electron uses "electron [version]-[branch].[build]"
    var electronVersion = new String(process.versions.electron)
    electronVersion = electronVersion.substring(0, electronVersion.lastIndexOf('.'))
    console.log(electronVersion)
    document.getElementById('electron-version').innerHTML = electronVersion;
})