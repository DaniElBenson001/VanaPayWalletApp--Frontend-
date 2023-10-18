import { getTransfer, sendToDashboard } from "./main.js";

let dashboardInfo = `https://localhost:7007/api/Dashboard/getDashboardInfo`;
let transfer = `https://localhost:7007/api/Transaction/transfer`;
let verifyPin = `https://localhost:7007/api/Authentication/verifyPin`;

let dashboardAccNum = document.getElementById("acctNum");
let dashboardBalance = document.getElementById("balance");
const bearer = localStorage.getItem("bearer");

const acctNumInput = document.getElementById("accNumInput")
const amountInput = document.getElementById("amount");
const makeTransfer = document.getElementById("makeTransfer");

//Data for the card to supply the user's Account Number 
fetch(dashboardInfo, {
    headers: {
        "content-type": "application/json",
        "Authorization": `bearer ${bearer}`
    }
}).then((data) => {
    return data.json();
}).then((res) => {
    //For the Account Number Info in the transfers
    dashboardAccNum.innerHTML = `${res.accountNumber}`;
    console.log(res.userName);
});

//Data for Card to supply the User's Account Balance
fetch(dashboardInfo, {
    headers: {
        "content-type": "application/json",
        "Authorization": `bearer ${bearer}`
    }
}).then((data) => {
    return data.json();
}).then((res) => {
    //For the Account Number Info in the transfers
    dashboardBalance.innerHTML = `NGN ${res.balance.toLocaleString("en-US")}`;
});

//Submit Event Listener to continue Transaction
makeTransfer.addEventListener("click", function(){
    //Logic to check if the User attempts to write a character that is not a digit
    let digitPattern = /\d/;
    function numberValidator(){
        if(!digitPattern.test(amountInput.value) && !digitPattern.test(acctNumInput.value)){
            Swal.fire({
                title: `Invalid Input`,
                text: `Kindly Input Digits only`,
                icon: 'error',
                confirmButtonText: "OK",
                confirmButtonColor: '#055496',
            });
            amountInput.value = "";
            acctNumInput.value = "";
        }

        if(!digitPattern.test(amountInput.value) || !digitPattern.test(acctNumInput.value)){
            Swal.fire({
                title: `Invalid Input`,
                text: `Kindly Input Digits only`,
                icon: 'error',
                confirmButtonText: "OK",
                confirmButtonColor: '#055496',
            });
            amountInput.value = "";
            acctNumInput.value = "";
        }
    }
    numberValidator();


    if(digitPattern.test(amountInput.value) == true && digitPattern.test(acctNumInput.value) == true){
        return Swal.fire({
            title: "Enter your Pin",
            html: `<input type= "password" id="pin" class = "swal2-input" placeholder="Enter your Pin Here!">`,
            confirmButtonText: "CONTINUE",
            confirmButtonColor: '#055496',
            focusConfirm: false,
            preConfirm: () =>{
                function getPin(){
                    const pindata = Swal.getPopup().querySelector('#pin').value;
                    return {pin: pindata}
                };
                var pinData = getPin();
    
                fetch(verifyPin, {
                    method: "POST",
                    body: JSON.stringify(pinData),
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `bearer ${bearer}`
                    }
                })
                .then((res) => res.json())
                .then((response) => {
                    console.log(response);
                    if(response.status != true){
                        Swal.fire({
                            title: `Incorrect Pin`,
                            text: `${response.statusMessage}`,
                            icon: 'error',
                            confirmButtonText: "OK",
                            confirmButtonColor: '#055496',
                        });
                    }if(response.status == true){
                        Swal.fire({
                            title: `Are you Sure?`,
                            text: `You will not be able to Revert this`,
                            icon: 'warning',
                            confirmButtonText: "Yes, Continue Transfer",
                            confirmButtonColor: '#055496'
                        })
                        .then((result) => {
                            if(result.isConfirmed){
                                //Making a POST Request to make a Transfer
                                let data = getTransfer();
    
                                fetch(transfer, {
                                    method: "PUT",
                                    body: JSON.stringify(data),
                                    headers: {
                                        'Content-Type' : 'application/json',
                                        'mode' : 'no-cors',
                                        "Authorization": `bearer ${bearer}`
                                    }
                                }).then((res) => {
                                    return res.json();
                                })
                                .then((res) => {
                                    console.log(data);
                                    console.log(res);
                                    console.log(res.statusMessage);
                                    if(res.status == true){
                                        Swal.fire({
                                            title: `Successful`,
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
                                    } if(res.status == false){
                                        Swal.fire({
                                            title: `Error`,
                                            text: `${res.statusMessage}`,
                                            icon: 'error',
                                            confirmButtonText: "Let's Go",
                                            confirmButtonColor: '#055496',
                                            isConfirmed: true
                                        }).then((result) => {
                                            if(result.isConfirmed){
                                                location.replace('http://127.0.0.1:5500/transfer.html')
                                            }
                                        });
                                    }
                                })
                                .then((response) => {
                                    console.log(response);
                                });
                            }
                        });
                    }
                })
            }
        })
    }
    
    

    
});