"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let CurrentUserID;
let EditMedicineID;
let CurrentUser;
let CurrentMedicineID;
var signIn = document.getElementById('signin');
var signUp = document.getElementById('signup');
var navbar = document.getElementById('nav');
let home = document.getElementById("welcome");
let balance = document.getElementById("balance1");
let medicine = document.getElementById("medicine");
let topp = document.getElementById("deposit");
let purchase = document.getElementById("purchase");
let edit = document.getElementById("edit");
let add = document.getElementById("add");
let quantitybox = document.getElementById("quantity-block");
let cancel = document.getElementById("cancel");
let orderhistory = document.getElementById("order");
function displayNone() {
    home.style.display = "none";
    balance.style.display = "none";
    medicine.style.display = "none";
    topp.style.display = "none";
    purchase.style.display = "none";
    edit.style.display = "none";
    add.style.display = "none";
    quantitybox.style.display = "none";
    cancel.style.display = "none";
    orderhistory.style.display = "none";
}
function SignIn() {
    signIn.style.display = "block";
    signUp.style.display = "none";
}
function SignUp() {
    signUp.style.display = "block";
    signIn.style.display = "none";
}
function SubSignUp() {
    return __awaiter(this, void 0, void 0, function* () {
        let flag = true;
        var name = document.getElementById("name1");
        var mail = document.getElementById("mail");
        var pass = document.getElementById("pass");
        var mobile = document.getElementById("mobile");
        let signupinput = yield fetchUserDetails();
        for (var i = 0; i < signupinput.length; i++) {
            if (signupinput[i].userMail == mail.value) {
                flag = false;
                alert("This mail already exists");
                break;
            }
        }
        if (flag) {
            var user = {
                userID: 0,
                userName: name.value,
                userMail: mail.value,
                userPassword: pass.value,
                userPhoneNumber: mobile.value,
                userBalance: 0
            };
            addUserDetails(user);
            CurrentUser = user;
            alert("SignUp Successfully Completed");
            SignIn();
        }
    });
}
function SubSignIn() {
    return __awaiter(this, void 0, void 0, function* () {
        var flag = true;
        var mail2 = document.getElementById("mail2");
        var pass2 = document.getElementById("pass2");
        var container = document.getElementById("container");
        let sigininput = yield fetchUserDetails();
        for (var i = 0; i < sigininput.length; i++) {
            if ((sigininput[i].userMail == mail2.value) && (sigininput[i].userPassword == pass2.value)) {
                flag = false;
                container.style.display = "none";
                CurrentUser = sigininput[i];
                alert("SigIn Successfully Completed");
                navbar.style.display = "block";
            }
        }
        if (flag) {
            alert("Invalid Email and Password");
        }
    });
}
function Home() {
    displayNone();
    home.style.display = "block";
    home.innerHTML = "Welcome " + CurrentUser.userName;
}
function MedicineDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        medicine.style.display = "block";
        var table = document.getElementById("table");
        table.innerHTML = "";
        var row = document.createElement("tr");
        row.innerHTML = `<th>MedicineID</th>
    <th>Medicine Name</th>
    <th>Medicine Count</th>
    <th>Medicine Price</th>
    <th>Expiry Date</th>
    <th>Modify</th>`;
        table.appendChild(row);
        let medicineinput = yield fetchMedicineDetails();
        for (var i = 0; i < medicineinput.length; i++) {
            if (medicineinput[i].medicineCount > 0) {
                var row1 = document.createElement("tr");
                row1.innerHTML = `<td>${medicineinput[i].medicineID}</td>
                <td>${medicineinput[i].medicineName}</td>
                <td>${medicineinput[i].medicineCount}</td>
                <td>${medicineinput[i].medicinePrice}</td>
                <td>${medicineinput[i].medicineDate.split("T")[0].split("-").reverse().join("/")}</td>
                <td><button onclick="EditMedicine(${medicineinput[i].medicineID})">Edit</button><button onclick="Delete(${medicineinput[i].medicineID})">Delete</button></td>`;
                table.appendChild(row1);
                //CurrentMedicine=medicineinput[i];
            }
        }
    });
}
//Edit Input Medicine Details
var mname = document.getElementById("mname");
var mquantity = document.getElementById("mquantity");
var mprice = document.getElementById("mprice");
var mexpiry = document.getElementById("mexpiry");
//Add Input Medicine Details
var mname1 = document.getElementById("mname1");
var mquantity1 = document.getElementById("mquantity1");
var mprice1 = document.getElementById("mprice1");
var mexpiry1 = document.getElementById("mexpiry1");
function AddMedicine() {
    edit.style.display = "none";
    add.style.display = "block";
}
function Add() {
    var newmed = {
        medicineID: 0,
        medicineName: mname1.value,
        medicineCount: Number(mquantity1.value),
        medicinePrice: Number(mprice1.value),
        medicineDate: mexpiry1.value
    };
    addMedicineDetails(newmed);
    alert("Medicine Added Successfully");
    MedicineDetails();
}
function EditMedicine(MedicineID) {
    return __awaiter(this, void 0, void 0, function* () {
        add.style.display = "none";
        edit.style.display = "block";
        EditMedicineID = MedicineID;
        let medicine2input = yield fetchMedicineDetails();
        for (var i = 0; i < medicine2input.length; i++) {
            if (medicine2input[i].medicineID == EditMedicineID) {
                mname.value = medicine2input[i].medicineName;
                mquantity.value = String(medicine2input[i].medicineCount);
                mprice.value = String(medicine2input[i].medicinePrice);
                mexpiry.value = medicine2input[i].medicineDate.split("T")[0].split("-").reverse().join("/");
            }
        }
    });
}
function Edit() {
    var medicine = {
        medicineID: 0,
        medicineName: mname.value,
        medicineCount: Number(mquantity.value),
        medicinePrice: Number(mprice.value),
        medicineDate: mexpiry.value
    };
    updateMedicineDetails(EditMedicineID, medicine);
    alert("Updated Successfully");
    MedicineDetails();
}
function Delete(MedicineID) {
    var ID = MedicineID;
    deleteMedicineDetails(ID);
    alert("Deleted Successfully");
    MedicineDetails();
}
function Purchase() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        purchase.style.display = "block";
        var table1 = document.getElementById("table-body");
        table1.innerHTML = "";
        var row = document.createElement("tr");
        row.innerHTML = `<th>MedicineID</th>
    <th>Medicine Name</th>
    <th>Medicine Count</th>
    <th>Medicine Price</th>
    <th>Expiry Date</th>
    <th>Modify</th>`;
        table1.appendChild(row);
        let purchaseinput = yield fetchMedicineDetails();
        for (var i = 0; i < purchaseinput.length; i++) {
            var row1 = document.createElement("tr");
            row1.innerHTML = `<td>${purchaseinput[i].medicineID}</td>
            <td>${purchaseinput[i].medicineName}</td>
            <td>${purchaseinput[i].medicineCount}</td>
            <td>${purchaseinput[i].medicinePrice}</td>
            <td>${purchaseinput[i].medicineDate.split("T")[0].split("-").reverse().join("/")}</td>
            <td><button onclick="buy('${purchaseinput[i].medicineID}')">buy</button></td>`;
            table1.appendChild(row1);
        }
    });
}
function buy(MedicineID) {
    CurrentMedicineID = MedicineID;
    let quantiyBlock = document.getElementById("quantity-block");
    quantiyBlock.style.display = "block";
}
function buyMedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        var flag = true;
        let quantity = parseInt(document.getElementById("quantity").value);
        let medicineinput = yield fetchMedicineDetails();
        for (var i = 0; i < medicineinput.length; i++) {
            if (medicineinput[i].medicineID == CurrentMedicineID) {
                flag = false;
                if (medicineinput[i].medicineCount >= quantity) {
                    if (new Date(medicineinput[i].medicineDate) >= new Date()) {
                        if (medicineinput[i].medicinePrice <= CurrentUser.userBalance) {
                            medicineinput[i].medicineCount -= quantity;
                            updateMedicineDetails(medicineinput[i].medicineID, medicineinput[i]);
                            var totalPrice = quantity * medicineinput[i].medicinePrice;
                            var newOrder = {
                                orderID: 0,
                                medicineID: medicineinput[i].medicineID,
                                userID: CurrentUser.userID,
                                medicineName: medicineinput[i].medicineName,
                                medicineCount: quantity,
                                totalPrice: totalPrice,
                                orderStatus: "Ordered"
                            };
                            addOrderDetails(newOrder);
                            alert("Purchased Successfully");
                            break;
                        }
                        else {
                            alert("Balance Insufficient");
                            break;
                        }
                    }
                    else {
                        alert("Medicine Date Expired");
                        break;
                    }
                }
                else {
                    alert("Medicine quantity is not available");
                    break;
                }
            }
        }
        if (flag) {
            alert("MedicineID is Invalid");
        }
    });
}
function Cancel() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        cancel.style.display = "block";
        var table2 = document.getElementById("table2");
        table2.innerHTML = "";
        var row = document.createElement("tr");
        row.innerHTML = `<th>OrderID</th>
    <th>MedicineID</th>
    <th>UserID</th>
    <th>Medicine Name</th>
    <th>Medicine Count</th>
    <th>Total Price</th>
    <th>Order Status</th>
    <th>Cancel</th>`;
        table2.appendChild(row);
        let cancelorderinput = yield fetchOrderDetails();
        for (var i = 0; i < cancelorderinput.length; i++) {
            if (cancelorderinput[i].orderStatus == "Ordered") {
                var row1 = document.createElement("tr");
                row1.innerHTML = `<td>${cancelorderinput[i].orderID}</td>
                    <td>${cancelorderinput[i].medicineID}</td>
                    <td>${cancelorderinput[i].userID}</td>
                    <td>${cancelorderinput[i].medicineName}</td>
                    <td>${cancelorderinput[i].medicineCount}</td>
                    <td>${cancelorderinput[i].totalPrice}</td>
                    <td>${cancelorderinput[i].orderStatus}</td>
                    <td><button onclick="CancelFun('${cancelorderinput[i].orderID}')">Cancel</button></td>`;
                table2.appendChild(row1);
            }
        }
    });
}
function CancelFun(OrderID) {
    return __awaiter(this, void 0, void 0, function* () {
        var flag = true;
        let orderinput = yield fetchOrderDetails();
        let medicineinput = yield fetchMedicineDetails();
        for (var i = 0; i < orderinput.length; i++) {
            if (orderinput[i].orderID == OrderID) {
                flag = false;
                if (orderinput[i].orderStatus == "Ordered") {
                    orderinput[i].orderStatus = "Cancelled";
                    CurrentUser.userBalance += orderinput[i].totalPrice;
                    updateOrderDetails(OrderID, orderinput[i]);
                    updateUserDetails(CurrentUser.userID, CurrentUser);
                    for (var j = 0; j < medicineinput.length; j++) {
                        if (orderinput[i].medicineID == medicineinput[j].medicineID) {
                            medicineinput[j].medicineCount += orderinput[i].medicineCount;
                            updateMedicineDetails(medicineinput[j].medicineID, medicineinput[j]);
                            alert("Order Cancelled");
                            Cancel();
                            break;
                        }
                    }
                }
            }
        }
    });
}
function OrderHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        orderhistory.style.display = "block";
        var table3 = document.getElementById("table3");
        table3.innerHTML = "";
        var row = document.createElement("tr");
        row.innerHTML = `<th>OrderID</th>
    <th>MedicineID</th>
    <th>UserID</th>
    <th>Medicine Name</th>
    <th>Medicine Count</th>
    <th>Total Price</th>
    <th>Order Status</th>`;
        table3.appendChild(row);
        var orderlist = yield fetchOrderDetails();
        for (var i = 0; i < orderlist.length; i++) {
            var row1 = document.createElement("tr");
            row1.innerHTML = `<td>${orderlist[i].orderID}</td>
                    <td>${orderlist[i].medicineID}</td>
                    <td>${orderlist[i].userID}</td>
                    <td>${orderlist[i].medicineName}</td>
                    <td>${orderlist[i].medicineCount}</td>
                    <td>${orderlist[i].totalPrice}</td>
                    <td>${orderlist[i].orderStatus}</td>`;
            table3.appendChild(row1);
        }
    });
}
function ShowBalance() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        balance.style.display = "block";
        let userinput = yield fetchUserDetails();
        for (var i = 0; i < userinput.length; i++) {
            if (userinput[i].userMail == CurrentUser.userMail) {
                balance.innerHTML = "Balance: " + CurrentUser.userBalance + "";
            }
        }
    });
}
function TopUp() {
    displayNone();
    topp.style.display = "block";
}
function Deposit() {
    return __awaiter(this, void 0, void 0, function* () {
        var amount1 = document.getElementById("recharge");
        let userinput = yield fetchUserDetails();
        for (let i = 0; i < userinput.length; i++) {
            if (userinput[i].userMail == CurrentUser.userMail) {
                CurrentUser.userBalance += Number(amount1.value);
                updateUserDetails(userinput[i].userID, userinput[i]);
            }
        }
    });
}
function fetchUserDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5054/api/User';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        return yield response.json();
    });
}
function fetchMedicineDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5054/api/Medicine';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch medicine');
        }
        return yield response.json();
    });
}
function fetchOrderDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5054/api/Order';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch order');
        }
        return yield response.json();
    });
}
function addUserDetails(User) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5054/api/User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(User)
        });
        if (!response.ok) {
            throw new Error('Failed to add User');
        }
    });
}
function addMedicineDetails(Medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5054/api/Medicine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to add Medicine');
        }
    });
}
function addOrderDetails(Order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5054/api/Order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Order)
        });
        if (!response.ok) {
            throw new Error('Failed to add Order');
        }
    });
}
function updateUserDetails(id, User) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5054/api/User/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(User)
        });
        if (!response.ok) {
            throw new Error('Failed to update User');
        }
    });
}
function updateMedicineDetails(id, Medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5054/api/Medicine/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to update Medicine');
        }
    });
}
function updateOrderDetails(id, Order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5054/api/Order/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Order)
        });
        if (!response.ok) {
            throw new Error('Failed to update Order');
        }
    });
}
function deleteMedicineDetails(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5054/api/Medicine/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
    });
}
