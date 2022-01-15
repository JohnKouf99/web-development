



let password = document.getElementById("pass1")
let sumbittedEmail = document.getElementById("email")
let profileForm = document.getElementById("registration-form")

var re = new RegExp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$")

profileForm.addEventListener("submit", (e) => { 
    /*event listener gia thn forma sto profile*/
    if(password.value.length < 8){ // elegxos gia an tou passwoird einai < 8 xarakthrwn 
        e.preventDefault();
        let list = document.querySelectorAll(".password-error")
        for (let item of list) {
            item.style.color="red"
            item.textContent = "Password needs to be at least 8 characters long"
        }
    }
    else{ // ean exoume legit pass
        e.preventDefault();  

        const data = { //antikeimeno js
            email: sumbittedEmail.value,
            password: password.value
        }

        const url='http://localhost:3000/profile' //url tou post ston local server mas 

        fetch(url, { //fetch post request 
            method:'POST',
            mode: 'cors', //gia antimetwpish cors errors
            Accept: 'application/json',
            headers: {
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(data) //kanoume to body mas json
        })
        .then( async res => { //perimenoume apanthsh tou server me mia async function
            if (res.status >= 200 && res.status <= 299) { //an status einai ok, 
                return res.json(); //gurname apanthsh gia to promise
              } else {
                const text = await res.text() //aliws perinoume to txt apo to res 
                throw Error(text); // to kanoume throw ws error
              }
        })
        .then( response => { // to return mas apo panw gurnaei promise me ta data
            console.log(response);
            profileForm.style.display = 'none';
            var tmpl = document.getElementById("tmpl-profile").innerHTML; //fortwnw to template
            var compiled_tmpl2 = Handlebars.compile(tmpl); //to kanw compile mesw tou Handlebar
            rendered = compiled_tmpl2(response)
            document.getElementById('profile-target').innerHTML = rendered;
        })
        .catch(err => { //pianoume to error pou tuxon gurnaei o server
            const p2 = document.getElementById("p2") 
            p2.innerHTML = err.message // to ektupwnoume sth forma (skopima den gurname oti o xrhsths uparxei gia logous privact, ant'autou gurname to error xwris to stack trace)
        })
    }
 })

 sumbittedEmail.addEventListener(("input"), (e) => {
    let re= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(!re.test(sumbittedEmail.value)){
        e.preventDefault();
        sumbittedEmail.setCustomValidity("Email needs to be under the following format: yourname@domain.tld")
        sumbittedEmail.style.borderColor="red"
    }
    else{
        sumbittedEmail.setCustomValidity("")
    }
})


