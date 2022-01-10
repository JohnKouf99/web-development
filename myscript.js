let pass1 = document.getElementById("pass1")
let pass2 = document.getElementById("pass2")
let form = document.getElementById("registration-form")

form.addEventListener("submit", (e) => { /*event listener gia thn forma*/
    if (pass1.value!=pass2.value){
        e.preventDefault();
        pass1.style.borderColor="red" /*kokkino border*/
        pass2.style.borderColor="red"
        let list = document.querySelectorAll(".password-error") /*epilegw ola ta elements me auth th klash*/
        for(let item of list) {
            item.textContent = "Passwords do not match. Please try again!" /*vazw text giat to error message se kathe section me th sugekrimenh klash*/
        }
    }

})

let date = document.getElementById("birthdate")
date.addEventListener("input", (e) => { 
    result = calculate_age(date)
    if (result <= 12) {
        e.preventDefault();
        date.setCustomValidity("You need to be above 12 years old in order to complete the registration.")
        date.style.borderColor="red"
    }
    else{
        date.setCustomValidity("") /*resetting validity*/
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


 

function calculate_age(date) { /*sunarthsh olodikia mas gia ton upologismo ths hlikias*/
    newd = new Date (date.value)
    var diff_ms = Date.now() - newd.getTime();
    var age_dt = new Date(diff_ms); 

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}