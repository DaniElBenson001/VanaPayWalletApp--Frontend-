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
    let password = getUserSignup().password;
    let confirmPassword = document.getElementById("confirmPassword").value;

    console.log(password);
    console.log(confirmPassword);

    if(password === confirmPassword){
        return true;
    }

}

signupBtn.addEventListener('click', (e) =>{
    const passwordMatch = comparePassword();

    if(!passwordMatch){
        Swal.fire({
            icon: 'error',
            title: 'Password Mismatch',
            text:  `Your Password and the Confirm Password does not Match!`,
            confirmButtonText: "Continue",
            confirmButtonColor: '#055496'
        });
        return;
    }

    let data = getUserSignup();
    fetch(register, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type' : 'application/json',
            'mode' : 'no-cors'
        }
    })
    .then((registFetchData) => {
        console.log(registFetchData);
        return registFetchData.json();
    })
    .then((registFetchResp) => {
        console.log(registFetchResp);
        if(registFetchResp.status == true){
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
        if(registFetchResp.status == false){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text:  `${registFetchResp.statusMessage}`,
                confirmButtonText: "Let's Go",
                confirmButtonColor: '#055496'
            })
        }
        else{
            handleSignupErrors(registFetchResp.errors);    
        }
    })
});

function handleSignupErrors(errors){
    for(const key in errors){
        if(errors.hasOwnProperty(key)){
            const errorMessage = errors[key];
            iziToast.show({
                color: 'yellow',
                position: 'topRight',
                title: 'Warning',
                message: errorMessage,
                timeout: 7000,
                maxWidth: '400px',
                drag: true
            })
        }
    }
}