//NECESSARY LINKS FOR MULTIPLE API ENDPOINTS
//Base Uniform Resource Locator
export const baseURL = "https://localhost:7007";

//Bearer Tag
export const bearer = localStorage.getItem("bearer");

//API Endpoints for User
export const register = `${baseURL}/api/User/register`;
export const createPin = `${baseURL}/api/User/createPin`;
export const updatePin = `${baseURL}/api/Authentication/changePin`;
export const updatePassword = `${baseURL}/api/User/changePassword`;
export const updateUserDetails = `${baseURL}/api/User/updateUserDetails`;
export const securityQuestion = `${baseURL}/api/Authentication/addSecurityQuestion`;

//API Endpoints(s) for Transaction
export const txnHistoryurl = `${baseURL}/api/Transaction/getTransactionHistory`;
export const txnHistoryAsUserurl = `${baseURL}/api/Transaction/getTransactionHistoryAsUser`;
export const recentTxnHistory = `${baseURL}/api/Transaction/getRecentTransactions`;
export const txnHistoryByDate = `${baseURL}/api/Transaction/getTransacHistoryByDate`;
export const txnHistoryToday = `${baseURL}/api/Transaction/getTransacHistoryToday`;
export const txnHistoryYesterday = `${baseURL}/api/Transaction/getTransacHistoryYesterday`;
export const txnHistoryThreeDaysAgo = `${baseURL}/api/Transaction/getTransacHistoryThreeDaysAgo`;
export const txnHistorySevenDaysAgo = `${baseURL}/api/Transaction/getTransacHistorySevenDaysAgo`;
export const txnHistoryOneMonthAgo = `${baseURL}/api/Transaction/getTransacHistoryOneMonthAgo`;

//API Endpoints(s) for the Dashboard
export const dashboardInfo = `${baseURL}/api/Dashboard/getDashboardInfo`;

//API Endpoints(s) for the Transfer
export const transfer = `${baseURL}/api/Transaction/transfer`;

//API Endpoints(s) for the Search
export const searchByAccNo = `${baseURL}/api/Search/SearchUserviaAcc`;


//API Endpoints for Authentication
export const login = `${baseURL}/api/Authentication/login`;
export const verifyPin = `${baseURL}/api/Authentication/verifyPin`;
export const pinAvailable = `${baseURL}/api/Authentication/pinAvailable`;

//API Endpoints(s) for Security Questions & Answers
export const getSecurityqa = `${baseURL}/api/User/getsecurityqa`;
export const securityqaAvailable = `${baseURL}/api/User/securityqaAvailability`;
export const addSecurityqa = `${baseURL}/api/User/addSecurityqa`;