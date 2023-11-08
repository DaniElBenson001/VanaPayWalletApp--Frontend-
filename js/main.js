

export var mainURL = "http://127.0.0.1:5500";
let logoutBtn = document.getElementById("logout");

//load the dashboard
export function sendToDashboard(){
    location.replace(`${mainURL}/dashboard.html`);
}

//load the login
export function sendToLogin(){
    location.replace(`http://127.0.0.1:5500/login.html`);
}

function logOut(){   
    sendToLogin();
    localStorage.clear();  
}
//load the sign up
export function sendToSignUp(){
    location.replace(`${mainURL}/signup.html`)
}

//function to get user login credentials
export function getUserLogin(){
    return {
        username: document.getElementById("enterUsername").value,
        password: document.getElementById("enterPassword").value
    }
}

//function to get user signup credentials
export function getUserSignup(){
    return{
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        username: document.getElementById("username").value,
        address: document.getElementById("address").value,
        email: document.getElementById("emailname").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value
    }
}

export function getTransfer(){
    return{
        senderAcctNo: document.getElementById("acc-number").innerHTML,
        receiverAcctNo: document.getElementById("accnumber-input").value,
        amount: document.getElementById("amount").value
    }
}

export function getPin(){
    return {
        userPin: document.getElementById("pin").value,
        confirmUserPin: document.getElementById("pin2").value
    }
}

export function pinInput(){
    return {
        pin: document.getElementById("pin").value
    }
}

export function searchAccInput(){
    return{
        acc: document.getElementById("accnumber-input").value
    }
}

export function getSecurityQuestions(){
    return{
        question: document.getElementById("question").innerHTML,
        answer: document.getElementById("answer").value
    }
}

//Code for Pagination of Transactions History