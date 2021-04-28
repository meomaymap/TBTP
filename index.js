function gotosite(){
if (typeof(Storage) !== "undefined") {
  // Store
  //localStorage.setItem("lastname", "Smith");
  // Retrieve
  //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
  
  var p = localStorage.getItem("AIzaSyC7om8zq3wvGcrhu5PyZlZoi2QrNmkmPJI_p");
  var m = localStorage.getItem("AIzaSyC7om8zq3wvGcrhu5PyZlZoi2QrNmkmPJI_m");
  var n = localStorage.getItem("AIzaSyC7om8zq3wvGcrhu5PyZlZoi2QrNmkmPJI_n");
  var i = localStorage.getItem("AIzaSyC7om8zq3wvGcrhu5PyZlZoi2QrNmkmPJI_i");
  
  var link;
  alert(p);
  if (p){
    if (m){
      link = "https://firebase-meeting-quang.stackblitz.io";
    } else {
      link = "https://meomaymap.github.io/BDTT_TBTP/test2.html";
    }
  } else {
    link = "https://nvq-auth.stackblitz.io";
  }
  //localStorage.setItem("AIzaSyC7om8zq3wvGcrhu5PyZlZoi2QrNmkmPJI_t",window.location.href);
  //localStorage["AIzaSyC7om8zq3wvGcrhu5PyZlZoi2QrNmkmPJI_t"] = window.location.href;
  alert(localStorage.getItem("AIzaSyC7om8zq3wvGcrhu5PyZlZoi2QrNmkmPJI_t"));
  //localStorage.removeItem("mytime");
  //location.replace(link);
  window.location.href = link;
} else {
  //document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  alert("Sorry, your browser does not support Web Storage...");
}
}
