
window.onload = init;


function init() {
    printCategory() //emfanizw katigories sto menu tou index
    let btn = document.getElementById("sbtn")
    btn.addEventListener('click', fetchh) //vriskei mathimata me sigkekrimeno keyword
    
}


function fetchh(){
    document.getElementById('target').innerHTML  = "";
    var keyword = document.getElementById("key").value
    keyword = keyword.replace(/^\s+|\s+$/gm,''); // diagrafw whitespaces
    keyword = keyword.replace(/\s+/g, '+'); //antikathistw space me + sign
    let url = 'https://elearning-aueb.herokuapp.com/courses/search?title=' + keyword 
    
    let rendered;


    fetch(url, {
        
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
      )
        .then(res=>{
            return res.json() //epistrofi result san json data
        })
        .then(data => {

           
            
            var tmpl = document.getElementById("tmpl").innerHTML; //fortwnw to template

            var compiled_tmpl = Handlebars.compile(tmpl); //to kanw compile mesw tou Handlebar

        
            for(var i=0; i< data.length; i++){
                
                rendered = compiled_tmpl(data[i]); //kanw render ta data
                document.getElementById('target').innerHTML  += rendered; //ta prosthetw sto template
                

                
            }
            
            
            
        });   
    }





function printCategory(){  
    let url = 'https://elearning-aueb.herokuapp.com/categories'
   
    let rendered2;
    

    fetch(url, {
        
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
      )
        .then(res=>{
            return res.json() //epistrofi result san json data
        })
        .then(data => {

            var tmpl2 = document.getElementById("tmpl-2").innerHTML; //fortwnw to template
            var compiled_tmpl2 = Handlebars.compile(tmpl2); //to kanw compile mesw tou Handlebar

            
            for(var i=0; i< data.length; i++){
                
                rendered2 = compiled_tmpl2(data[i]); //kanw render ta data
                document.getElementById('target-2').innerHTML  += rendered2; //ta prosthetw sto template

            }

        
        });   
    }




   









