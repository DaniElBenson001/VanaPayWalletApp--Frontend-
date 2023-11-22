

export var mainURL = "https://danielbenson001.github.io/VanaPayWalletApp--Frontend-";
let logoutBtn = document.getElementById("logout");

//load the dashboard
export function sendToDashboard(){
    location.replace(`${mainURL}/dashboard.html`);
}

//load the login
export function sendToLogin(){
    location.replace(`${mainURL}/login.html`);
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


export function logout(){
    let logout = document.getElementById("logout");

    logout.addEventListener('click', function(){
        Swal.fire({
            icon: 'warning',
            title: 'Are you Sure?',
            showCancelButton: true,
            confirmButtonColor: '#055496',

        }).then((logoutAlertResp) => {
            if(logoutAlertResp.isConfirmed){
                localStorage.clear();
                location.replace('https://danielbenson001.github.io/VanaPayWalletApp--Frontend-/index.html');
            }
        })
    })
}

export function autoLogoutFunction(){
    let logoutTimer;

    let initialTime = 0;
    let idleTime = 5;
    let limitTime = 8;

    clearInterval(logoutTimer);

    function timer(){
        logoutTimer = setInterval(function(){
        initialTime++;
            console.log(initialTime)
        
            if(initialTime === idleTime){
                promptUser();
                // clearInterval(logoutTimer);
            }

            if(initialTime === limitTime){
                logOutUser();
            }
        }, 60000);
    
    }
    timer();

    function promptUser(){
        iziToast.show({
            color: 'blue',
            position: 'topRight',
            title: 'Hi',
            timeout: 0,
            message: `Are you still there? You will be logged out after 8 minutes`,
            balloon: false,
            drag: true,
            close: false,
            buttons: [
                [`<button> I'm Back </button>`, function(instance, toast){
                    iziToast.show({
                        color: 'blue',
                        position: 'topRight',
                        title: 'Ok, Make Sure you stay Logged in! 😉',
                        balloon: true
                    });
                    instance.hide({
                        transitionOut: 'fadeOutDown',

                    }, toast);
                }]
            ]
        })	
    }

    document.addEventListener('mousemove', resetTimer);

    function resetTimer(){
        initialTime = 0;
    }

    //Send to Log Out
    function logOutUser(){
        localStorage.clear();
        sessionStorage.setItem('logoutReason', 'Inactive')
        location.replace('https://danielbenson001.github.io/VanaPayWalletApp--Frontend-/index.html');
    }

    // autoLogout();
    // document.addEventListener('mousemove', userActivity);
}
