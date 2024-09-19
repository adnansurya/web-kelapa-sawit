import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js"
import {getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyBROYVHbhbbsa7KESqpZCH8Hm4mlqx_Rwc",
    authDomain: "colordetectedpalmfruit.firebaseapp.com",
    projectId: "colordetectedpalmfruit",
    storageBucket: "colordetectedpalmfruit.appspot.com",
    messagingSenderId: "423623916774",
    appId: "1:423623916774:web:087efa74173b7403810f27",
    measurementId: "G-4580V5B7KP"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUseId');
    if(loggedInUserId){
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.Email;
                document.getElementById('loggedUserPassword').innerText=userData.Password;
            }
            else{
                console.log("no document found matching id")
            }
         })
         .catch((error)=>{
            console.log("Error getting documennt");
    })
    }
    else{
        console.log("User Id not Found in Local Storage")   
    }
  })


  const localButton=document.getElementById('logout');
  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=>{
        console.error('Error Signing Out:',error);
    })
  })
