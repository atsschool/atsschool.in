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

function storescore(){

    const regNumber = document.getElementById("searchReg").value;
    const DOB = document.getElementById("searchDOB").value;
    const score = document.getElementById("score").value;

    if(regNumber.trim() === ""|| DOB === ""||score === "" ){
        alert("Enter all fields");
        return;
    }

    database.ref("students").once("value", function(snapshot){

        let found = false;

        snapshot.forEach(function(childSnapshot){

            const data = childSnapshot.val();

            if(data.registrationNumber === regNumber&& data.dob==DOB){
                found = true;
const studentData = {
        score: document.getElementById("score").value

    };


    // ================= SAVE DATA TO FIREBASE =================

  var registrationNumber=document.getElementById("searchReg").value;

    database.ref("students/" + registrationNumber).update(studentData)

    .then(function(){

        message.style.color = "green";
        message.innerText = "Score added Successfully!";


    })

    .catch(function(error){

        message.style.color = "red";
        message.innerText = error.message;

    });

            }

        });

        if(!found){
            alert("Student Not Found");
        }

    });

}
