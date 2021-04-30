// Firebase App (the core Firebase SDK) is always required
// and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from "firebaseui";

function EID(NameID) {return document.getElementById(NameID);}

//DISABLE RIGHT-CLICK
document.addEventListener("contextmenu", function(e){
  e.preventDefault();
}, false);

//DISABLE “VIEW SOURCE” SHORTCUT KEY
document.addEventListener("keydown", function(e){
  // USE THIS TO DISABLE CONTROL AND ALL FUNCTION KEYS
  // if (e.ctrlKey || (e.keyCode>=112 && e.keyCode<=123)) {
  // THIS WILL ONLY DISABLE CONTROL AND F12
  if (e.ctrlKey || e.keyCode==123) {
    e.stopPropagation();
    e.preventDefault();
  }
});


document.addEventListener("touchstart", function(e){
  //lock('portrait');
  if(e.touches.length > 1){
    //the event is multi-touch
    //you can then prevent the behavior
    e.preventDefault()
    } 
  },{passive: false});


function preventPullToRefresh(element) {
	var prevent = false;
	document.querySelector(element).addEventListener('touchstart', function(e){
    //lock('portrait');
    if (e.touches.length !== 1) { 
      //openFullscreen();
      return; 
    }
    var scrollY = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
    prevent = (scrollY === 0);
	});
		
  document.querySelector(element).addEventListener('touchmove', function(e){
    //lock('portrait');
    if (prevent) {
      prevent = false;
      e.preventDefault();
    }
	});
}

preventPullToRefresh('html');

// Document elements
const DivHeader = EID("Header");
const DivAuth = EID("app");
const DivChat = EID("Content_Chat");
const DivProgram = EID("Program");
const Thoat = EID("Thoat");
const Logo = EID("Logo");
const IFrame = EID("iframe");

const startRsvpButton = EID("startRsvp");
const guestbookContainer = EID("guestbook-container");

const form = EID("leave-message");
const input = EID("message");
const guestbook = EID("guestbook");
const numberAttending = EID("number-attending");
const rsvpYes = EID("rsvp-yes");
const rsvpNo = EID("rsvp-no");

var rsvpListener = null;
var guestbookListener = null;

var ListSrc = ["https://drive.google.com/uc?export=view&id=1CUwYaXjpCUBJsylUsHnWK3_oeSlKFKty",
"https://firebasestorage.googleapis.com/v0/b/fir-images-a61c9.appspot.com/o/hosting.png?alt=media&token=57c8adb6-08c4-43f7-9395-4c299896a36c",
"https://firebasestorage.googleapis.com/v0/b/fir-images-a61c9.appspot.com/o/codelab.png?alt=media&token=f45f808c-ce40-4b34-944c-8d8fac00e13d"];
Logo.src = ListSrc[0];


