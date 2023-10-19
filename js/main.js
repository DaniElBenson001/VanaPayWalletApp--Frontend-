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
        senderAcctNo: document.getElementById("acctNum").innerHTML,
        receiverAcctNo: document.getElementById("accNumInput").value,
        amount: document.getElementById("amount").value
    }
}


//Code for Pagination of Transactions History