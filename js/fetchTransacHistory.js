import { bearer, dashboardInfo, txnHistoryAsUserurl } from "./endpoints.js";

let accNumber = document.getElementById("acc-number");
let accBalance = document.getElementById("acc-balance");

// let recTransacOneDay = document.getElementById("recent-transac-oneday");
let txnHistOptions = document.getElementById("txn-history-options");
let selectedOption = $(this).children("option-selected").val();

function getUserInfo(){
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
        //For the Account Number
        accNumber.innerHTML = `${dashboardInfoResp.accountNumber}`;
        //For the Account Balance
        accBalance.innerHTML =  `NGN ${dashboardInfoResp.balance.toLocaleString("en-US")}`;
    })
}
getUserInfo();

function getTransactionHistory(){
    fetch(txnHistoryAsUserurl, {
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
            transactionsData += 
            `
            <div class="txn-card">
                <div class="txn-card-left">
                    <div id="date-of-txn">
                        ${new Date(values.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit"
                        })} -
                        ${new Date(values.date).toLocaleTimeString(undefined, {
                            hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                        })}
                    </div>
                    <div id="txn-account-name">${values.fullname}</div>
                    <div class="horizontal">
                        <div id="txn-username">@${values.username} -</div>
                        <div id="txn-account-number">${values.accNo}</div>
                    </div>
                </div>
                <div class="txn-card-right">
                    <div id="txn-amount">NGN ${values.amount.toLocaleString("en-US")}</div>
                    <div>${values.transacType}</div>
                </div>
            </div>
            `
        });
        document.getElementById("txn-history-container").innerHTML = transactionsData;
    })
}

getTransactionHistory();