async function main() {
  // Add Firebase project configuration object here
const firebaseConfig = {
  apiKey: "AIzaSyCrdI6aX94cwhf6tmirbGWjmit4--tUytc",
  authDomain: "fir-web-codelab-6a636.firebaseapp.com",
  projectId: "fir-web-codelab-6a636",
  storageBucket: "fir-web-codelab-6a636.appspot.com",
  messagingSenderId: "553197720830",
  appId: "1:553197720830:web:793a7d05880a07e18301af",
  measurementId: "G-C3P7H99XL0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



  // FirebaseUI config
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // Email / Password Provider.
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // Handle sign-in.
        // Return false to avoid redirect.
        phone(firebase.auth().currentUser.uid);
        return false;
      }
    }
  };

  // Initialize the FirebaseUI widget using Firebase
  const ui = new firebaseui.auth.AuthUI(firebase.auth());

  // Listen to RSVP button clicks
  startRsvpButton.addEventListener("click",
  () => {
        if (firebase.auth().currentUser) {
          // User is signed in; allows user to sign out
          firebase.auth().signOut();
        } else {
          // No user is signed in; allows user to sign in
          ui.start("#firebaseui-auth-container", uiConfig);
        }
  });

  // Listen to the current Auth state
  firebase.auth().onAuthStateChanged((user) => {
    if (user){
      startRsvpButton.textContent = "Đăng xuất";
      // Show guestbook to logged-in users
      guestbookContainer.style.display = "block";

      RunProgram();
      // Subscribe to the guestbook collection
      subscribeGuestbook();
      // Subscribe to the guestbook collection
      subscribeCurrentRSVP(user);
    }
    else{
      startRsvpButton.textContent = "Đăng nhập";
      // Hide guestbook for non-logged-in users
      guestbookContainer.style.display = "none";
      
      gotoPageAuthPhone();

      // Unsubscribe from the guestbook collection
      unsubscribeGuestbook();
      // Unsubscribe from the guestbook collection
      unsubscribeCurrentRSVP();

    }
    
  });

  // Listen to the form submission
  form.addEventListener("submit", (e) => {
    // Prevent the default form redirect
    e.preventDefault();
    // Write a new message to the database collection "guestbook"
    firebase.firestore().collection("guestbook").add({
      text: input.value,
      timestamp: Date.now(),
      name: firebase.auth().currentUser.displayName,
      userId: firebase.auth().currentUser.uid
    })
    // clear message input field
    input.value = ""; 

    // Return false to avoid redirect
    return false;
  });

  // Create query for messages
  // Listen to guestbook updates
  function subscribeGuestbook(){
   // Create query for messages
    guestbookListener = firebase.firestore().collection("guestbook")
    .orderBy("timestamp","desc")
    .onSnapshot((snaps) => {
      // Reset page
      guestbook.innerHTML = "";
      // Loop through documents in database
      snaps.forEach((doc) => {
        // Create an HTML entry for each document and add it to the chat
        const entry = document.createElement("p");
        entry.textContent = doc.data().name + ": " + doc.data().text;
        //entry.textContent = doc.data().userId + ": " + doc.data().text;
        guestbook.appendChild(entry);

      });
      //alert(guestbook.children[0].innerHTML);
      //alert(firebase.auth().currentUser.uid);

      //NapData(firebase.auth().currentUser.uid);
    });
  };

  //setInterval(function(){ NapData(firebase.auth().currentUser.uid);}, 10000);

  
  // Unsubscribe from guestbook updates
  function unsubscribeGuestbook(){
    if (guestbookListener != null)
    {
      guestbookListener();
      guestbookListener = null;
    }
  };

  // Listen to RSVP responses
  rsvpYes.onclick = () => {
    // Get a reference to the user's document in the attendees collection
    const userDoc = firebase.firestore().collection('attendees').doc(firebase.auth().currentUser.uid);

    // If they RSVP'd yes, save a document with attending: true
    userDoc.set({
      attending: true
    }).catch(console.error)
  }

  rsvpNo.onclick = () => {
    // Get a reference to the user's document in the attendees collection
    const userDoc = firebase.firestore().collection('attendees').doc(firebase.auth().currentUser.uid);

    // If they RSVP'd no, save a document with attending: false
    userDoc.set({
      attending: false
    }).catch(console.error)
  }

  firebase.firestore()
    .collection('attendees')
    .where("attending", "==", true)
    .onSnapshot(snap => {
    const newAttendeeCount = snap.docs.length;

    numberAttending.innerHTML = newAttendeeCount+' người trực tuyến'; 
    })

  // Listen for attendee list
  function subscribeCurrentRSVP(user){
    rsvpListener = firebase.firestore()
    .collection('attendees')
    .doc(user.uid)
    .onSnapshot((doc) => {
      if (doc && doc.data()){
        const attendingResponse = doc.data().attending;

        // Update css classes for buttons
        if (attendingResponse){
          rsvpYes.className="clicked";
          rsvpNo.className="";
        }
        else{
          rsvpYes.className="";
          rsvpNo.className="clicked";
        }
      }
    });
  }

  function unsubscribeCurrentRSVP(){
    if (rsvpListener != null)
    {
      rsvpListener();
      rsvpListener = null;
    }
    rsvpYes.className="";
    rsvpNo.className="";
  }

}
main();

function RunProgram(){
  DivAuth.style.display = "none";
  DivProgram.style.display = "block";
  
  IFrame.src = "https://meomaymap.github.io/BDTT_TBTP/test2.html";
}

function gotoPageAuthPhone(){
  
  var str = window.location.href;
  str = str.split('?')[1];
  if(str){
    var thoigian = parseFloat(str.split('+')[0]);

    if (thoigian) {
      if (Date.now()-thoigian < 300){

        location.replace("https://nvq-auth.stackblitz.io");
      } else {
        //location.replace("https://meomaymap.stackblitz.io");
        DivAuth.style.display = "none";
      }
    } else {
      location.replace("https://nvq-auth.stackblitz.io");
    }
  } else {
    location.replace("https://nvq-auth.stackblitz.io");
  }
  

  //
}


Thoat.addEventListener("click", function() {
  switch(Thoat.innerHTML) {
    case "Thoát":
      Thoat.innerHTML = "Trở về";
      Dangxuat();
      break;
    case "Trở về":
      Thoat.innerHTML = "Thoát";
      DivAuth.style.display = "none";
      DivProgram.style.display = "block";
      break;
    default:
      // code block
  }
});

window.addEventListener("resize", displayWindowSize);

function displayWindowSize(){
    // Get width and height of the window excluding scrollbars
    var h = window.innerHeight;
    
    
    // Display result inside a div element
    IFrame.style.height = h - DivHeader.offsetHeight + "px";
    //changeFontSize("Thoat", 60);
    //alert(IFrame.offsetHeight);
}

displayWindowSize();

function Dangxuat(){
  DivChat.style.display = "none";
  DivAuth.style.display = "block";
  DivProgram.style.display = "none";
}
// At the bottom

function changeFontSize(id, preferredFontSize) {
		var preferredSize = 1024 * 768;

		var currentSize = window.innerWidth * window.innerHeight;
		var scalePercentage = Math.sqrt(currentSize) / Math.sqrt(preferredSize);
		var newFontSize = preferredFontSize * scalePercentage;
		EID(id).style.fontSize =  newFontSize + '%';
}
