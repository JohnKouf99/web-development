 function myValidity(){

    
    let form = document.getElementById('form');
    /*password validation*/
    let elem1 = document.getElementById("pass1");
    let elem2 = document.getElementById("pass2");
    console.log(elem1.value);
    console.log(elem2.value);

    if(elem1.value!=elem2.value){
 
       elem1.style.borderColor="red";
       elem2.style.borderColor="red";
       elem1.setCustomValidity("Password does not match");
       return false;
    }
    else{
        elem1.setCustomValidity("");
        return true;
    }
    

    

}

