window.onload = init;


function init() {
    
urlSearchParams = new URLSearchParams(window.location.search);
params = Object.fromEntries(urlSearchParams.entries()); //pairnw to id san parametro apo to index menu kai tin kanw save stin metavliti params
getCourses()
    
}


function getCourses(){
    
    let url = 'https://elearning-aueb.herokuapp.com/courses/search?category='+params.category //pairnw tin timi category tou object params 
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

           
            
            var tmpl = document.getElementById("tmpl-courses").innerHTML; //fortwnw to template

            var compiled_tmpl = Handlebars.compile(tmpl); //to kanw compile mesw tou Handlebar

            
            for(var i=0; i< data.length; i++){
                
                rendered = compiled_tmpl(data[i]); //kanw render ta data
                document.getElementById('target-courses').innerHTML  += rendered; //ta prosthetw sto template
                

                
            }
            
            
            
        }); 
}