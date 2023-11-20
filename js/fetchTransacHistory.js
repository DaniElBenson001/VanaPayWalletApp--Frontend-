import { bearer, dashboardInfo, txnHistoryToday, txnHistoryYesterday, txnHistoryThreeDaysAgo, txnHistorySevenDaysAgo, txnHistoryOneMonthAgo, txnHistoryByDate } from "./endpoints.js";
import { logout, autoLogoutFunction } from "./main.js";

let accNumber = document.getElementById("acc-number");
let accBalance = document.getElementById("acc-balance");

// let txnHistoryByDate = document.getElementById("");

let txnHistoryForToday = document.getElementById("txn-history-today");
let txnHistoryForYesterday = document.getElementById("txn-history-yesterday");
let txnHistoryForThreeDays = document.getElementById("txn-history-threeDaysAgo");
let txnHistoryForOneWeek = document.getElementById("txn-history-oneWeekAgo");
let txnHistoryForOneMonth = document.getElementById("txn-history-oneMonthAgo");

logout(); //Go to Definition for Details
autoLogoutFunction(); //Go to Definition for Details

function getUserInfo(){
    fetch(dashboardInfo, {
    method: "GET",
    headers: {
        "content-type": "application/json",
        "Authorization": `bearer ${bearer}`
    }
    }).then((dashboardInfoData) => { return dashboardInfoData.json(); })
    .then((dashboardInfoResp) => {
        console.log(dashboardInfoResp)
        //For the Account Number
        accNumber.innerHTML = `${dashboardInfoResp.accountNumber}`;
        //For the Account Balance
        accBalance.innerHTML =  `NGN ${dashboardInfoResp.balance.toLocaleString("en-US")}`;
    })
}
getUserInfo();

function getTransactionHistory(){
    fetch(txnHistoryToday, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `bearer ${bearer}`
        }
    }).then((txnHistoryData) => { return txnHistoryData.json(); })
    .then((txnHistoryResp) => {
        // console.log(res[0].senderAcctNo);
        let transactionsData = "";
        txnHistoryResp.data.map((txnValues) => {
            transactionsData += 
            `
            <div class="txn-card">
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
        document.getElementById("txn-history-container").innerHTML = transactionsData;
    })
}
getTransactionHistory();

txnHistoryForToday.addEventListener("click", function(){
    fetch(txnHistoryToday, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `bearer ${bearer}`
        }
    }).then((txnHistoryData) => { return txnHistoryData.json(); })
    .then((txnHistoryResp) => {
        // console.log(res[0].senderAcctNo);
        let transactionsData = "";
        txnHistoryResp.data.map((txnValues) => {
            transactionsData += 
            `
            <div class="txn-card">
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
        document.getElementById("txn-history-container").innerHTML = transactionsData;
    })
    // alert("I clicked Today")
});

txnHistoryForYesterday.addEventListener("click", function(){
    fetch(txnHistoryYesterday, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `bearer ${bearer}`
        }
    }).then((txnHistoryData) => { return txnHistoryData.json(); })
    .then((txnHistoryResp) => {
        // console.log(res[0].senderAcctNo);
        let transactionsData = "";
        txnHistoryResp.data.map((txnValues) => {
            transactionsData += 
            `
            <div class="txn-card">
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
        document.getElementById("txn-history-container").innerHTML = transactionsData;
    })
    // alert("I clicked Yesterday")
});

txnHistoryForThreeDays.addEventListener("click", function(){
    fetch(txnHistoryThreeDaysAgo, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `bearer ${bearer}`
        }
    }).then((txnHistoryData) => { return txnHistoryData.json(); })
    .then((txnHistoryResp) => {
        // console.log(res[0].senderAcctNo);
        let transactionsData = "";
        txnHistoryResp.data.map((txnValues) => {
            transactionsData += 
            `
            <div class="txn-card">
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
        document.getElementById("txn-history-container").innerHTML = transactionsData;
    })
    // alert("I clicked Three Days Ago")
});

txnHistoryForOneWeek.addEventListener("click", function(){
    fetch(txnHistorySevenDaysAgo, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `bearer ${bearer}`
        }
    }).then((txnHistoryData) => { return txnHistoryData.json(); })
    .then((txnHistoryResp) => {
        // console.log(res[0].senderAcctNo);
        let transactionsData = "";
        txnHistoryResp.data.map((txnValues) => {
            transactionsData += 
            `
            <div class="txn-card">
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
        document.getElementById("txn-history-container").innerHTML = transactionsData;
    })
    // alert("I clicked One Week Ago")
});

txnHistoryForOneMonth.addEventListener("click", function(){
    fetch(txnHistoryOneMonthAgo, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `bearer ${bearer}`
        }
    }).then((txnHistoryData) => { return txnHistoryData.json(); })
    .then((txnHistoryResp) => {
        // console.log(res[0].senderAcctNo);
        let transactionsData = "";
        txnHistoryResp.data.map((txnValues) => {
            transactionsData += 
            `
            <div class="txn-card">
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
        document.getElementById("txn-history-container").innerHTML = transactionsData;
    })
    // alert("I clicked One Month Ago")
});

console.log(document.getElementById("start-date").value);