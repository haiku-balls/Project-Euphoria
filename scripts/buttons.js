const Back = document.getElementById("Back");
const Foward = document.getElementById("Foward");

Back.addEventListener("click", ()=>{
    console.log("Going back.");
    history.back();
})

Foward.addEventListener("click", ()=>{
    console.log("Going foward.");
    history.forward();
})