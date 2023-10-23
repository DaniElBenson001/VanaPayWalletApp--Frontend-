import { getTransfer, sendToDashboard, getPin, pinInput } from "./main.js";

//Variables to store all Links and API Endpoints for use
let dashboardInfo = `https://localhost:7007/api/Dashboard/getDashboardInfo`;
let transfer = `https://localhost:7007/api/Transaction/transfer`;
let verifyPin = `https://localhost:7007/api/Authentication/verifyPin`;
let validateUser = `https://localhost:7007/api/Authentication/validateUser`;
let createPin = `https://localhost:7007/api/Authentication/createPin`;
let addSecurityQuestion = 'https://localhost:7007/api/Authentication/addSecurityQuestion';

let dashboardAccNum = document.getElementById("acctNum");
let dashboardBalance = document.getElementById("balance");
const bearer = localStorage.getItem("bearer");

const acctNumInput = document.getElementById("accNumInput")
const amountInput = document.getElementById("amount");
const makeTransfer = document.getElementById("makeTransfer");


//Data for the card to supply the user's Account Number 
fetch(dashboardInfo, {
    //Header Description for the Fetch Method
    headers: {
        "content-type": "application/json",
        "Authorization": `bearer ${bearer}`
    }
})
//Returns the data in JSON format
.then((data) => {return data.json();})
//Where the main logic happens, and we manipulate the data response the way we want
.then((res) => {
    //For the Account Number Info in the transfers
    dashboardAccNum.innerHTML = `${res.accountNumber}`;
    console.log(res.accountNumber);
});

//Data for Card to supply the User's Account Balance
fetch(dashboardInfo, {
    //Header Description for the Fetch Method
    headers: {
        "content-type": "application/json",
        "Authorization": `bearer ${bearer}`
    }
})
//Returns the data in JSON format
.then((data) => { return data.json();})
//Where the main logic happens, and we manipulate the data response the way we want
.then((res) => {
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
            });//Alert - Invalid Input
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
                confirmButtonColor: '#055496'
            }); //Alert - Invalid Input
            amountInput.value = "";
            acctNumInput.value = "";
        }
    }
    numberValidator();


    //Condition if the User inputs Digits into the Fields
    if(digitPattern.test(amountInput.value) || digitPattern.test(acctNumInput.value)){
        //Fetch Request to validate if the User has a Pin or not
        fetch(validateUser, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": `bearer ${bearer}`
            }
        }).then((validationData) => { return validationData.json() }) //THEN method for Validation Data
        .then((validationResp) => {
            console.log(validationResp)

            //Condition if the User already has a Registered PIN
            if(validationResp.status == true){
                verifyUserPIN();
            }

            //Condition if the User does not have a Registered PIN
            if(validationResp.status != true){
                //Alert to Create a New Pin
                createNewPIN();
            }
        })
    }
});


//Function to verify a User's PIN
function verifyUserPIN(){
    //Alert to input the PIN
    Swal.fire({
        title: `ENTER YOUR PIN HERE`,
        html: `
        <p> Kindly input your PIN Here </p>
        <input type= "password" id="pin" class = "swal2-input" placeholder="Enter your Pin Here!">
        `
    }).then((pinAlertResp) => {
        if(pinAlertResp.isConfirmed){
            let pinData = pinInput()
            //Fetch Request to verify if the PIN provided corresponds with the registered PIN of the User
            fetch(verifyPin, {
                method: "POST",
                body: JSON.stringify(pinData),
                headers: {
                    "content-type": "application/json",
                    "Authorization": `bearer ${bearer}`
                }
            }).then((verificationData) => { return verificationData.json()}) //THEN method for Verification Data
            .then((verificationResp) => {
                console.log(verificationResp);
                makeTransaction()
            })
        }
    })
};



//Function to Create a New PIN
function createNewPIN(){
        Swal.fire({
        title: `Create your Pin Here`,
        icon: 'info',
        html:`<p> Kindly input your Customized Pin for Current and Future Transaction Validations. </p>
                <input type= "password" id="pin" class = "swal2-input" placeholder="Enter your Pin Here!">
                <br>
                <input type= "password" id="pin2" class = "swal2-input" placeholder="Confirm your Pin Here!">`,
        confirmButtonText: 'CREATE PIN',
        confirmButtonColor: '#055496',
        //Checks whether the Pins provided are One and the Same
        //Runs a Pre-confirm Function, that is before clicking the continue/confirm button, it checks the code inside the property and runs it
        preConfirm: () => {                           
            const pindata = Swal.getPopup().querySelector('#pin').value;   //Gets the Value of the Proposed User Pin
            const pindata2 = Swal.getPopup().querySelector('#pin2').value; //Gets the Value of the Proposdd User Pin once more, to the end that Accurate Comparism be made
            //Function to Compare the Pins inputted
            function checkPin(){
                if(pindata != pindata2){
                    return Swal.fire({
                        icon: 'error',
                        text: 'Your Pin or Confirm Pin is not Correct',
                        confirmButtonColor: '#055496'
                    })
                }
            } 
            return checkPin();
        }
    }).then((createPinAlertResp) => {
        if(createPinAlertResp.isConfirmed){
            let pinData = getPin();
            // console.log(pinData);
            //Fetch POST Request to register the User's customized PIN
            fetch(createPin, {
                method: "POST",
                body: JSON.stringify(pinData),
                headers: {
                    "content-type": "application/json",
                    "Authorization": `bearer ${bearer}`
                }
            }).then((createPinData) => { return createPinData.json() })
            .then((createPinResp) => {
                console.log(createPinResp);
                verifyUserPIN();
            })
        }
    })  
}



//Function to make a Transaction
function makeTransaction(){
    let transferDetails = getTransfer();
    //Fetch request to PUT the details of the current transactions
    fetch(transfer, {
        method: "PUT",
        body: JSON.stringify(transferDetails),
        headers: {
            "content-type": "application/json",
            "Authorization": `bearer ${bearer}`
        }
    }).then((transactionData) => { return transactionData.json()}) //THEN Method for Transaction Data
    .then((transactionResp) => {
        if(transactionResp.status == true){
            Swal.fire({
                icon: 'success',
                title: `Success`,
                text: `${transactionResp.statusMessage}`
            })
        }
        if(transactionResp.status != true){
            Swal.fire({
                icon: 'error',
                title: `Failed`,
                text: `${transactionResp.statusMessage}`
            }).then((swalTransactResp) => {
                if(swalTransactResp.isConfirmed){
                    sendToDashboard();
                }
            })
        }
    })
}