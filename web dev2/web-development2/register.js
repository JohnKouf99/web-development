
let pass1 = document.getElementById("pass1")
let pass2 = document.getElementById("pass2")
let email = document.getElementById("email")
let lastname = document.getElementById("lname")
let firstname = document.getElementById("fname")
let addr = document.getElementById("address")
let birthdate = document.getElementById("birthdate")
let phonenumber = document.getElementById("phone")
let studies = document.getElementById("studies")
let coursepref = document.getElementById("course-pref")
let gyear = document.getElementById("gyear")
let forlang = document.getElementById("foreign-lang")

let form = document.getElementById("registration-form")
var re = new RegExp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$")

form.addEventListener("submit", (e) => { /*event listener gia thn forma*/
    if (pass1.value!=pass2.value){
        e.preventDefault(); // stamataei to submit
        pass1.style.borderColor="red" /*kokkino border*/
        pass2.style.borderColor="red"
        let list = document.querySelectorAll(".password-error") /*epilegw ola ta elements me auth th klash*/
        for(let item of list) {
            item.style.color="red"
            item.textContent = "Passwords do not match. Please try again!" /*vazw text giat to error message se kathe section me th sugekrimenh klash*/
        }
    }
    else if(pass1.value.length < 8){ // elegxos gia an toi passwoird einai < 8 xarakthrwn 
        e.preventDefault();
        let list = document.querySelectorAll(".password-error")
        for (let item of list) {
            item.style.color="red"
            item.textContent = "Password need to be at least 8 characters long"
        }
    }
    else if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(pass1.value)){ //elegxos gia ena arithmo, ena gramma kai ena special char
        console.log(pass1.value)
        e.preventDefault();
        let list = document.querySelectorAll(".password-error")
        for (let item of list) {
            item.style.color="red"
            item.textContent = "Password should contain one letter, one number and one of the following special characters: !@#$%^&*"
        }
    }
    else{ // ean exoume legit pass
        e.preventDefault();  

        const data = { //antikeimeno gia post ston server 
            email: email.value,
            password: pass1.value,
            firstname: firstname.value,
            lastname: lastname.value,
            address: addr.value,
            birthdate: birthdate.value,
            phonenumber: phonenumber.value,
            studies: studies.value,
            coursepref: coursepref.value,
            gyear: gyear.value,
            forlang: forlang.value,
        }


        const url='http://localhost:3000/register' //url tou post ston local server mas 

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
            form.style.display = 'none'; //eksafanizoume thn forma 
            document.getElementById("p1").innerHTML = 'Ευχαριστούμε για την εγγραφή σας.' //vazoume text se kapoia pedia sto html mas gia thn enhmerwsh tou xrhsth
            document.getElementById("indexlink").innerHTML = 'Επιστροφή στην αρχική σελίδα.'
        })
        .catch(err => { //pianoume to error pou tuxon gurnaei o server
            const p2 = document.getElementById("p2") 
            p2.innerHTML = err.message // to ektupwnoume sth forma (skopima den gurname oti o xrhsths uparxei gia logous privact, ant'autou gurname to error xwris to stack)
        })
    }
 })


 email.addEventListener(("input"), (e) => {
     let re= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
     if(!re.test(email.value)){
         e.preventDefault();
         email.setCustomValidity("Email needs to be under the following format: yourname@domain.tld")
         email.style.borderColor="red"
     }
     else{
         email.setCustomValidity("")
     }
 })

 email.addEventListener(("input"), (e) => {
     let re= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
     if(!re.test(email.value)){
         e.preventDefault();
         email.setCustomValidity("Email needs to be under the following format: yourname@domain.tld")
         email.style.borderColor="red"
     }
     else{
         email.setCustomValidity("")
     }
 })

/*

let date = document.getElementById("birthdate")
date.addEventListener("input", (e) => { 
    result = calculate_age(date)
    if (result <= 12) {
        e.preventDefault();
        date.setCustomValidity("You need to be above 12 years old in order to complete the registration.")
       // date.style.borderColor="red" //bug
        
    }
    else{
        date.setCustomValidity("") //resetting validity
    }
})

 

function calculate_age(date) { //sunarthsh olodikia mas gia ton upologismo ths hlikias
    newd = new Date (date.value)
    var diff_ms = Date.now() - newd.getTime();
    var age_dt = new Date(diff_ms); 

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

*/



