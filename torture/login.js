import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "./firebase.js";

const auth = getAuth();
const email = document.getElementById("email").value;
const password = document.getElementById("pw").value;

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "./index.html";
  }
});

let form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get the latest values from the input fields
  const emailInput = document.getElementById("email").value.trim();
  const passwordInput = document.getElementById("pw").value;

  if (!emailInput || !passwordInput) {
    alert("Please enter both email and password.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, emailInput, passwordInput);
    // If successful, onAuthStateChanged will redirect
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/invalid-email":
        alert("Invalid email or password! Please try again.");
        break;
      case "auth/user-not-found":
        alert("User not found! Please create an account.");
        break;
      case "auth/too-many-requests":
        alert("Too many failed attempts. You have been timed out.");
        break;
      case "auth/network-request-failed":
        alert("Network error. Please check your connection and try again.");
        break;
      case "auth/internal-error":
        alert("Internal error. Please try again later");
        break;
      default:
        alert("An error occurred! Contact the sysop of the page.");
        console.error("Error signing in:", error);
        break;
    }
  }
});
