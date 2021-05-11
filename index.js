 //Disable get code
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

function preventPullToRefresh(element) {
	var prevent = false;
	document.querySelector(element).addEventListener('touchstart', function(e){
	if (e.touches.length !== 1) { 
		return; 
	}

                

                var scrollY = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
                prevent = (scrollY === 0);
		    });

			document.querySelector(element).addEventListener('touchmove', function(e){

                if (prevent) {
                   
                    prevent = false;
                    e.preventDefault();
                }
			});
		  }

        
        //Disable get code

document.addEventListener("touchstart", function(e){

        if(e.touches.length > 1){
                //the event is multi-touch
                //you can then prevent the behavior
                e.preventDefault();
        } 
    },{passive: false});
      
    preventPullToRefresh('html'); // pass #id or html tag into the method

function Lock(IDName,status) {
	document.getElementById(IDName).style.display = status;
}


var Dev;
DeterminDevice();

function DeterminDevice() {
           var Typedevice = DetectMobile();
           var n = Typedevice.indexOf("Nope");
           
           if(n>0){
              Dev = "Laptop";
           } else {
              n = Typedevice.indexOf("Not Mobile");
              if(n>0) {
                 Dev = "Tablet";
              } else {
                 Dev = "Mobile";
              }
           }
	
	alert(Dev);
        }



var wi = window.innerWidth;
var hi = window.innerHeight;

    window.addEventListener("load",function() {
        var str = window.location.href;
	var action = str.split("?")[1];
	if (action){
	   str = "?action=" + action;
	} else {
	   str = "";
	}	
 		
	    
	if(window.innerWidth>window.innerHeight) {

			Lock("myOverlay","none");
			Lock("KhoaManhinh","block");

	} else {
	Lock("myOverlay","block");
	Lock("KhoaManhinh","none");
	}
	
	    
	    
	    document.getElementById("myFrame").src = "https://script.google.com/macros/s/AKfycby7xOajlwfyrlDp0vR-3mxXC5O95s5uPbh3cz8C/exec" + str;
	    
		setTimeout(function(){
            // Hide the address bar!
                window.scrollTo(0, 1);
            }, 0);
        });





window.addEventListener("resize", AnHien);



function AnHien() {
	var wDiv = document.getElementById("myOverlay").offsetWidth; 
	
	if (wDiv > wi){
		Lock("myOverlay","none");
		Lock("KhoaManhinh","block");
	} else {
		Lock("myOverlay","block");
		Lock("KhoaManhinh","none");
	}
}


