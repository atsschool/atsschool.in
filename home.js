// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyA9WARJW6sjB8sLPiZIwVmeAo7bCKH7XRk",
  authDomain: "entrance-2026-2027.firebaseapp.com",
  databaseURL: "https://entrance-2026-2027-default-rtdb.firebaseio.com",
  projectId: "entrance-2026-2027",
  storageBucket: "entrance-2026-2027.firebasestorage.app",
  messagingSenderId: "1018966320679",
  appId: "1:1018966320679:web:1f4abbc99bb63087eed002",
  measurementId: "G-EE61JXT21K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Database reference
const database = firebase.database();

// ================= CHECK RESULT PUBLISH =================
database.ref("students/publish").on("value", function(snapshot) {

    const publish = snapshot.val();
    console.log("Publish value from DB:", publish); // useful for debugging

    const resultBtn = document.getElementById("resultbtn");
    const resultText = document.getElementById("resultText");

    if (!resultBtn || !resultText) return;

    if (publish == true) {
        resultBtn.style.display = "inline-block";
        resultText.innerText = "Class 9 results were published";
    } else {
        resultBtn.style.display = "none";
        resultText.innerText = "Class 9 results will be published soon";
    }
});