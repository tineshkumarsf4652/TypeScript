var signIn = document.getElementById('signin');
var signUp = document.getElementById('signup');
var navbar = document.getElementById('nav');
var home = document.getElementById("welcome");
var balance = document.getElementById("balance1");
var medicine = document.getElementById("medicine");
var topp = document.getElementById("deposit");
var purchase = document.getElementById("purchase");
var quantitybox = document.getElementById("quantity-block");
var cancel = document.getElementById("cancel");
var orderhistory = document.getElementById("order");
var UserIdAutoIncrement = 1000;
var MedicineIdAutoIncrement = 10;
var OrderIdAutoIncrement = 100;
var CurrentUserId;
var CurrentUser;
var CurrentMedicineID;
var User = /** @class */ (function () {
    function User(paramUserName, paramUserMail, paramUserPassword, paramUserPhoneNumber, paramUserBalance) {
        UserIdAutoIncrement++;
        this.UserId = "UI" + UserIdAutoIncrement.toString();
        this.UserName = paramUserName;
        this.UserMail = paramUserMail;
        this.UserPassword = paramUserPassword;
        this.UserPhoneNumber = paramUserPhoneNumber;
        this.UserBalance = paramUserBalance;
    }
    return User;
}());
var MedicineInfo = /** @class */ (function () {
    function MedicineInfo(paramMedicineName, paramMedicineCount, paramMedicinePrice, paramMedicineDate) {
        MedicineIdAutoIncrement++;
        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.MedicineDate = paramMedicineDate;
    }
    return MedicineInfo;
}());
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Ordered"] = "Ordered";
    OrderStatus["Cancelled"] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
