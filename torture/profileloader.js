import { getAuth, onAuthStateChanged, getDoc, doc, db } from "./firebase.js";

const playerName = document.querySelector("[playername]");
const playerAvatar = document.querySelector("#playerpfp");
const pumpbility = document.querySelector("#pbility");

document.addEventListener("DOMContentLoaded", () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Set avatar and name
            const avatarImage = user.photoURL || "img/default-avatar.png";
            const username = user.displayName || "undefined";
            playerAvatar.src = avatarImage;
            playerName.textContent = username;

            try {
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    // Pumpbility
                    const userData = userDocSnap.data();
                    const pbValue = typeof userData.pumpbility === "number" ? userData.pumpbility : 0;
                    pumpbility.innerHTML = `PUMBILITY: ${pbValue}`;

                    // Get scores from subcollection
                    import("./firebase.js").then(async ({ collection, getDocs }) => {
                        const scoresSnap = await getDocs(collection(db, "users", user.uid, "scores"));
                        const scores = [];
                        scoresSnap.forEach(doc => {
                            scores.push(doc.data());
                        });

                        // Best Plays: top 10 by pumpbility
                        const bestPlays = scores
                            .filter(play => typeof play.pumpbility === "number")
                            .sort((a, b) => (b.pumpbility || 0) - (a.pumpbility || 0))
                            .slice(0, 10);

                        // Recent Plays: top 10 by timestamp (descending)
                        const recentPlays = scores
                            .filter(play => typeof play.timestamp === "number")
                            .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
                            .slice(0, 10);

                        // Find the tables
                        const bestPlaysTable = document.querySelector(".bp .play-table");
                        const recentPlaysTable = document.querySelector(".rp .play-table");

                        // Helper to render table rows
                        function renderRows(plays) {
                            return plays.map(play =>
                                `<tr>
                                    <td><a style="text-decoration: none; color: white;" href="/score.html?sn=${play.sn}&lvl=${play.lvl}">${play.sn || ""}</a></td>
                                    <td>${play.lvl || ""}</td>
                                    <td>${play.score || ""}</td>
                                    <td>${play.grade || ""}</td>
                                    <td>${play.cleartype || ""}</td>
                                    <td>${play.pumpbility || ""}</td>
                                    <td>${play.timeString || ""}</td>
                                </tr>`
                            ).join("");

                        }
                        // Render Best Plays
                        if (bestPlaysTable) {
                            bestPlaysTable.innerHTML = `
                                <tr>
                                  <th>Song</th>
                                  <th>Difficulty</th>
                                  <th>Score</th>
                                  <th>Grade</th>
                                  <th>Clear Type</th>
                                  <th>Pumpbility</th>
                                  <th>Time</th>
                                </tr>
                                ${renderRows(bestPlays)}
                            `;
                        }

                        // Render Recent Plays
                        if (recentPlaysTable) {
                            recentPlaysTable.innerHTML = `
                                <tr>
                                  <th>Song</th>
                                  <th>Difficulty</th>
                                  <th>Score</th>
                                  <th>Grade</th>
                                  <th>Clear Type</th>
                                  <th>Pumpbility</th>
                                  <th>Time</th>
                                </tr>
                                ${renderRows(recentPlays)}
                            `;
                        }
                    });
                } else {
                    pumpbility.innerHTML = "PUMBILITY: 0";
                }
            } catch (e) {
                console.error("Error loading profile:", e);
                pumpbility.innerHTML = "PUMBILITY: 0";
            }
        } else {
            playerAvatar.src = "img/default-avatar.png";
            playerName.textContent = "Guest";
            pumpbility.innerHTML = "PUMBILITY: 0";
        }
    });
});