import { getAuth, onAuthStateChanged } from "./firebase.js";

let playerName = document.querySelector("[playername]")
let playerAvatar = document.querySelector("#playerpfp")
// let currentUser = localStorage.getItem("currentUser")
// document.addEventListener("DOMContentLoaded", () => {
// 	let playerVar = JSON.parse(currentUser)
//     let avatarDisplay = playerVar['profilePicture']
//  playerAvatar.src = avatarDisplay;
//  playerName.textContent = playerVar['username']
// });

document.addEventListener("DOMContentLoaded", () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            let avatarImage = user.photoURL || "img/default-avatar.png"; // Use a default avatar if none is set
            let username = user.displayName || "undefined"; 
            playerAvatar.src = avatarImage;
            playerName.textContent = username;
        } else {
            playerAvatar.src = "img/default-avatar.png"; // Set to default if no user
            playerName.textContent = "Guest";
        }
    });
});