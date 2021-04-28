if (typeof(Storage) !== "undefined") {
  // Store
  //localStorage.setItem("lastname", "Smith");
  // Retrieve
  //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
  
  var p = localStorage.getItem("AIzaSyC7om8zq3wvGcrhu5PyZlZoi2QrNmkmPJI_p");
  var e = localStorage.getItem("AIzaSyC7om8zq3wvGcrhu5PyZlZoi2QrNmkmPJI_e");
  var n = localStorage.getItem("AIzaSyC7om8zq3wvGcrhu5PyZlZoi2QrNmkmPJI_n");
  var i = localStorage.getItem("AIzaSyC7om8zq3wvGcrhu5PyZlZoi2QrNmkmPJI_i");

  if (p){
    location.replace("https://nvq-auth.stackblitz.io");
  } else {
    alert(p);
    if (e){
      location.replace("https://meomaymap.github.io/BDTT_TBTP/test2.html");
    } else {
      alert(e);
      alert(2);
      location.replace("https://firebase-meeting-quang.stackblitz.io");
    }
  }
} else {
  //document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  alert("Sorry, your browser does not support Web Storage...");
}
