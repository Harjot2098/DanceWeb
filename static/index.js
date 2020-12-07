function validate()
   {
    var phn= document.getElementById('phone').value;

    var regx=/[7-9]\d{9}/;

     if (regx.test(phn)) 
      {
        alert("true");
        }
       else if(regx.test(text).length>9) 
      {
      	alert("false"); 
      }
      else{
        
      }
      
	 }