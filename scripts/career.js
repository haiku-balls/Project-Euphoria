var toggled = false;
var x = document.getElementsByClassName("achievement-id");

function buttonToggle() {
    if (toggled == true) {
        toggled = false;
        for(i=0; i<x.length; i++){
            x[i].style.display = "none";
        }
    }
    else if (toggled == false) {
        toggled = true;
        for(i=0; i<x.length; i++){
            x[i].style.display = "inline-block";
        }
    }
}


// RESET DATA MODAL
function showResetDataConfirmationModal() {
    var Modal = document.getElementById('resetUserDataConfirmationModal');
    var ModalContent = document.getElementById('modal-content');
    Modal.style.display = 'block';
    ModalContent.classList.add('animate__animated', 'animate__zoomIn');
}

function closeResetDataConfirmationModal() {
    var Modal = document.getElementById('resetUserDataConfirmationModal');
    var ModalContent = document.getElementById('modal-content');
    ModalContent.classList.add('animate__animated', 'animate__zoomOut');
    setTimeout(function(){ Modal.style.display = 'none'; }, 500);
    setTimeout(function(){ ModalContent.classList.remove('animate__animated', 'animate__zoomOut'); }, 500); // Remove animation.
}

function makeToast() {
    var x = document.getElementById("tooltip");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2800);
}