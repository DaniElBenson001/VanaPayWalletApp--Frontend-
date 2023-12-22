import { addSecurityqa, bearer, getSecurityqa } from "./endpoints.js";
import { getSecurityQuestions } from "./main.js";

let securityQuestion = document.getElementById("security-question");
let getNewQuestion = document.getElementById("another-question");
let securityqaButton = document.getElementById("securityqa-btn");

function getSecurityqaFunction(){
    fetch(getSecurityqa,{
        method: "GET",
        headers: {
            "content-type": "application/json",
        }
    }).then(securityqaData => securityqaData.json())
    .then(securityqaResp =>{
        console.log(securityqaResp.data);
        securityQuestion.innerHTML = `${securityqaResp.data}`;
    })
}
getSecurityqaFunction();

function addSecurityqaFunction(){
    let securityqaData = getSecurityQuestions();
    fetch(addSecurityqa, {
        method: 'POST',
        body: JSON.stringify(securityqaData),
        headers: {
            "content-type": "application/json",
            "Authorization": `bearer ${bearer}`
        }
    }).then((securityqaData) => {
        console.log(securityqaData);
        return securityqaData.json();
    }).then((securityqaResp) => {
        console.log(securityqaResp);
    })
}

securityqaButton.addEventListener('click', addSecurityqaFunction)

getNewQuestion.addEventListener('click', getSecurityqaFunction);