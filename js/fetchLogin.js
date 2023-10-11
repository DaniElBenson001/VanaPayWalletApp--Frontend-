import { sendToDashboard, sendToLogin, sendToSignUp, getUserLogin} from "./main.js";

var login = 'https://localhost:7007/api/User/login';
let buttonIsClicked = false;


const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener('click', (e) => {
    buttonIsClicked = true;
    // loginBtn.style.cursor = "not-allowed";
    // loginBtn.disabled = true;

    const data = getUserLogin();
    console.log(data);

    //Fetch API to login the Account User
    fetch( login, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type' : 'application/json',
            'mode' : 'no-cors'
        }
    }).then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        if(res.status == true){
            localStorage.setItem("bearer", res.data.verificationToken);
            localStorage.setItem("Username", res.data.userName);
            sendToDashboard();
            // console.log(res.data.verificationToken);
        }
        if(res.statusMessage =="Username/Password is Incorrect"){
            alert(res.statusMessage);
        }
        alert(res.statusMessage);
        
      })
});
