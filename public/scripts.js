// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js"
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js"
import {getDatabase, ref, set, get, child} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBROYVHbhbbsa7KESqpZCH8Hm4mlqx_Rwc",
  authDomain: "colordetectedpalmfruit.firebaseapp.com",
  projectId: "colordetectedpalmfruit",
  storageBucket: "colordetectedpalmfruit.appspot.com",
  messagingSenderId: "423623916774",
  measurementId: "G-4580V5B7KP",
  appId: "1:423623916774:web:087efa74173b7403810f27",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}
const analytics = getAnalytics(app);
const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click',(Event)=>{
    Event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email:email,
            firstName : firstName,
            lastName : lastName
        };
        showMessage('Account Created Successfull', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);
        })
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email anda sudah terdaftar!', 'signUpMessage'); 
        }
        else{
            showMessage('Unable to create User', 'signUpMessage');
        }
    })
})

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click',(Event)=>{
    Event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        showMessage('Sign In Successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='homepage.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
        showMessage('Incorrect Email or Password', 'signInMessage');
    }
    else{
        showMessage('Account doed not Exist','signInMessage');
    };
    });
});


//BUTTONFUNCTION
const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click', function() {
    signInForm.style.display='none';
    signUpForm.style.display='block';
});

signInButton.addEventListener('click', function() {
    signInForm.style.display='block';
    signUpForm.style.display='none';
});



//SENSOR
// JavaScript code untuk animasi pop-up dan update nilai sensor secara realtime
/*document.addEventListener('DOMContentLoaded', (event) => {
    // Example sensor values, in practice these would come from your sensors
    const sensorData = {
        'ungu-kehitaman': 10,
        'dominan-hijau': 20,
        'jingga-kemerahan': 30,
        'dominan-kuning': 40,
        'merah-kehitaman': 50,
        'merah': 60
    };

    function updateSensorValues() {
        for (const [key, value] of Object.entries(sensorData)) {
            document.getElementById(key).innerText = value;
        }
    }

    function animateValues() {
        const sensorElements = document.querySelectorAll('.sensor-value');
        sensorElements.forEach(element => {
            element.classList.add('pop');
            setTimeout(() => {
                element.classList.remove('pop');
            }, 500);
        });
    }

    // Update and animate every 1 second
    setInterval(() => {
        updateSensorValues();
        animateValues();
    }, 1000);
});
*/