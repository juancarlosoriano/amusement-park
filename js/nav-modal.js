/*
Authors:
Juan Carlo Soriano 
Batin Orene
*/

/* Function to enable hamburger button menu button modal */
const configureNavModal = () => {
  const body = document.getElementById("main-body");
  const navModal = document.getElementById("nav-modal");
  const hamburgerBtn = document.getElementById("navbar-hamburger-btn");
  const dismissBtn = document.getElementById("nav-modal-btn-dismiss");

  // Configure event listener for hamburger button
  hamburgerBtn.addEventListener("click", (e) => {
    navModal.style.visibility = "visible";
    body.style.overflow = "hidden";
    console.log("hamburger clicked");
  });

  // Configure event listener for navbar modal dismiss button
  dismissBtn.addEventListener("click", (e) => {
    navModal.style.visibility = "hidden";
    body.style.overflow = "visible";
    console.log("dismiss");
  });
};

export default configureNavModal;
