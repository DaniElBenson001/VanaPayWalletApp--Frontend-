//NECESSARY LINKS FOR MULTIPLE API ENDPOINTS
//Base Uniform Resource Locator
export const baseURL = "https://localhost:7007";

//Bearer Tag
export const bearer = localStorage.getItem("bearer");

//API Endpoints(s) for Transaction
export const txnHistoryurl = `${baseURL}/api/Transaction/getTransactionHistory`;

//API Endpoints(s) for the Dashboard
export const dashboardInfo = `${baseURL}/api/Dashboard/getDashboardInfo`;

//API Endpoints(s) for the Transfer
export const transfer = `${baseURL}/api/Transaction/transfer`;
export const searchByAccNo = `${baseURL}/api/Search/SearchUserviaAcc`;

//API Endpoints(s) for the PIN
export const pinAvailable = `${baseURL}/api/Authentication/pinAvailable`;
export const verifyPin = `${baseURL}/api/Authentication/verifyPin`;
export const createPin = `${baseURL}/api/Authentication/createPin`;

//API Endpoints(s) for Security Question
export const securityQuestion = `${baseURL}/api/Authentication/addSecurityQuestion`;