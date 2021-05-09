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

        
