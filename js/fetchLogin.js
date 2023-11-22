import { sendToDashboard, sendToLogin, sendToSignUp, getUserLogin} from "./main.js";
import { login } from "./endpoints.js";


let buttonIsClicked = false;

const loginBtn = document.getElementById("loginBtn");

const logoutReason = sessionStorage.getItem('logoutReason');

if(logoutReason === 'Inactive'){
    iziToast.show({
        color: 'beige',
        position: 'topRight',
        title: 'You were Logged Out due to Inactivity! 😪',
        maxWidth: '400px',
        balloon: false,
        timeout: 0
    })
    sessionStorage.removeItem('logoutReason');
}


loginBtn.addEventListener('click', (e) => {
    buttonIsClicked = true;
    // loginBtn.style.cursor = "not-allowed";
    // loginBtn.disabled = true;

    const data = getUserLogin();
    console.log(data);

    //Fetch API to login the Account User
    fetch(login, {
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
            // console.log(res.data.verificationToken);
        }
        if(res.statusMessage == "Username/Password is Incorrect!" || res.status == false){
            Swal.fire({
                title: `Hi, ${getUserLogin().username} `,
                text: `Username or Password is Incorrect`,
                icon: 'error',
                confirmButtonText: "OK",
                confirmButtonColor: '#055496',
            });
        }
        if(res.statusMessage == "You are Logged in")
            Swal.fire({
                title: `Hi, ${getUserLogin().username} `,
                text: `${res.statusMessage}`,
                icon: 'success',
                confirmButtonText: "Let's Go",
                confirmButtonColor: '#055496',
                isConfirmed: true
            }).then((result) => {
                if(result.isConfirmed){
                    sendToDashboard();
                }
            });
            // alert(res.statusMessage)
        
      })
});
