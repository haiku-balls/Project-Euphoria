// Making strings less tedious since '21
window.addEventListener('DOMContentLoaded', () => {
    var ProgramVersionNumber = process.env.npm_package_version;
    document.getElementById("programVersion").innerHTML = ProgramVersionNumber
})