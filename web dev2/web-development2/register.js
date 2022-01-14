






let pass1 = document.getElementById("pass1")
let pass2 = document.getElementById("pass2")
let email = document.getElementById("email")
let form = document.getElementById("registration-form")
var re = new RegExp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$")

form.addEventListener("submit", (e) => { /*event listener gia thn forma*/
    if (pass1.value!=pass2.value){
        e.preventDefault();
        pass1.style.borderColor="red" /*kokkino border*/
        pass2.style.borderColor="red"
        let list = document.querySelectorAll(".password-error") /*epilegw ola ta elements me auth th klash*/
        for(let item of list) {
            item.style.color="red"
            item.textContent = "Passwords do not match. Please try again!" /*vazw text giat to error message se kathe section me th sugekrimenh klash*/
        }
    }
    else if(pass1.value.length < 8){
        e.preventDefault();
        let list = document.querySelectorAll(".password-error")
        for (let item of list) {
            item.style.color="red"
            item.textContent = "Password need to be at least 8 characters long"
        }
    }
    else if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(pass1.value)){
        console.log(pass1.value)
        e.preventDefault();
        let list = document.querySelectorAll(".password-error")
        for (let item of list) {
            item.style.color="red"
            item.textContent = "Password should contain one letter, one number and one of the following special characters: !@#$%^&*"
        }
    }
    else{
        e.preventDefault();  

        const data = {
            email: email.value,
            password: pass1.value
        }

        const url='http://localhost:3000/register'

        fetch(url, {
            method:'POST',
            mode: 'cors',
            Accept: 'application/json',
            headers: {
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(data)
        })
        .then( async res => {
            if (res.status >= 200 && res.status <= 299) {
                return res.json();
              } else {
                const text = await res.text()
                throw Error(text);
              }
        })
        .then( response => {
            console.log(response);
            form.style.display = 'none'; 
            document.getElementById("p1").innerHTML = 'Ευχαριστούμε για την εγγραφή σας.'
            document.getElementById("indexlink").innerHTML = 'Επιστροφή στην αρχική σελίδα.'
        })
        .catch(err => {
            const p2 = document.getElementById("p2") 
            p2.innerHTML = err.message
        })
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

let email = document.getElementById("email")
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


 

function calculate_age(date) { //sunarthsh olodikia mas gia ton upologismo ths hlikias
    newd = new Date (date.value)
    var diff_ms = Date.now() - newd.getTime();
    var age_dt = new Date(diff_ms); 

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

*/



