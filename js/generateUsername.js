export {suggestedUsername1, suggestedUsername2, suggestedUsername3}
export {generatedUsername1, generatedUsername2, generatedUsername3}

//To Store Id tags in requisite variables
let suggestedUsername1 = document.getElementById('suggestedUsername1');
let suggestedUsername2 = document.getElementById('suggestedUsername2');
let suggestedUsername3 = document.getElementById('suggestedUsername3');

//Whence the Generated Username is Stored
var generatedUsername1;
var generatedUsername2;
var generatedUsername3;


export function randomNumber(){
    var min = 1;
    var max = 9;
    
    var randomString = "";
    for(var i=0; i < 3; i++){
        var randomNumber = Math.floor(Math.random() * (max + min));
        randomString += randomNumber;
    }
    return randomString;
}

//Function to generate First Username Suggestion
export function generateUsername1(){
    const inputValue = firstname.value;
    generatedUsername1 = (inputValue + randomNumber()).toLowerCase().replace(/\s/g,"");
    if (inputValue == ""){
        suggestedUsername1.style.display = "none";
    }else{
        suggestedUsername1.style.display = "inline";
    }
    suggestedUsername1.innerHTML = generatedUsername1;
}

//Function to generate Second Username Suggestion
// export function generateUsername2(){
//     const inputFirstName = firstname.value;
//     const inputLastName = lastname.value;
//     const inputValue = `${inputFirstName} ${inputLastName}`;
//     let firstLetter = inputFirstName[0];
//     let lastName = inputValue.split(' ')[1];
//     generatedUsername2 = (firstLetter + lastName + randomNumber()).toLowerCase();
//     if (inputValue == ""){
//         suggestedUsername2.style.display = "none";
//     }else{
//         suggestedUsername2.style.display = "inline";
//     }
//     suggestedUsername2.innerHTML = generatedUsername2;
//     console.log(inputValue);

// }

//Function to generate Third Username Suggestion
export function generateUsername3(){
    const inputValue = firstname.value;
    const inputlastName = lastname.value;
    let lastLetter = inputValue[0];
    let firstName = inputlastName;
    generatedUsername3 = (lastLetter + firstName + randomNumber()).toLowerCase();
    if (inputValue == ""){
        suggestedUsername3.style.display = "none";
    }else{
        suggestedUsername3.style.display = "inline";
    }
    suggestedUsername3.innerHTML = generatedUsername3;
}