import { dashboardInfo, bearer } from "./endpoints.js";
import { logout, autoLogoutFunction } from "./main.js";

var makeDepositUrl = "http://localhost:7007/api/Payment/initializePayment";
// const bearer = localStorage.getItem("bearer");

const accNum = document.getElementById("acc-number");
const accBalance = document.getElementById("acc-balance");

logout(); //Go to Definition for Details
autoLogoutFunction(); //Go to Definition for Details

function getDepositAmt(){
    return{
        amount: document.getElementById("amount").value
    }
}

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

document.getElementById("initialize-deposit").addEventListener("click", function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#003f88',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Make Deposit!'
      }).then((result) => {
        if (result.isConfirmed) {
            let data = getDepositAmt();
            fetch(makeDepositUrl,{
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "content-type": "application/json",
                    "Authorization": `bearer ${bearer}`
                }
            }).then((res) => res.json())
                .then((response) => {
                    console.log(response);
                    console.log(response.data.data.authorization_url);
                    
                })
            }
        })
});