//Importing Necessary Variables for Fetch Requests to use
import { bearer, dashboardInfo, pinAvailable, recentTxnHistory, createPin } from "./endpoints.js";
import { sendToLogin, logout, autoLogoutFunction, getPin } from "./main.js";

//VARIABLES FOR DASHBOARD DOM MANIPULATION
let username = document.getElementById("username");
let firstname = document.getElementById("firstname");
let accountNumber = document.getElementById("account-number");
let balance = document.getElementById("user-balance");

logout(); //Go to Definition for Details
autoLogoutFunction(); //Go to Definition for Details

//HUMANIZED TIME FOR SEAMLESS USER EXPERIENCE
//Time Variables
let timeNow = new Date().getHours();
let greeting = document.getElementById("greeting");

//Logic to greet the User at appropriate times
if(timeNow < 12){
    greeting.innerHTML = "Good Morning, ";
}
if(timeNow >= 12){
    greeting.innerHTML = `Good Afternoon, `;
}
if(timeNow >= 17){
    greeting.innerHTML = "Good Evening, ";
}

//FETCH REQUESTS FOR MULTIPLE DASHBOARD API ENDPOINTS
//Fetching if the User has a PIN avaialble
function pinAvailableFunction(){
    fetch(pinAvailable,{
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `bearer ${bearer}`
        }
    }).then((validationData) => { return validationData.json() }) //THEN Method for Validation Data
    .then((validationResp) => {
        console.log(validationResp)
        if(validationResp.status === false){
            iziToast.show({
                color: 'blue',
                position: 'topRight',
                title: 'PIN Creation',
                message: `Kindly Have your PIN created for Future Transactions!`,
                timeout: 7000,
                drag: true,
                buttons: [
                    ['<button style = "font-weight: 600">Create</button>', function (instance, toast) {
                        
                        createNewPIN();
                    }, true], // true to focus
                ]
            })
        }
    })
}
pinAvailableFunction();

//Create New PIN
function createNewPIN(){
    Swal.fire({
        title: `Create your Pin Here`,
        icon: 'info',
        html:`<p> Kindly input your Customized Pin for Current and Future Transaction Validations. </p>
                <input type= "password" id="pin" class = "swal2-input" placeholder="Enter your Pin Here!" maxLength = "4">
                <br>
                <input type= "password" id="pin2" class = "swal2-input" placeholder="Confirm your Pin Here!" maxLength = "4">`,
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
                console.log(createPinData);
                if(createPinData.status !== 200)
                iziToast.show({
                    color: 'red',
                    position: 'topRight',
                    title: 'Error',
                    message: `Kindly Ensure that you fill in your PIN appropriately!`
                })
                return createPinData.json() }) //THEN Method for Creation Data
            .then((createPinResp) => {
                console.log(createPinResp);
                if(createPinResp.status === true)
                iziToast.show({
                    color: 'green',
                    position: 'topRight',
                    title: 'Success',
                    message: `Your Pin is Successfully Created! 😎`
                })
            })
            console.log(getPin());
        }
    })  
}

//Fetching the User Info into His Dashboard
function getDashboardInfo(){
    fetch(dashboardInfo, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `bearer ${bearer}`
        }
    }).then((dashboardInfoData) => { return dashboardInfoData.json(); })
    .then((dashboardInfoResp) => {
        console.log(dashboardInfoResp)
        //For the Username
        username.innerHTML = `@${dashboardInfoResp.userName}`;
        
        //For the First Name alone
        let fullName = `${dashboardInfoResp.fullName}`;
        const splitFirstName = fullName.split(' ')[0];
        firstname.innerHTML =  `${splitFirstName}`;
        
        //For the Account Number
        accountNumber.innerHTML = `${dashboardInfoResp.accountNumber}`;
    
        //For the Account Balance
        balance.innerHTML = `NGN ${dashboardInfoResp.balance.toLocaleString("en-US")}`;
    })
}
getDashboardInfo();

//Fetching all the Transactions ever made in one sheet
function getRecentTransactions(){
    fetch(recentTxnHistory, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `bearer ${bearer}`
        }
    }).then((txnHistoryData) => { return txnHistoryData.json(); })
    .then((txnHistoryResp) => {
        console.log(txnHistoryResp);
        // console.log(res[0].senderAcctNo);
        let transactionsData = "";
        txnHistoryResp.data.map((txnValues) => {
            transactionsData += 
            `
            <div class="recent-txn-card">
                <div class="txn-card-left">
                    <div id="date-of-txn">
                        ${new Date(txnValues.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit"
                        })} -
                        ${new Date(txnValues.date).toLocaleTimeString(undefined, {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                        })}
                    </div>
                    <div id="txn-account-name">${txnValues.fullname}</div>
                    <div class="horizontal">
                        <div id="txn-username">@${txnValues.username} -</div>
                        <div id="txn-account-number">${txnValues.accNo}</div>
                    </div>
                </div>
                <div class="txn-card-right">
                    <div id="txn-amount">NGN ${txnValues.amount.toLocaleString("en-US")}</div>
                    <div>${txnValues.transacType}</div>
                </div>
            </div>
            `
        });
        document.getElementById("recent-txn-history-container").innerHTML = transactionsData;
    })
}
getRecentTransactions();


//FUNCTION TO POP UP THE USER'S CREDENTIALS UPON CLICK
// acctInfo.addEventListener('click', function () {
//     fetch(dashboardInfo, {
//         method: "GET",
//         headers: {
//             "content-type": "application/json",
//             "Authorization": `bearer ${bearer}`
//         }
//     }).then((dashboardInfoData) => {
//         console.log(dashboardInfoData);
//         return dashboardInfoData.json();
//     }).then((dashboardInfoResp) => {
//         console.log(dashboardInfoResp)
        
//         Swal.fire({
//             html:`
//             <div class="acctInfoImg" style="display: inline-block;">
//                 <img src="./img/img_avatar.png" alt="" id="acctInfoPic" style= "width: 100px; height: 100px">
//             </div>
//             <div style= "font-weight: 600; font-size: 20px"> ${dashboardInfoResp.fullName} </div>
//             <div style="font-size:14px; font-family: Inter-Regular">
//                 <span> ${dashboardInfoResp.userName} • </span>
//                 <span style="font-family: Inter-Bold; color: #378ace;"> ${dashboardInfoResp.accountNumber} </span>
//             </div>
//             `
//           })
//     })

// });