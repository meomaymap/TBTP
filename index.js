if (typeof(Storage) !== "undefined") {
  // Store
  //localStorage.setItem("lastname", "Smith");
  // Retrieve
  //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
  
  var p = localStorage.getItem("AIzaSyC7om8zq3wvGcrhu5PyZlZoi2QrNmkmPJI._p");

  if (p){
    location.replace("https://nvq-auth.stackblitz.io");
    
  } else {
    location.replace("https://firebase-meeting-quang.stackblitz.io");
  }
} else {
  //document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
}
