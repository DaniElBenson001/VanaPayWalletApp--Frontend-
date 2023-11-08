import { randomSecurityQuestion } from "./generateSecurityQuestions.js";
import { bearer ,transfer, searchByAccNo, pinAvailable, createPin, securityQuestion, dashboardInfo, verifyPin  } from "./endpoints.js";
import { getTransfer, sendToDashboard, getPin, pinInput, searchAccInput, getSecurityQuestions } from "./main.js";

//VARIABLES TO STORE ALL LINKS AND API ENDPOINTS FOR USE
const accNum = document.getElementById("acc-number");
const accBalance = document.getElementById("acc-balance");
const acctNumInput = document.getElementById("accnumber-input");
const receipientAccName = document.getElementById("beneficiary-accname");

const initializeTransfer = document.getElementById("initialize-transfer");
const amountInput = document.getElementById("amount");

//FUNCTION TO GET ACCOUNT DETAILS OF THE USER IN QUESTION
function getAccountInfo(){
    //Fetching the User Account Details for Display
    fetch(dashboardInfo, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `bearer ${bearer}`
        },
    }).then((accountInfoData) => {
        console.log(accountInfoData); 
        return accountInfoData.json();
    })
    .then((accountInfoResp) => {
        console.log(accountInfoResp)
        accNum.innerHTML = `${accountInfoResp.accountNumber}`;
        accBalance.innerHTML = `NGN ${accountInfoResp.balance.toLocaleString("en-US")}`
    })
}
getAccountInfo();

//FOCUSOUT EVENT LISTENER TO POP OUT THE PROVIDED RECEIVER'S ACCOUNT NAME FOR EASY CONFIRMATION
acctNumInput.addEventListener('focusout', function(){
    //Fetch Request to  Automatically Search for the Account Number
    var searchData = searchAccInput();
    if(searchData.acc == ""){
        iziToast.show({
            color: 'blue',
            position: 'topRight',
            title: 'Info',
            message: `Kindly Input a valid account number`
        })
    }
    fetch(searchByAccNo, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(searchData)
    }).then((searchAccData) => { return searchAccData.json() }) //THEN Method for Search Data
    .then((searchAccResp) =>{
        console.log(searchAccResp)
        if(searchAccResp.status === true){
            receipientAccName.innerHTML = `${searchAccResp.data.firstName} ${searchAccResp.data.lastName}`
        }
        if(searchAccResp.status === false){
            console.log(searchAccResp);
            //Alert to send in an Invalid search response

            iziToast.show({
                color: 'red',
                position: 'topRight',
                title: 'Error',
                message: `${searchAccResp.statusMessage}`
            })
        }
    })

})

//SUBMIT EVENT LISTENER TO CONTINUE TRANSACTION
initializeTransfer.addEventListener("click", function(){
    
    //LOGIC TO CHECK IF THE USER ATTEMPTS TO WRITE A CHARACTER THAT IS NOT A DIGIT
    let digitPattern = /^\d+$/;

    //FUNCTION TO CALL THE LOGIC IF CHECKS THE VALUES INPUTTED ARE DIGITS OR NOT
    function numberValidator(){
        //Checks if both of them are found wanting
        if(!digitPattern.test(amountInput.value) && !digitPattern.test(acctNumInput.value)){
            //Alert - Invalid Input
            iziToast.show({
                color: 'red',
                position: 'topRight',
                title: 'Error',
                message: `Kindly Input Digits only`
            })
            amountInput.value = ""; acctNumInput.value = "";
        }

        //Checks if either of them is found wanting
        if(!digitPattern.test(amountInput.value) || !digitPattern.test(acctNumInput.value)){
            //Alert - Invalid Input
            iziToast.show({
                color: 'red',
                position: 'topRight',
                title: 'Error',
                message: `Kindly Input Digits only`
            }) 
            amountInput.value = ""; acctNumInput.value = "";
        }
    }
    numberValidator();


    //CONDITION IF THE USER INPUTS THE APPROPRIATE VALUES IN THE FIELDS
    if(digitPattern.test(amountInput.value) || digitPattern.test(acctNumInput.value)){
        //FETCH REQUEST TO CHECK IF THE USER HAS A PIN AVAILABLE IN HIS PROFILE
        fetch(pinAvailable, {
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

//FUNCTION TO VERIFY A USER'S PIN
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
            }).then((verificationData) => { 
                if(verificationData.status !== 200){
                    iziToast.show({
                    color: 'red',
                    position: 'topRight',
                    title: 'Error',
                    message: `${verificationData.statusText}`
                    })
                }
                return verificationData.json()}) //THEN method for Verification Data
            .then((verificationResp) => {
                console.log(verificationResp);

                if(verificationResp.status === true){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Are you Sure?',
                        text: 'You will not be able to Revert this...',
                        showCancelButton: true
                    }).then((verificationAlertResp) => {
                        if(verificationAlertResp.isConfirmed){
                            makeTransaction();
                        }
                    })
                }

                if(verificationResp.status === false){
                    Swal.fire({
                        icon: 'error',
                        title: 'Wrong PIN',
                        text: `${verificationResp.statusMessage}`
                    })
                }
            })
        }
    })
};

