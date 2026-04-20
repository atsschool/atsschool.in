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

    // ✅ IMPORTANT FIX
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;

    const interval = setInterval(function(){

        if(score > finalScore){
            clearInterval(interval);
            return;
        }

        const offset = circumference - (score / 100) * circumference;

        circle.style.strokeDashoffset = offset;
        text.innerText = score + "%";

        score++;

    }, 30);

}


// ================= GET RESULT FROM DATABASE =================

function getResult(){

    const regNumber = document.getElementById("searchReg").value.trim().toUpperCase();
    const DOB = document.getElementById("searchDOB").value;

    if(regNumber === "" || DOB === ""){
        alert("Enter Registration Number & Date of Birth");
        return;
    }

    database.ref("students").once("value", function(snapshot){

        let found = false;

        snapshot.forEach(function(childSnapshot){

            const data = childSnapshot.val();

            if(data.registrationNumber === regNumber && data.dob == DOB){

                found = true;

                document.getElementById("LOGIN").style.display = "none";
                document.getElementById("result").style.display = "table";

                document.getElementById("studentName").innerText = data.name;
                document.getElementById("registrationNumber").innerText = data.registrationNumber;
                document.getElementById("dob").innerText = data.dob;

                document.getElementById("class").innerText = "Class 9 and 10";
                document.getElementById("year").innerText = "2026-2027";
       

                let score = parseInt(data.score * 2) || 0;

                // ✅ RESET UI EVERY TIME
                document.getElementById("circleBox").style.display = "block";
                document.getElementById("scoreText").style.display = "block";
                document.getElementById("scoreTitle").style.display = "block";
                document.getElementById("noMsg").style.display = "none";

                if(score === 0){

    document.getElementById("circleBox").style.display = "none";
    document.getElementById("scoreText").style.display = "none";
    document.getElementById("scoreTitle").style.display = "none";
    document.getElementById("scholarship").innerText = data.score;

    const regNum = data.registrationNumber;
    const regNumberOnly = parseInt(regNum.replace("ATS", ""));

    const msgBox = document.getElementById("noMsg");

    // Range: ATS150004 to ATS150021
    if(regNumberOnly >= 150004 && regNumberOnly <= 150021){

        msgBox.innerHTML = `
        Thank you for appearing for the Scholarship Entrance Assessment. While the scholarship criteria have not been met in this attempt, the student is eligible for admission. We believe in nurturing each child’s potential and look forward to their continued progress with us.
For assistance, please feel free to contact the school office at [9361616767].
        `;

    } else {

        msgBox.innerHTML = `
       Thank you for appearing for the Scholarship Entrance Assessment. While the scholarship criteria have not been met in this attempt, the student is eligible for admission. We believe in nurturing each child’s potential and look forward to their continued progress with us.
For assistance, please feel free to contact the school office at [9361616767].
        `;

    }

    msgBox.style.display = "block";

}else {
 document.getElementById("scholarship").innerText = data.score+"%" +" + "+data.score+"%";
                    // ✅ SHOW ANIMATION
                    animateScore(score);
                }

            }

        });

        if(!found){
            alert("Student Result Not Found");
        }

    });

}