var Order = /** @class */ (function () {
    function Order(paramMedicineId, paramUserId, paramMedicineName, paramMedicineCount, paramTotalPrice, paramOrderStatus) {
        OrderIdAutoIncrement++;
        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.UserId = paramUserId;
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.TotalPrice = paramTotalPrice;
        this.OrderStatus = paramOrderStatus;
    }
    return Order;
}());
var UserArrayList = new Array();
UserArrayList.push(new User("Hemanth", "hemanth@gmail.com", "hemanth123", "9876543210", 0));
UserArrayList.push(new User("Harish", "harish@gmail.com", "harish123", "9873459874", 0));
var MedicineList = new Array();
MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date("2024,07,01")));
MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date("2024,08,07")));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date("2024,09,10")));
MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date("2024,11,12")));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date("2024,06,11")));
var OrderList = new Array();
function displayNone() {
    home.style.display = "none";
    balance.style.display = "none";
    medicine.style.display = "none";
    topp.style.display = "none";
    purchase.style.display = "none";
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
    var flag = true;
    var username = document.getElementById("name1");
    var mail = document.getElementById("mail");
    var pass = document.getElementById("pass");
    var mobile = document.getElementById("mobile");
    for (var i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].UserMail == mail.value) {
            flag = false;
            break;
        }
    }
    if (flag) {
        var user = new User(username.value, mail.value, pass.value, mobile.value, 0);
        CurrentUser = user;
        UserArrayList.push(user);
        SignIn();
    }
}
function SubSignIn() {
    var mail2 = document.getElementById("mail2");
    var pass2 = document.getElementById("pass2");
    var container = document.getElementById("container");
    for (var i = 0; i < UserArrayList.length; i++) {
        if ((UserArrayList[i].UserMail == mail2.value) && (UserArrayList[i].UserPassword == pass2.value)) {
            container.style.display = "none";
            var navbar = document.getElementById('nav');
            CurrentUser = UserArrayList[i];
            navbar.style.display = "block";
        }
    }
}
function Home() {
    displayNone();
    home.style.display = "block";
    home.innerHTML = "Welcome" + CurrentUser.UserName;
}
function MedicineDetails() {
    displayNone();
    medicine.style.display = "block";
    var table = document.getElementById("table");
    table.innerHTML = "";
    var row = document.createElement("tr");
    row.innerHTML = "<th>Sl.NO</th>\n    <th>Medicine Name</th>\n    <th>Medicine Price</th>\n    <th>Quantity</th>\n    <th>Expiry Date</th>\n    <th>Modify</th>";
    var count = 1;
    table.appendChild(row);
    for (var i = 0; i < MedicineList.length; i++) {
        var row1 = document.createElement("tr");
        row1.innerHTML = "<td>".concat(count, "</td>\n            <td>").concat(MedicineList[i].MedicineName, "</td>\n            <td>").concat(MedicineList[i].MedicinePrice, "</td>\n            <td>").concat(MedicineList[i].MedicineCount, "</td>\n            <td>").concat(MedicineList[i].MedicineDate, "</td>\n            <td><button onclick=\"Edit()\">Edit</button><button onclick=\"Delete()\">Delete</button></td>");
        table.appendChild(row1);
        count++;
    }
}
function Edit() {
}
function Delete() {
}
function Purchase() {
    displayNone();
    purchase.style.display = "block";
    var table1 = document.getElementById("table-body");
    table1.innerHTML = "";
    var row = document.createElement("tr");
    row.innerHTML = "<th>Sl.NO</th>\n    <th>Medicine Name</th>\n    <th>Medicine Price</th>\n    <th>Quantity</th>\n    <th>Expiry Date</th>\n    <th>Modify</th>";
    var count = 1;
    table1.appendChild(row);
    for (var i = 0; i < MedicineList.length; i++) {
        var row1 = document.createElement("tr");
        row1.innerHTML = "<td>".concat(count, "</td>\n            <td>").concat(MedicineList[i].MedicineName, "</td>\n            <td>").concat(MedicineList[i].MedicinePrice, "</td>\n            <td>").concat(MedicineList[i].MedicineCount, "</td>\n            <td>").concat(MedicineList[i].MedicineDate, "</td>\n            <td><button onclick=\"buy('").concat(MedicineList[i].MedicineId, "')\">buy</button></td>");
        table1.appendChild(row1);
        count++;
    }
}
function buy(MedicineId) {
    CurrentMedicineID = MedicineId;
    var quantiyBlock = document.getElementById("quantity-block");
    quantiyBlock.style.display = "block";
}
function buyMedicine() {
    var flag = true;
    var quantity = parseInt(document.getElementById("quantity").value);
    for (var i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].MedicineId == CurrentMedicineID) {
            flag = false;
            if (MedicineList[i].MedicineCount >= quantity) {
                if (MedicineList[i].MedicineDate > new Date()) {
                    if (MedicineList[i].MedicinePrice <= CurrentUser.UserBalance) {
                        MedicineList[i].MedicineCount -= quantity;
                        var totalPrice = quantity * MedicineList[i].MedicinePrice;
                        var newOrder = new Order(MedicineList[i].MedicineId, CurrentUserId, MedicineList[i].MedicineName, quantity, totalPrice, OrderStatus.Ordered);
                        OrderList.push(newOrder);
                        alert("Purchase Successful");
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
}
function Cancel() {
    displayNone();
    cancel.style.display = "block";
    var table2 = document.getElementById("table2");
    table2.innerHTML = "";
    var row = document.createElement("tr");
    row.innerHTML = "<th>Sl.NO</th>\n    <th>Medicine Name</th>\n    <th>Medicine Count</th>\n    <th>Total Price</th>\n    <th>Order Status</th>\n    <th>Cancel</th>";
    var count = 1;
    table2.appendChild(row);
    for (var i = 0; i < OrderList.length; i++) {
        if (OrderList[i].OrderStatus == OrderStatus.Ordered) {
            var row1 = document.createElement("tr");
            row1.innerHTML = "<td>".concat(count, "</td>\n                    <td>").concat(OrderList[i].MedicineName, "</td>\n                    <td>").concat(OrderList[i].MedicineCount, "</td>\n                    <td>").concat(OrderList[i].TotalPrice, "</td>\n                    <td>").concat(OrderList[i].OrderStatus, "</td>\n                    <td><button onclick=\"CancelFun('").concat(OrderList[i].OrderId, "')\">Cancel</button></td>");
            table2.appendChild(row1);
            count++;
        }
    }
}
function CancelFun(OrderId) {
    for (var i = 0; i < OrderList.length; i++) {
        if (OrderList[i].OrderId == OrderId) {
            OrderList[i].OrderStatus = OrderStatus.Cancelled;
            for (var j = 0; j < MedicineList.length; j++) {
                if (OrderList[i].MedicineId === MedicineList[j].MedicineId) {
                    MedicineList[j].MedicineCount += OrderList[i].MedicineCount;
                    CurrentUser.UserBalance += OrderList[i].TotalPrice;
                }
            }
        }
        else {
            alert("OrderID is Invalid");
        }
    }
}
function OrderHistory() {
    displayNone();
    orderhistory.style.display = "block";
    var table3 = document.getElementById("table3");
    table3.innerHTML = "";
    var row = document.createElement("tr");
    row.innerHTML = "<th>Sl.NO</th>\n    <th>Medicine Name</th>\n    <th>Medicine Count</th>\n    <th>Total Price</th>\n    <th>Order Status</th>\n    <th>Cancel</th>";
    var count = 1;
    table3.appendChild(row);
    for (var i = 0; i < OrderList.length; i++) {
        if (OrderList[i].OrderStatus == OrderStatus.Ordered) {
            var row1 = document.createElement("tr");
            row1.innerHTML = "<td>".concat(count, "</td>\n                    <td>").concat(OrderList[i].MedicineName, "</td>\n                    <td>").concat(OrderList[i].MedicineCount, "</td>\n                    <td>").concat(OrderList[i].TotalPrice, "</td>\n                    <td>").concat(OrderList[i].OrderStatus, "</td>");
            table3.appendChild(row1);
            count++;
        }
    }
}
function ShowBalance() {
    displayNone();
    balance.style.display = "block";
    for (var i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].UserMail == CurrentUser.UserMail) {
            balance.innerHTML = "Balance: " + UserArrayList[i].UserBalance + "";
        }
    }
}
function TopUp() {
    displayNone();
    topp.style.display = "block";
}
function Deposit() {
    var amount1 = document.getElementById("recharge");
    for (var i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].UserMail == CurrentUser.UserMail) {
            CurrentUser.UserBalance += Number(amount1.value);
        }
    }
}
