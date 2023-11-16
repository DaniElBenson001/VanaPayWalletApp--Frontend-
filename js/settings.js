

let logout = document.getElementById("logout");

logout.addEventListener('click', function(){
    Swal.fire({
        icon: 'warning',
        title: 'Are you Sure?',
        showCancelButton: true,
        confirmButtonColor: '#055496',

    }).then((logoutAlertResp) => {
        if(logoutAlertResp.isConfirmed){
            localStorage.clear();
            location.replace('http://127.0.0.1:5500/login.html');
        }
    })
})