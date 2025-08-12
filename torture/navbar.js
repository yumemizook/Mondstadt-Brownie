import { getAuth, onAuthStateChanged, signOut, db, collection } from "./firebase.js";

let avatar = document.querySelector("#avatardisp");
const avatarFrame = document.querySelector("#avatar");
const loginButton = document.querySelector("#logger");
const welcomeText = document.querySelector("#name");
const pumpbility = document.querySelector("#pb")

// if (storedUser) {
//   let currentUser = JSON.parse(storedUser);
//   let avatarImage = currentUser['profilePicture']; //s Parse avatarImage only if storedUser exists
//   if (currentUser) {
//     let signout = document.querySelector("#logger");
//     signout.innerHTML = `<a href="javascript:void(0)" id="signout">Sign Out</a>`;
//     signout.addEventListener("click", function () {
//       localStorage.removeItem("currentUser");
//       window.location.href = "index.html"; // Redirect to index.html after sign out
//     })
//     avatar.src = avatarImage; 
//     avatarFrame.style.display = "block"; // Show the avatar frame if user is logged in
//     welcomeText.innerHTML = `You are currently logged in as <span style="font-size: x-large; font-weight: 700;">${currentUser.username}</span>`;
//     pumpbility.innerHTML = `<h3>Pumpbility: 0</h3>`
//   } 
// }  

document.addEventListener("DOMContentLoaded", () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      let avatarImage = user.photoURL || "img/default-avatar.png"; // Use a default avatar if none is set
      if (avatar) {
        avatar.src = avatarImage;
      }
      if (avatarFrame) {
        avatarFrame.style.display = "block"; // Show the avatar frame if user is logged in
      }
      console.log("User is signed in:", user);
      welcomeText.innerHTML = `You are currently logged in as <span style="font-size: x-large; font-weight: 700;">${user.displayName}</span>`;
      pumpbility.innerHTML = `<h3>Pumpbility: 0</h3>`;
      loginButton.innerHTML = `<a href="javascript:void(0)" id="signout">Sign Out</a>`;
      const signOutLink = document.querySelector("#signout");
      signOutLink.addEventListener("click", async () => {
        try {
          await signOut(auth);
          window.location.href = "index.html"; // Redirect to index.html after sign out
        } catch (error) {
          console.error("Error signing out:", error);
          alert("An error occurred while signing out. Please try again.");
        }
      });
    }
    else{ 
      avatar.display = "none"; // Hide the avatar if user is not logged in
    }
  });
});