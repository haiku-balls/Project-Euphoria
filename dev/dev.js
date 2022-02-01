function makeToast() {
    var x = document.getElementById("tooltip");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2800);
}

// TEST MODAL
function showModal() {
    var Modal = document.getElementById('testModal');
    var ModalContent = document.getElementById('testModal-Content');
    Modal.style.display = 'block';
    ModalContent.classList.add('animate__animated', 'animate__zoomIn');
}

function closeModal() {
    var Modal = document.getElementById('testModal');
    var ModalContent = document.getElementById('testModal-Content');
    ModalContent.classList.add('animate__animated', 'animate__zoomOut');
    setTimeout(function(){ Modal.style.display = 'none'; }, 500);
    setTimeout(function(){ ModalContent.classList.remove('animate__animated', 'animate__zoomOut'); }, 500); // Remove animation.
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

// ELECTRON STUFF

function showMessageBox() {
    alert('test message');
}

// ETC