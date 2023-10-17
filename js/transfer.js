import { getTransfer, sendToDashboard } from "./main.js";

let dashboardInfo = `https://localhost:7007/api/Dashboard/getDashboardInfo`;
let transfer = `https://localhost:7007/api/Transaction/transfer`;

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
    // console.log(data);
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
    // console.log(data);
    return data.json();
}).then((res) => {
    //For the Account Number Info in the transfers
    dashboardBalance.innerHTML = `NGN ${res.balance.toLocaleString("en-US")}`;
});

//Submit Event Listener to continue Transaction
makeTransfer.addEventListener("click", function(){
    Swal.fire({
        title: "Enter your Pin",
        html: `<input type= "password" id="pin" class = "swal2-input" placeholder="Enter your Pin Here!">`,
        confirmButtonText: "CONTINUE",
        confirmButtonColor: '#055496',
        focusConfirm: false,
        preConfirm: () =>{
            function getPin(){
                const pindata = Swal.getPopup().querySelector('#pin').value;
                return {user}
            }
        }
    })

    // //Logic to check if the User attempts to write a character that is not a digit
    // function numberValidator(){
    //     let digitPattern = /\d/;
    //     if(!digitPattern.test(amountInput.value)){
    //         alert("Kindly Input Digits only!");
    //         amountInput.value = "";
    //     }
    //     if(!digitPattern.test(acctNumInput.value)){
    //         alert("Kindly Input Digits only!");
    //         acctNumInput.value = "";
    //     }
    // }
    // numberValidator();
    
    // //Making a POST Request to make a Transfer
    // let data = getTransfer();

    // fetch(transfer, {
    //     method: "PUT",
    //     body: JSON.stringify(data),
    //     headers: {
    //         'Content-Type' : 'application/json',
    //         'mode' : 'no-cors',
    //         "Authorization": `bearer ${bearer}`
    //     }
    // }).then((res) => {
    //     return res.json();
    // })
    // .then((res) => {
    //     console.log(data);
    //     console.log(res);
    //     console.log(res.statusMessage);
    //     if(res.status == true){
    //         alert(res.statusMessage);
    //         sendToDashboard();
    //     }else{
    //         alert(res.statusMessage);
    //     }
    // });
});