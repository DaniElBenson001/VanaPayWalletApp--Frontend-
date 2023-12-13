import { getSecurityqa } from "./endpoints.js";

let securityQuestion = document.getElementById("security-question")

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