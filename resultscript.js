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



// ================= SCORE ANIMATION =================

function animateScore(finalScore){

    let score = 0;

    const circle = document.getElementById("progressCircle");
    const text = document.getElementById("score");

    const radius = 70;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = circumference;

    const interval = setInterval(function(){

        if(score >= finalScore){
            clearInterval(interval);
        }

        const offset = circumference - (score / 100) * circumference;

        circle.style.strokeDashoffset = offset;

        text.innerText = score + "%";

        score++;

    },75);

}



// ================= GET RESULT FROM DATABASE =================

function getResult(){

    const regNumber = document.getElementById("searchReg").value;
    const DOB = document.getElementById("searchDOB").value;

    if(regNumber.trim() === ""|| DOB === "" ){
        alert("Enter Registration Number & Date of Birth");
        return;
    }

    database.ref("students").once("value", function(snapshot){

        let found = false;

        snapshot.forEach(function(childSnapshot){

            const data = childSnapshot.val();

            if(data.registrationNumber === regNumber&& data.dob==DOB){
                document.getElementById("LOGIN").style.display = "none";
                document.getElementById("result").style.display = "table";

                found = true;

                document.getElementById("studentName").innerText = data.name;
                document.getElementById("registrationNumber").innerText = data.registrationNumber;
                document.getElementById("dob").innerText = data.dob;
                

                document.getElementById("class").innerText = "Class 9";
                document.getElementById("year").innerText = "2026-2027";

                document.getElementById("scholarship").innerText = data.score;

                // Animate score circle
                animateScore(data.score);

            }

        });

        if(!found){
            alert("Student Result Not Found");
        }

    });

}