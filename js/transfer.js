import { getTransfer, sendToDashboard, getPin } from "./main.js";

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
    console.log(res.userName);
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

        }).then((data) =>{ return data.json()})
        //a then method to capture the response of the API request we made, retrieving the Status Mesage for User Pin Validity
        .then((response) => {
            console.log(response);
            //Condition if the User does not have a PIN registered
            if(response.status == false){
                Swal.fire({
                    title: `Oops`,
                    text: `${response.statusMessage}`,
                    icon: 'info',
                    confirmButtonText: "Create a New PIN",
                    showCancelButton: true,
                    confirmButtonColor: '#055496',
                })
                //Runs when a Conditional Response of the User clicking the Sweet Alert Button to Continue
                .then((resp) => {
                    //When the User realises that He does not have a PIN, He decides to Subscribe to One....
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
                            //Runs a Pre-confirm Function, that is before clicking the continue/confirm button, it checks the code inside the property and runs it
                            preConfirm: () => {                           
                                const pindata = Swal.getPopup().querySelector('#pin').value;   //Gets the Value of the Proposed User Pin
                                const pindata2 = Swal.getPopup().querySelector('#pin2').value; //Gets the Value of the Proposdd User Pin once more, to the end that Accurate Comparism be made
                                //Function to Compare the Pins inputted
                                function checkPin(){
                                    if(pindata != pindata2){
                                        return Swal.fire({
                                            icon: 'error',
                                            title: 'Your Pin or Confirm Pin is not Correct'
                                        })
                                    }
                                } checkPin();
                                
                            }    
                        })
                        //Runs when a Conditional Response of the User clicking the Sweet Alert Button to Continue
                        .then((SwalResponse) => {
                            //Checks if the User has clicked on create and then performs a FETCH request to post the PIN provided
                            let getPinData = getPin(); //getPin() Function is an exported module Function found in the ./js/main.js
                            
                            if(SwalResponse.isConfirmed){
                                fetch(createPin, {
                                    method: "POST",
                                    body: JSON.stringify(getPinData),
                                    headers: {
                                        "content-type": "application/json",
                                        "Authorization": `bearer ${bearer}`
                                    }
                                }).then((res) => {return res.json()})
                                //If the POST yielded a  Positive Result, It gives a Status Message - being Successful
                                .then((response) => {
                                    Swal.fire({
                                        icon: 'success',
                                        title: `Successful`,
                                        text: `${response.statusMessage}`,
                                        confirmButtonText: "Continue",
                                        confirmButtonColor: '#055496'
                                    })
                                }).then((result) => {
                                    //Runs when a Conditional Response of the User clicking the Sweet Alert Button to Continue
                                    //Goes ahead to make a Transfer using the Transfer Function
                                    if(result.isConfirmed){
                                        Swal.fire({
                                            // title: 'SECURITY QUESTION',
                                            html:`
                                                <div style = "text-align: center">
                                                    <h2 style= "font-weight: 800"> SECURITY QUESTION </h2>
                                                    <p id ="question" style = "font-size: 16px; font-weight: 600; margin-top: -10px"> ${sQuestion} </p>
                                                    <input style= "margin: 0; font-size: 14px; width: 70%" type= "text" id="sqAnswer" class = "swal2-input" placeholder="Enter your Answer Here!">
                                                </div>
                                                `,
                                            confirmButtonText: "Let's Go",
                                            confirmButtonColor: '#055496'
                                        }).then((sQuestionResp) => {
                                            if(sQuestionResp.isConfirmed){
                                                let sQuestionData = getSecurityQuestion();
                                                fetch(addSecurityQuestion, {
                                                    method: "POST",
                                                    body: JSON.stringify(sQuestionData),
                                                    headers: {
                                                        'Content-Type' : 'application/json',
                                                        "Authorization": `bearer ${bearer}`
                                                    }
                                                }).then((response) => { return response.json()})
                                                .then((res) => {
                                                    console.log(res)
                                                })
                                            }
                                        }).then((sqFetchResp) => {
                                            if(sqFetchResp.isConfirmed){
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Great Job',
                                                    text:  `Thank you for filling in...`,
                                                    confirmButtonText: "Let's Go"
                                                }).then((SwalResult) => {
                                                    if(SwalResult.isConfirmed){
                                                        makeTransferFunction();
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        });
                    }
                });
            }

            //Condition if the User has a PIN registered afore
            if(response.status == true){
                makeTransferFunction();
            }
        })
    }
});

//Function that makes the Transfer
function makeTransferFunction(){
    //Sends in a Sweet Alert to receive the Pin for Verification
    Swal.fire({
        title: "Enter your Pin",
        html: `<input type= "password" id="pin" class = "swal2-input" placeholder="Enter your Pin Here!">`,
        confirmButtonText: "CONTINUE",
        confirmButtonColor: '#055496',
        focusConfirm: false,
        preConfirm: () =>{
            //Function that gets the Value of the PIN for Verification
            function getPin(){
                const pindata = Swal.getPopup().querySelector('#pin').value;
                return {pin: pindata}
            };
            var pinData = getPin();

            //FETCH Request that posts the PIN provided and verifies the PIN
            fetch(verifyPin, {
                method: "POST",
                body: JSON.stringify(pinData),
                headers: {
                    "content-type": "application/json",
                    "Authorization": `bearer ${bearer}`
                }
            })
            //Returns the data in JSON format
            .then((res) => res.json())
            //Where the main logic happens, and we manipulate the data response the way we want
            .then((response) => {
                console.log(response);
                //If the Response is False, Return an Incorrect Sweet Alert and exit
                if(response.status != true){
                    Swal.fire({
                        title: `Incorrect Pin`,
                        text: `${response.statusMessage}`,
                        icon: 'error',
                        confirmButtonText: "OK",
                        confirmButtonColor: '#055496',
                    });
                }
                //If the Response is True, Return a Sweet Alert to confirm
                if(response.status == true){
                    Swal.fire({
                        title: `Are you Sure?`,
                        text: `You will not be able to Revert this`,
                        icon: 'warning',
                        confirmButtonText: "Yes, Continue Transfer",
                        showCloseButton: true,
                        confirmButtonColor: '#055496'
                    })
                    //Runs when a Conditional Response of the User clicking the Sweet Alert Button to Continue
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
                                //Condition if the Transaction was successful
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
                                } 
                                //Condition if the Transaction was Unsuccessful
                                if(res.status == false){
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
                            //I actually don't know what this does 😂
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

//Make it Reach 300 Lines 