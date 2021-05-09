//Định nghĩa viết tắt cho element
   function ECN(NameClass, pos) {return document.getElementsByClassName(NameClass)[pos];}
   function ECN_Array(NameClass, pos) {return document.getElementsByClassName(NameClass);}
   function ETN(NameTag, pos) {return document.getElementsByTagName(NameTag)[pos];}
   function ETN_Array(NameTag, pos) {return document.getElementsByTagName(NameTag);}
   function EN(Name, pos) {return document.getElementsByName(Name)[pos];}
   function EN_Array(Name, pos) {return document.getElementsByName(Name);}
   function EID(NameID) {return document.getElementById(NameID);}
//Kết thúc Định nghĩa viết tắt cho element

//Cài đặt properties cho element
   function setStyle(el, propertyObject ) {
      for (var property in propertyObject) {
         el.style[property] = propertyObject[property];
      }
   }
   function setStyleAllClass(NameClass, propertyObject) {
      var el = ECN_Array(NameClass)
      for (i=0; i<el.length;i++) {
         setStyle(el[i], propertyObject);
      }
   }
//Kết thúc Cài đặt properties cho element        

//Tạo thẻ link bằng js
   function loadjscssfile(filename, filetype){
      if (filetype=="js"){ //if filename is a external JavaScript file
         var fileref=document.createElement('script')
         fileref.setAttribute("type","text/javascript")
         fileref.setAttribute("src", filename)
      }
            else if (filetype=="css"){ //if filename is an external CSS file
                var fileref=document.createElement("link")
                fileref.setAttribute("rel", "stylesheet")
                fileref.setAttribute("type", "text/css")
                fileref.setAttribute("href", filename)
            }
            if (typeof fileref!="undefined")
                document.getElementsByTagName("head")[0].appendChild(fileref)
        }


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

        
