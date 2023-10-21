//Array of Questions for Security Questions
let SecurityQuestions = [
    "What is your Mother's Maiden Name",
    "What was the Name of your First Pet?",
    "In which City were you Born?",
    "What is your Favorite Book?",
    "What is your Favorite Movie?",
    "Who was your Childhood Best Friend?",
    "What is the Name of your Favorite Teacher?",
    "What is the Model of your First Car?",
    "What is your Favorite Sports team?",
    "What is your Favorite Color?",
    "What is the Name of the Street you grew up on?",
    "What is your Favorite Food?",
    "What is the Name of your First School?",
    "Who is your Favorite Historical Figure?",
    "What is your Favorite Vacation Spot?",
    "What is the Make of your First Computer?",
    "What is your Favorite Music Band or Artist?",
    "What is your Father's Middle Name?",
    "What is your Favorite Childhood Game?",
    "What is the Name of your Significant Other?"
]

export function randomSecurityQuestion(){
    var min = 0;
    var max = 19;
    
    var randomString = "";
    var randomNumber = Math.floor(Math.random() * (max + min));
    randomString += randomNumber;
    return randomString;
}

console.log(randomSecurityQuestion());