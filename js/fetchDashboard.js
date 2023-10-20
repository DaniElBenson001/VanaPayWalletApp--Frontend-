import { mainURL } from "./main.js";
let baseURL = "https://localhost:7007";


//HUMANIZED TIME SECTION
//-----------------------------------------------------------------------------------
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

//DASHBOARD SECTION 
//----------------------------------------------------------------------------------

// Dashboard Variables
let dashboardInfo = `${baseURL}/api/Dashboard/getDashboardInfo`;
let dashboardUsername = document.getElementById("dashboardUsername");
let dashboardFirstName = document.getElementById("userFirstName");
let dashboardAccNum = document.getElementById("acctNum");
let dashboardBal = document.getElementById("acctBalFigure");

//Fetching the User Info into His Dashboard
export function getDashboardInfo(){
    const bearer = localStorage.getItem("bearer");
    fetch(dashboardInfo, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `bearer ${bearer}`
        }
    }).then((data) => {
        console.log(data);
        return data.json();
    }).then((res) => {
        //For the Username
        dashboardUsername.innerHTML = `${res.userName}`;
        
        //For the First Name alone
        let fullName = `${res.fullName}`;
        const firstName = fullName.split(' ')[0];
        dashboardFirstName.innerHTML = firstName;
        
        //For the Account Number
        dashboardAccNum.innerHTML = `${res.accountNumber}`;

        //For the Account Balance
        dashboardBal.innerHTML = `${res.balance.toLocaleString("en-US")}`;
    })
}
getDashboardInfo();

//TRANSACTION HISTORY SECTION
//----------------------------------------------------------------------------------
const txnHistoryurl = `${baseURL}/api/Transaction/getTransactionHistory`;

function getTransactionHistory(){
    const bearer = localStorage.getItem("bearer");
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