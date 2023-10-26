//Importing Necessary Variables for Fetch Requests to use
import { bearer, dashboardInfo, txnHistoryurl, pinAvailable } from "./endpoints.js";

//HUMANIZED TIME FOR SEAMLESS USER EXPERIENCE
//Time Variables
let timeNow = new Date().getHours();
let greeting = document.getElementById("greeting");

//Logic to greet the User at appropriate times
if(timeNow < 12){
    greeting.innerHTML = "Good Morning, ";
}
if(timeNow >= 12){
    greeting.innerHTML = "Good Afternoon, ";
}
if(timeNow >= 17){
    greeting.innerHTML = "Good Evening, ";
}
//All Functions, Variables and Modules will be duly declared and exported


//VARIABLES FOR DASHBOARD DOM MANIPULATION
let dashboardUsername = document.getElementById("dashboardUsername");
let dashboardFirstName = document.getElementById("userFirstName");
let dashboardAccNum = document.getElementById("acctNum");
let dashboardBal = document.getElementById("acctBalFigure");



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
                        
                        alert("Success")
                    }, true], // true to focus
                ]
            })
        }
    })
}
pinAvailableFunction();

//Fetching the User Info into His Dashboard
function getDashboardInfo(){
    fetch(dashboardInfo, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `bearer ${bearer}`
        }
    }).then((dashboardInfoData) => {
        console.log(dashboardInfoData);
        return dashboardInfoData.json();
    }).then((dashboardInfoResp) => {
        console.log(dashboardInfoResp)
        //For the Username
        dashboardUsername.innerHTML = `${dashboardInfoResp.userName}`;
        
        //For the First Name alone
        let fullName = `${dashboardInfoResp.fullName}`;
        const firstName = fullName.split(' ')[0];
        dashboardFirstName.innerHTML = firstName;
        
        //For the Account Number
        dashboardAccNum.innerHTML = `${dashboardInfoResp.accountNumber}`;
    
        //For the Account Balance
        dashboardBal.innerHTML = `${dashboardInfoResp.balance.toLocaleString("en-US")}`;
    })
}
getDashboardInfo();

//Fetching all the Transactions ever made in one sheet
function getTransactionHistory(){
    fetch(txnHistoryurl, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `bearer ${bearer}`
        }
    }).then((data) => {
        return data.json();
    }).then((res) => {
        // console.log(res[0].senderAcctNo);
        let transactionsData = "";
        res.map((values) => {
            var transacType = values.transacType;
            transactionsData += 
            `
            <tr>
                <td>
                    <div class="acctName">${values.senderInfo}</div>
                    <div class="transactAcctNum">${values.senderAcctNo}</div>
                </td>
                <td>${values.amount}</td>
                <td>
                    <span>${values.transacType}</span>
                </td>
                <td>
                <div class="acctName">${values.receiverInfo}</div>
                <div class="transactAcctNum">${values.receiverAcctNo}</div>
                </td>
                <td><b>${values.date}</b></td>
            </tr>`;
        });
        document.getElementById("transactionHistory").innerHTML = transactionsData;
    })
}
getTransactionHistory();
