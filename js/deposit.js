var makeDepositUrl = "http://localhost:7007/api/Payment/initializePayment";
const bearer = localStorage.getItem("bearer");


function getDepositAmt(){
    return{
        amount: document.getElementById("amount").value
    }
}

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