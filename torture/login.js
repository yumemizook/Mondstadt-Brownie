import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from "./firebase.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "./index.html";
  }
});

let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!localStorage.getItem("users")) {
    alert("No user found");
  } else {
    let users = JSON.parse(localStorage.getItem("users"));

    let username = document.getElementById("username");
    let password = document.getElementById("pw");

    let existingUser = users.find(
      (index) =>
        index.username === username.value.trim() &&
        index.password === password.value.trim()
    );

    if (existingUser) {
      localStorage.setItem("currentUser", JSON.stringify(existingUser));
      location.href = "./index.html";
    } else {
      alert("Email or password is incorrect");
    }
  }
});
