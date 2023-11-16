import {getUserSignup, sendToLogin} from './main.js'
import {generateUsername1, generateUsername3, suggestedUsername1, suggestedUsername3, generatedUsername1, generatedUsername3} from './generateUsername.js';
import {  register  } from "./endpoints.js";



// const bearer = localStorage.getItem("bearer");

const signupBtn = document.getElementById("signupBtn");
const lastname = document.getElementById('lastname');
const username = document.getElementById('username');
let buttonIsClicked = false;

console.log(suggestedUsername1);
suggestedUsername1.addEventListener('click', function(){
    username.value = generatedUsername1;
});
suggestedUsername3.addEventListener('click', function(){
    username.value = generatedUsername3;
});

lastname.addEventListener('focusout', function(){
    generateUsername1();
    generateUsername3();
})

generateUsername1();

generateUsername3();

function comparePassword(){
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    console.log(password);
    console.log(confirmPassword);

    if(password !== confirmPassword){
        Swal.fire({
            icon: 'error',
            title: 'Password does not Match',
            text:  `Your Password and the Confirm Password does not Match!`,
            confirmButtonText: "Continue",
            confirmButtonColor: '#055496'
        })
    }

}

signupBtn.addEventListener('click', (e) =>{
    comparePassword();
    let data = getUserSignup();
    fetch(register, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type' : 'application/json',
            'mode' : 'no-cors'
        }
    }).then((data) => {
        // console.log(data);
        return data.json()
    })
    .then((registFetchResp) => {
        if(registFetchResp.status == true){
            comparePassword();
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text:  `${registFetchResp.statusMessage}`,
                confirmButtonText: "Let's Go",
                confirmButtonColor: '#055496'
            }).then((swalResponse) => {
                if(swalResponse.isConfirmed){
                    sendToLogin();
                }
            })
        }

        let firstNameError = registFetchResp.errors.FirstName;
        iziToast.show({
            color: 'yellow',
            position: 'topRight',
            title: 'Warning',
            message: `${firstNameError}`,
            timeout: 7000,
            drag: true
        })

        let lastNameError = registFetchResp.errors.LastName;
        iziToast.show({
            color: 'yellow',
            position: 'topRight',
            title: 'Warning',
            message: `${lastNameError}`,
            timeout: 7000,
            drag: true
        })

        let addressError = registFetchResp.errors.Address;
        iziToast.show({
            color: 'yellow',
            position: 'topRight',
            title: 'Warning',
            message: `${addressError}`,
            timeout: 7000,
            drag: true
        })

        let emailError = registFetchResp.errors.Email;
        iziToast.show({
            color: 'yellow',
            position: 'topRight',
            title: 'Warning',
            message: `${emailError}`,
            timeout: 7000,
            drag: true
        })

        let usernameError = registFetchResp.errors.UserName;
        iziToast.show({
            color: 'yellow',
            position: 'topRight',
            title: 'Warning',
            message: `${usernameError}`,
            timeout: 7000,
            drag: true,
            maxWidth: '400px'
        })

        let passwordError = registFetchResp.errors.Password;
        iziToast.show({
            color: 'yellow',
            position: 'topRight',
            title: 'Warning',
            message: `${passwordError}`,
            timeout: 7000,
            maxWidth: '400px',
            drag: true
        })
    })
});


