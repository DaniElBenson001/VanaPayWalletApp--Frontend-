import {getUserSignup, sendToLogin} from './main.js'
import {generateUsername1, generateUsername3} from './generateUsername.js'
import {suggestedUsername1, suggestedUsername2, suggestedUsername3} from './generateUsername.js';
import {generatedUsername1, generatedUsername3} from './generateUsername.js';

const createPin = 'https://localhost:7007/api/Authentication/createPin';
const register = 'https://localhost:7007/api/User/register';
const validateUser = 'https://localhost:7007/api/Authentication/validateUser';
const bearer = localStorage.getItem("bearer");

const signupBtn = document.getElementById("signupBtn");
const lastname = document.getElementById('lastname');
const username = document.getElementById('username');
let buttonIsClicked = false;


suggestedUsername1.addEventListener('click', function(){
    username.value = generatedUsername1;
});

suggestedUsername2.addEventListener('click', function(){
    username.value = generatedUsername2;
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

signupBtn.addEventListener('click', (e) =>{
    let data = getUserSignup();
    fetch(register, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type' : 'application/json',
            'mode' : 'no-cors'
        }
    }).then((res) => res.json())
    .then((res) => {
        console.log(res);
        if(res.statusMessage = "User Successfully Created"){
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text:  `${res.statusMessage}`
            }).then((resp) => {
                if(resp.isConfirmed){
                    sendToLogin();
                }
            })
        }
    });
});