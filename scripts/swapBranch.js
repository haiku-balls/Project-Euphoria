// Branch Swap Modal
function showSwapBranchConfirmationModal() {
    var Modal = document.getElementById('swapBranchConfirmationModal');
    var ModalContent = document.getElementById('modal-content');
    Modal.style.display = 'block';
    ModalContent.classList.add('animate__animated', 'animate__zoomIn');
}

function closeSwapBranchConfirmationModal() {
    var Modal = document.getElementById('swapBranchConfirmationModal');
    var ModalContent = document.getElementById('modal-content');
    ModalContent.classList.add('animate__animated', 'animate__zoomOut');
    setTimeout(function(){ Modal.style.display = 'none'; }, 500);
    setTimeout(function(){ ModalContent.classList.remove('animate__animated', 'animate__zoomOut'); }, 500); // Remove animation.
}

function swapBranch() { 
    window.location.href = 'https://project-cutie-electron.surge.sh/'
}

// Legacy build modal
function openLegacyBuildConfirmationModal() {
    const Modal = document.getElementById('legacyBuildConfirmationModal');
    const ModalContent = document.getElementById('legacyBuildModal-content');
    Modal.style.display = 'block';
    ModalContent.classList.add('animate__animated', 'animate__zoomIn');
}

function closeLegacyBuildConfirmationModal() {
    const Modal = document.getElementById('legacyBuildConfirmationModal');
    const ModalContent = document.getElementById('legacyBuildModal-content');
    ModalContent.classList.add('animate__animated', 'animate__zoomOut');
    setTimeout(function(){ Modal.style.display = 'none'; }, 500);
    setTimeout(function(){ ModalContent.classList.remove('animate__animated', 'animate__zoomOut'); }, 500); // Remove animation.
}

function swapLegacy() { 
    window.location.href = 'https://bakabakabakabakabaka.github.io/Project-Cutie/'
}