//FUNCTION TO CREATE A NEW PIN
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
            //Function to Compare the Pins inputted
            function checkPin(){
                const pindata = Swal.getPopup().querySelector('#pin').value;   //Gets the Value of the Proposed User Pin
                const pindata2 = Swal.getPopup().querySelector('#pin2').value; //Gets the Value of the Proposdd User Pin once more, to the end that Accurate Comparism be made
                if(pindata != pindata2){
                    return Swal.fire({
                        icon: 'error',
                        text: 'Your Pin or Confirm Pin is not Correct',
                        confirmButtonColor: '#055496'
                    })
                }
            } 
            checkPin();
            if(checkPin()){
                iziToast.show({
                    color: 'red',
                    position: 'topRight',
                    title: 'Error',
                    message: `Kindly Ensure that your PIN are equal!`
                })
            }
        }
    }).then((createPinAlertResp) => {
        if(createPinAlertResp.isConfirmed){
            let pinData = getPin();
            //Fetch POST Request to register the User's customized PIN
            fetch(createPin, {
                method: "POST",
                body: JSON.stringify(pinData),
                headers: {
                    "content-type": "application/json",
                    "Authorization": `bearer ${bearer}`
                }
            }).then((createPinData) => {
                if(createPinData.status !== 200)
                iziToast.show({
                    color: 'red',
                    position: 'topRight',
                    title: 'Error',
                    message: `Kindly Ensure that your PIN are equal!`
                })
                return createPinData.json() }) //THEN Method for Creation Data
            .then((createPinResp) => {
                console.log(createPinResp);
            })
            console.log(getPin());
            addSecurityQuestions();
        }
    })  
}

//FUNCTION FOR SECURITY QUESTIONS FOR FUTURE TRANSACTIONS
function addSecurityQuestions(){
    let sQuestion = randomSecurityQuestion();
    console.log(sQuestion);
    Swal.fire({
        icon: 'info',
        html:`
        <div style = "text-align: center">
            <h2> SECURITY QUESTION </h2>
            <p id ="question" style = "font-size: 16px; font-weight: 600; margin-top: -10px"> ${sQuestion} </p>
            <input style= "margin: 0; font-size: 14px; width: 70%" type= "text" id="answer" class = "swal2-input" placeholder="Enter your Answer Here!">
        </div>
        `,
        confirmButtonText: "Let's Go",
        confirmButtonColor: '#055496'
    }).then((getSecurityQuestionAlertResp) => {
        if(getSecurityQuestionAlertResp.isConfirmed || !getSecurityQuestions().answer == ""){
            //Before the PIN is fully created and registered into the Database, the Security 
            postSecurityQuestion();
        }
        if(getSecurityQuestions().answer == "" && getSecurityQuestionAlertResp.isConfirmed){
            Swal.fire({
                icon: 'error',
                title: 'PIN Creation Failed',
                text: 'You must have a Security Question Provided before you can use your PIN!'
            })
        }
    })
}

//FUNCTION TO EXECUTE POST REQUEST TO CREATE SECURITY QUESTION FOR USER IN QUESTION
function postSecurityQuestion(){
    let securityQuestData = getSecurityQuestions();
    console.log(securityQuestData);

    //Fetch POST request to register the User's secret security question
    fetch(securityQuestion, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `bearer ${bearer}`
        },
        body: JSON.stringify(securityQuestData)
    }).then((getSecurityQuestionData) => { return getSecurityQuestionData.json()}) //THEN Method for Security Questions
    .then((getSecurityQuestionsResp) => {
        console.log(getSecurityQuestionsResp);
        iziToast.show({
            color: 'green',
            position: 'topRight',
            title: `Pin Successfully Created`,
            timeout: 10000,
            drag: true,
            message: `${getSecurityQuestionsResp.statusMessage}`
        })
    })
}

//FUNCTION TO EXECUTE A PUT REQUEST TO MAKE A TRANSACTION
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
        console.log(transactionResp);
        if(transactionResp.status == true){
            iziToast.show({
                color: 'green',
                position: 'topRight',
                title: 'Successful',
                timeout: 10000,
                message: `${transactionResp.statusMessage}`,
                balloon: false,
                drag: true,
                onClosing: function (){
                    sendToDashboard();
                }
            })
        }
        else{
            iziToast.show({
            color: 'red',
            position: 'topRight',
            title: 'Failed',
            timeout: 10000,
            message: `${transactionResp.statusMessage}`,
            balloon: false,
            drag: true,
            onClosing: function (){
                sendToDashboard();
            }
            });
        }
    })
}