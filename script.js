// ================= FIREBASE CONFIGURATION =================

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


// ================= EMPTY CHECK FUNCTION =================

function isEmpty(value){
    return value === null || value.trim() === "";
}


// ================= ERROR DISPLAY FUNCTIONS =================

function showError(inputId, message){

    const input = document.getElementById(inputId);
    const error = document.getElementById(inputId + "Error");

    if(input){
        input.style.borderBottom = "2px solid red";
    }

    if(error){
        error.innerText = message;
        error.style.color = "red";
        error.style.fontSize = "12px";
    }

}

function clearError(inputId){

    const input = document.getElementById(inputId);
    const error = document.getElementById(inputId + "Error");

    if(input){
        input.style.borderBottom = "2px solid purple";
    }

    if(error){
        error.innerText = "";
    }

}


// ================= VALIDATION FUNCTION =================

function validateForm(){

    let valid = true;

    const name = document.getElementById("name").value;
    const gender = document.getElementById("gender").value;
    const dob = document.getElementById("dob").value;
    const aadhar = document.getElementById("aadhar").value;
    const registrationNumber = document.getElementById("registrationNumber").value;
    const fatherName = document.getElementById("fatherName").value;
    const primaryContact = document.getElementById("primaryContact").value;

    if(isEmpty(name)){
        showError("name","Name is required");
        valid = false;
    }else{
        clearError("name");
    }

    if(isEmpty(gender)){
        showError("gender","Gender is required");
        valid = false;
    }else{
        clearError("gender");
    }

    if(isEmpty(dob)){
        showError("dob","Date of Birth is required");
        valid = false;
    }else{
        clearError("dob");
    }

    if(isEmpty(aadhar)){
        showError("aadhar","Aadhar Number is required");
        valid = false;
    }
    else if(!/^[0-9]{12}$/.test(aadhar)){
        showError("aadhar","Aadhar must be 12 digits");
        valid = false;
    }
    else{
        clearError("aadhar");
    }

    if(isEmpty(registrationNumber)){
        showError("registrationNumber","Registration Number required");
        valid = false;
    }else{
        clearError("registrationNumber");
    }

    if(isEmpty(fatherName)){
        showError("fatherName","Father Name required");
        valid = false;
    }else{
        clearError("fatherName");
    }

    if(isEmpty(primaryContact)){
        showError("primaryContact","Contact Number required");
        valid = false;
    }
    else if(!/^[0-9]{10}$/.test(primaryContact)){
        showError("primaryContact","Enter valid 10 digit number");
        valid = false;
    }
    else{
        clearError("primaryContact");
    }

    return valid;

}


// ================= FORM SUBMIT =================

document.getElementById("studentForm").addEventListener("submit", function(e){

    e.preventDefault();

    const message = document.getElementById("message");

    // Validate form
    if(!validateForm()){
        message.style.color = "red";
        message.innerText = "Please fill required fields.";
        return;
    }

    // ================= COLLECT FORM DATA =================

    const studentData = {

        name: document.getElementById("name").value,
        gender: document.getElementById("gender").value,
        dob: document.getElementById("dob").value,
        nationality: document.getElementById("nationality").value,
        religion: document.getElementById("religion").value,
        motherTongue: document.getElementById("motherTongue").value,
        aadhar: document.getElementById("aadhar").value,
        registrationNumber: document.getElementById("registrationNumber").value,

        fatherName: document.getElementById("fatherName").value,
        fatherEducation: document.getElementById("fatherEducation").value,
        fatherOccupation: document.getElementById("fatherOccupation").value,
        motherName: document.getElementById("motherName").value,
        motherEducation: document.getElementById("motherEducation").value,
        motherOccupation: document.getElementById("motherOccupation").value,
        primaryContact: document.getElementById("primaryContact").value,
        secondaryContact: document.getElementById("secondaryContact").value,

        address1: document.getElementById("address1").value,
        address2: document.getElementById("address2").value,
        district: document.getElementById("district").value,
        state: document.getElementById("state").value,
        country: document.getElementById("country").value,

        previousSchool: document.getElementById("previousSchool").value,
        board: document.getElementById("board").value,
        curriculum: document.getElementById("curriculum").value,
        passClass: document.getElementById("passClass").value,
        percentage: document.getElementById("percentage").value,
        withdrawReason: document.getElementById("withdrawReason").value

    };


    // ================= SAVE DATA TO FIREBASE =================

    var registrationNumber=document.getElementById("registrationNumber").value;

    database.ref("students/" + registrationNumber).set(studentData)

    .then(function(){

        message.style.color = "green";
        message.innerText = "Registration Successful!";

        document.getElementById("studentForm").reset();

    })

    .catch(function(error){

        message.style.color = "red";
        message.innerText = error.message;

    });

});