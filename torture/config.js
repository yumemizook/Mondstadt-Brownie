// because recycling is good for the environment, and this is a good practice to do so.
// thanks poicitaco on github for the fixed codebase (former localhost-based code)

import { db, collection, getDocs, updateProfile, updatePassword, updateEmail, getAuth, onAuthStateChanged } from "./firebase.js";

const saveChanges = document.querySelector("[save-modified-changes]");
const savePassword = document.querySelector("[confirm-new-pw]");
const newPasswordInput = document.querySelector("#newpw");
const confirmNewPasswordInput = document.querySelector("#confirmnewpw");

const auth = getAuth();
let user = auth.currentUser;

let lowerCaseLetters = /[a-z]/g;
let upperCaseLetters = /[A-Z]/g;
let numbers = /[0-9]/g;

// coming back to this later
saveChanges.addEventListener("click", saveData);
// savePassword.addEventListener("click", changePassword);

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

function fetchData() {
  const currentName = document.querySelector("[current-player-name]");
  const currentEmail = document.querySelector("[current-email]");
  const currentAvatar = document.querySelector("#image-display");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentName.innerHTML = `Current player name: ${user.displayName}`;
      currentEmail.innerHTML = `Current email: ${user.email}`;
      currentAvatar.src = user.photoURL || "img/default-avatar.png";
    }
  });
}

function saveData() {
  const newName = document.querySelector("#namechange");
  const newEmail = document.querySelector("#emailchange");
  const newAvatar = document.querySelector("#file-upload");
  const user = auth.currentUser;
  if (!newName.value) {
    newName.value = user.displayName;
  }
  if (!newEmail.value) {
    newEmail.value = user.email;
  }
  if (!newAvatar.value) {
    newAvatar.value = user.photoURL;
  }
  else {
    updateProfile(user, { displayName: newName.value, photoURL: newAvatar.value });
    updateEmail(user, newEmail.value);
    console.log("Data saved successfully");
  }
}