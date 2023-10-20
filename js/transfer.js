import { getTransfer, sendToDashboard } from "./main.js";

let dashboardInfo = `https://localhost:7007/api/Dashboard/getDashboardInfo`;
let transfer = `https://localhost:7007/api/Transaction/transfer`;
let verifyPin = `https://localhost:7007/api/Authentication/verifyPin`;
let validateUser = `https://localhost:7007/api/Authentication/validateUser`;
let createPin = `https://localhost:7007//api/Authentication/createPin`;

let dashboardAccNum = document.getElementById("acctNum");
let dashboardBalance = document.getElementById("balance");
const bearer = localStorage.getItem("bearer");

const acctNumInput = document.getElementById("accNumInput")
const amountInput = document.getElementById("amount");
const makeTransfer = document.getElementById("makeTransfer");

const pindata = Swal.getPopup().querySelector('#pin').value;
const pindata2 = Swal.getPopup().querySelector('#pin2').value;

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

    //Function to call the Logic if checks the values inputted are Digits or not
    function numberValidator(){
        //Checks if both of them are found wanting
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

        //Checks if either of them is found wanting
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

    //Runs to check if the Values are correct and moves to Pin Validation and then Transfer Payment
    if(digitPattern.test(amountInput.value) == true && digitPattern.test(acctNumInput.value) == true){
        
        //First attempts to validate if the User has a Pin saved in the Database
        //GET Request to obtain Pin Validity Response
        fetch(validateUser, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": `bearer ${bearer}`
            }

        }).then((res) =>{ return res.json()})
        //a then method to capture the response of the API request we made, retrieving the Status Mesage for User Pin Validity
        .then((response) => {
            console.log(response);
            if(response.status == false){
                Swal.fire({
                    title: `Oops`,
                    text: `${response.statusMessage}`,
                    icon: 'info',
                    confirmButtonText: "Create a New PIN",
                    showCancelButton: true,
                    confirmButtonColor: '#055496',
                }).then((resp) => {
                    //When the User realises that He does not have a Solid PIN, He decides to Subscribe to One....
                    if(resp.isConfirmed){
                        Swal.fire({
                            title: `Create your Pin Here`,
                            icon: 'info',
                            html:`<p> Kindly input your Customized Pin for Future Transaction Validations. </p>
                                  <input type= "password" id="pin" class = "swal2-input" placeholder="Enter your Pin Here!">
                                    <br>
                                  <input type= "password" id="pin2" class = "swal2-input" placeholder="Confirm your Pin Here!">`,
                            confirmButtonText: 'CREATE PIN',
                            confirmButtonColor: '#055496',
                            //Checks whether the Pins provided are One and the Same
                            preConfirm: () => {

                                function checkPin(){
                                    if(pindata != pindata2){
                                        return Swal.fire({
                                            icon: 'error',
                                            title: 'Your Pin or Confirm Pin is not Correct!'
                                        })
                                    }
                                } checkPin();
                                
                            }    
                        }).then((result) => {
                            //Checks if the User has clicked on create and then performs a FETCH request to post the PIN provided
                            function getPin(){
                                return {
                                    userPin: pindata,
                                    confirmUserPin: pindata2
                                }
                            }
                            let getPinData = getPin();
                            if(result.isConfirmed){
                                fetch(createPin, {
                                    method: "POST",
                                    body: JSON.stringify(getPinData),
                                    headers: {
                                        "content-type": "application/json",
                                        "Authorization": `bearer ${bearer}`
                                    }
                                }).then((res) => {return res.json()})
                                .then((response) => {
                                    console.log(response);
                                })
                            }
                        });
                    }
                });
            }
        })
    }
});