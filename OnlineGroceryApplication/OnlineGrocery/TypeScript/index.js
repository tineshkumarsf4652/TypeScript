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
let CurrentUser;
let CurrentUserId;
let EditGroceryID;
let CurrentGroceryID;
let cartlist = [];
var signup = document.getElementById("signup");
var signin = document.getElementById("signin");
var navbar = document.getElementById("navbar");
var home = document.getElementById("home");
var grocery = document.getElementById("grocery");
var edit = document.getElementById("edit");
var add = document.getElementById("add");
var purchase = document.getElementById("purchase");
let cart = document.getElementById("cart");
var quantitybox = document.getElementById("quantity-block");
var orderhistory = document.getElementById("history");
var recharge = document.getElementById("deposit");
var balance1 = document.getElementById("balance");
function ClickSignUp() {
    signup.style.display = "block";
    signin.style.display = "none";
}
function ClickSignIn() {
    signin.style.display = "block";
    signup.style.display = "none";
}
function DisplayNone() {
    home.style.display = "none";
    grocery.style.display = "none";
    cart.style.display = "none";
    quantitybox.style.display = "none";
    edit.style.display = "none";
    add.style.display = "none";
    purchase.style.display = "none";
    recharge.style.display = "none";
    balance1.style.display = "none";
    orderhistory.style.display = "none";
}
function SignUp() {
    return __awaiter(this, void 0, void 0, function* () {
        var flag = true;
        var name = document.getElementById("name");
        var mail = document.getElementById("mail");
        var pass = document.getElementById("pass");
        var address = document.getElementById("address");
        var phone = document.getElementById("phone");
        let userupinput = yield fetchUserDetails();
        for (var i = 0; i < userupinput.length; i++) {
            if (userupinput[i].email == mail.value) {
                flag = false;
                alert("This mail already exists");
                break;
            }
        }
        if (flag) {
            var user = {
                userID: 0,
                userName: name.value,
                email: mail.value,
                password: pass.value,
                address: address.value,
                phoneNumber: phone.value,
                balance: 0
            };
            addUserDetails(user);
            CurrentUser = user;
            alert("SignUp Completed");
            ClickSignIn();
        }
    });
}
function SignIn() {
    return __awaiter(this, void 0, void 0, function* () {
        var flag = true;
        var mail2 = document.getElementById("mail2");
        var pass2 = document.getElementById("pass2");
        var container = document.getElementById("container");
        let userininput = yield fetchUserDetails();
        for (var i = 0; i < userininput.length; i++) {
            if ((userininput[i].email == mail2.value) && (userininput[i].password == pass2.value)) {
                flag = false;
                container.style.display = "none";
                CurrentUser = userininput[i];
                alert("SigIn Completed");
                navbar.style.display = "block";
            }
        }
        if (flag) {
            alert("Invalid Email and Password");
        }
    });
}
function Home() {
    DisplayNone();
    home.style.display = "block";
    home.innerHTML = "Welcome " + CurrentUser.userName;
}
function GroceryDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        DisplayNone();
        grocery.style.display = "block";
        var table = document.getElementById("tablebody");
        table.innerHTML = "";
        var row = document.createElement("tr");
        row.innerHTML = `<th>MaterialID</th>
    <th>Material Name</th>
    <th>Material Count</th>
    <th>Material Price</th>
    <th>Manufacture Date</th>
    <th>Expiry Date</th>
    <th>Description</th>
    <th>Material Image</th>
    <th>Modify</th>`;
        table.appendChild(row);
        let groceryinput = yield fetchGroceryDetails();
        for (var i = 0; i < groceryinput.length; i++) {
            if (groceryinput[i].quantity > 0) {
                var row1 = document.createElement("tr");
                row1.innerHTML = `<td>${groceryinput[i].materialID}</td>
                <td>${groceryinput[i].materialName}</td>
                <td>${groceryinput[i].quantity}</td>
                <td>${groceryinput[i].materialPrice}</td>
                <td>${groceryinput[i].manufactureDate.split("T")[0].split("-").reverse().join("/")}</td>
                <td>${groceryinput[i].expiryDate.split("T")[0].split("-").reverse().join("/")}</td>
                <td>${groceryinput[i].description}</td>
                <td><img class="img" src="${groceryinput[i].materialImage}"></td>
                <td><button onclick="EditGrocery(${groceryinput[i].materialID})">Edit</button><button onclick="Delete(${groceryinput[i].materialID})">Delete</button></td>`;
                table.appendChild(row1);
            }
        }
    });
}
var mname = document.getElementById("mname");
var mquan = document.getElementById("mquan");
var mprice = document.getElementById("mprice");
var mdate = document.getElementById("mdate");
var exdate = document.getElementById("exdate");
var desc = document.getElementById("desc");
function AddGrocery() {
    DisplayNone();
    add.style.display = "block";
}
function Add() {
    var _a;
    var mname1 = document.getElementById("mname1");
    var mquan1 = document.getElementById("mquan1");
    var mprice1 = document.getElementById("mprice1");
    var mdate1 = document.getElementById("mdate1");
    var exdate1 = document.getElementById("exdate1");
    var desc1 = document.getElementById("desc1");
    var materialphoto = document.getElementById("groceryphoto");
    const mname3 = mname1.value.trim();
    const mquan3 = mquan1.value.trim();
    const mprice3 = mprice1.value.trim();
    const mdate3 = mdate1.value.trim();
    const exdate3 = exdate1.value.trim();
    const desc3 = desc1.value.trim();
    const photo = (_a = materialphoto.files) === null || _a === void 0 ? void 0 : _a[0];
    if (photo) {
        const reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            const base64String = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            var newgro = {
                materialID: 0,
                materialName: mname3,
                quantity: Number(mquan3),
                materialPrice: Number(mprice3),
                manufactureDate: mdate3,
                expiryDate: exdate3,
                description: desc3,
                materialImage: [base64String]
            };
            addGroceryDetails(newgro);
            alert("Grocery Added Successfully");
            GroceryDetails();
        };
        reader.readAsDataURL(photo);
    }
}
function EditGrocery(MaterialID) {
    return __awaiter(this, void 0, void 0, function* () {
        add.style.display = "none";
        edit.style.display = "block";
        EditGroceryID = MaterialID;
        let grocery2input = yield fetchGroceryDetails();
        for (var i = 0; i < grocery2input.length; i++) {
            if (grocery2input[i].materialID == EditGroceryID) {
                mname.value = grocery2input[i].materialName;
                mquan.value = String(grocery2input[i].quantity);
                mprice.value = String(grocery2input[i].materialPrice);
                mdate.value = grocery2input[i].manufactureDate.split("T")[0].split("-").reverse().join("/");
                exdate.value = grocery2input[i].expiryDate.split("T")[0].split("-").reverse().join("/");
                desc.value = grocery2input[i].description;
            }
        }
    });
}
function Edit() {
    var grocery = {
        materialID: 0,
        materialName: mname.value,
        quantity: Number(mquan.value),
        materialPrice: Number(mprice.value),
        manufactureDate: mdate.value,
        expiryDate: exdate.value,
        description: desc.value,
        materialImage: []
    };
    updateGroceryDetails(EditGroceryID, grocery);
    alert("Updated Successfully");
    GroceryDetails();
}
function Delete(MaterialID) {
    DisplayNone();
    grocery.style.display = "block";
    var ID = MaterialID;
    deleteGroceryDetails(ID);
    alert("Deleted Successfully");
    GroceryDetails();
}
function Purchase() {
    return __awaiter(this, void 0, void 0, function* () {
        DisplayNone();
        purchase.style.display = "block";
        var table = document.getElementById("table");
        table.innerHTML = "";
        var row = document.createElement("tr");
        row.innerHTML = `<th>MaterialID</th>
    <th>Material Name</th>
    <th>Material Count</th>
    <th>Material Price</th>
    <th>Manufacture Date</th>
    <th>Expiry Date</th>
    <th>Description</th>
    <th>Material Image</th>
    <th>Purchase</th>`;
        table.appendChild(row);
        let purchaseinput = yield fetchGroceryDetails();
        for (var i = 0; i < purchaseinput.length; i++) {
            var row1 = document.createElement("tr");
            row1.innerHTML = `<td>${purchaseinput[i].materialID}</td>
          <td>${purchaseinput[i].materialName}</td>
          <td>${purchaseinput[i].quantity}</td>
          <td>${purchaseinput[i].materialPrice}</td>
          <td>${purchaseinput[i].manufactureDate.split("T")[0].split("-").reverse().join("/")}</td>
          <td>${purchaseinput[i].expiryDate.split("T")[0].split("-").reverse().join("/")}</td>
          <td>${purchaseinput[i].description}</td>
          <td><img class="img" src="${purchaseinput[i].materialImage[0]}"></td>
          <td><button onclick="DisplayQuantity(${purchaseinput[i].materialID})">AddtoCart</button></td>`;
            table.appendChild(row1);
        }
    });
}
function DisplayQuantity(MaterialID) {
    CurrentGroceryID = MaterialID;
    quantitybox.style.display = "block";
}
function AddCart() {
    return __awaiter(this, void 0, void 0, function* () {
        let quantity1 = parseInt(document.getElementById("cartquantity").value);
        let cartinput = yield fetchGroceryDetails();
        for (var i = 0; i < cartinput.length; i++) {
            if (CurrentGroceryID == cartinput[i].materialID) {
                var cartitem = {
                    materialName: cartinput[i].materialName,
                    expiryDate: cartinput[i].expiryDate,
                    quantity: quantity1,
                    materialPrice: cartinput[i].materialPrice,
                    materialImage: cartinput[i].materialImage,
                };
                cartlist.push(cartitem);
            }
        }
        alert("Product Added to Cart");
    });
}
function MyCart() {
    DisplayNone();
    cart.style.display = "block";
    var tablecart = document.getElementById("cart1");
    tablecart.innerHTML = "";
    var row = document.createElement("tr");
    row.innerHTML = `<th>List No</th>
    <th>MaterialName</th>
    <th>Expiry Date</th>
    <th>Quantity</th>
    <th>Material Price</th>
    <th>Material Image</th>`;
    tablecart.appendChild(row);
    var count = 1;
    for (var i = 0; i < cartlist.length; i++) {
        var row1 = document.createElement("tr");
        row1.innerHTML = `<td>${count}</td>
          <td>${cartlist[i].materialName}</td>
          <td>${cartlist[i].expiryDate.split("T")[0].split("-").reverse().join("/")}</td>
          <td>${cartlist[i].quantity}</td>
          <td>${cartlist[i].materialPrice}</td>
          <td><img class="img" src="${cartlist[i].materialImage}"></td>`;
        tablecart.appendChild(row1);
        count++;
    }
}
function BuyProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        // let productlist=await fetchGroceryDetails();
        // for(var i=0; i<productlist.length; i++)
        //   {
        //       if(productlist[i].materialID==CurrentGroceryID)
        //         {
        //             if(productlist[i].quantity>=cartlist[i].quantity)
        //               {
        //                   if(new Date(productlist[i].expiryDate)>=new Date())
        //                     {
        //                         if(productlist[i].materialPrice<=CurrentUser.balance)
        //                           {
        //                               productlist[i].quantity-=cartlist[i].quantity;
        //                               updateGroceryDetails(productlist[i].materialID,productlist[i]);
        //                               var total=cartlist[i].quantity*productlist[i].materialPrice;
        //                               var neworder:OrderInfo={
        //                                 orderID: 0,
        //                                 materialID: CurrentGroceryID,
        //                                 userID: CurrentUser.userID,
        //                                 materialName: productlist[i].materialName,
        //                                 purchaseDate: new Date(),
        //                                 quantity: cartlist[i].quantity,
        //                                 totalPrice: total,
        //                                 orderStatus: "Ordered",
        //                               }
        //                               addOrderDetails(neworder);
        //                               alert("Purchased Successfully");
        //                               Purchase();
        //                               break;
        //                           }
        //                         else
        //                         {
        //                             alert("Balance Insufficient");
        //                             break;
        //                         }
        //                     }
        //                   else
        //                   {
        //                       alert("Product Date Expired");
        //                       break;
        //                   }
        //               }
        //             else
        //             {
        //                 alert("Product quantity is not available");
        //                 break;
        //             }
        //         }
        //   }
        var totalcartprice = 0;
        for (var i = 0; i < cartlist.length; i++) {
            totalcartprice += cartlist[i].quantity * cartlist[i].materialPrice;
        }
    });
}
function OrderHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        DisplayNone();
        orderhistory.style.display = "block";
        var table3 = document.getElementById("table3");
        table3.innerHTML = "";
        var row = document.createElement("tr");
        row.innerHTML = `<th>OrderID</th>
    <th>MaterialID</th>
    <th>UserID</th>
    <th>Material Name</th>
    <th>Purchase Date</th>
    <th>Quantity</th>
    <th>Total Price</th>
    <th>Order Status</th>`;
        table3.appendChild(row);
        let orderlist = yield fetchOrderDetails();
        for (var i = 0; i < orderlist.length; i++) {
            var row1 = document.createElement("tr");
            row1.innerHTML = `<td>${orderlist[i].orderID}</td>
              <td>${orderlist[i].materialID}</td>
              <td>${orderlist[i].userID}</td>
              <td>${orderlist[i].materialName}</td>
              <td>${orderlist[i].purchaseDate.split("T")[0].split("-").reverse().join("/")}</td>
              <td>${orderlist[i].quantity}</td>
              <td>${orderlist[i].totalPrice}</td>
              <td>${orderlist[i].orderStatus}</td>`;
            table3.appendChild(row1);
        }
    });
}
function Recharge() {
    DisplayNone();
    recharge.style.display = "block";
}
function Deposit() {
    return __awaiter(this, void 0, void 0, function* () {
        var deposit = document.getElementById("recharge");
        let useramountinput = yield fetchUserDetails();
        for (let i = 0; i < useramountinput.length; i++) {
            if (useramountinput[i].email == CurrentUser.email) {
                balance1.innerHTML = "Balance: " + CurrentUser.balance;
                CurrentUser.balance += Number(deposit.value);
                updateUserDetails(useramountinput[i].userID, CurrentUser);
                alert("Recharged Successfully");
            }
        }
    });
}
function ShowBalance() {
    return __awaiter(this, void 0, void 0, function* () {
        DisplayNone();
        balance1.style.display = "block";
        let usershow = yield fetchUserDetails();
        for (var i = 0; i < usershow.length; i++) {
            if (usershow[i].email == CurrentUser.email) {
                balance1.innerHTML = "Balance: " + CurrentUser.balance + "";
            }
        }
    });
}
function fetchUserDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5136/api/User';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        return yield response.json();
    });
}
function fetchGroceryDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5136/api/Grocery';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch grocery');
        }
        return yield response.json();
    });
}
function fetchOrderDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5136/api/Order';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch order');
        }
        return yield response.json();
    });
}
function addUserDetails(User) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5136/api/User', {
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
function addGroceryDetails(Grocery) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5136/api/Grocery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Grocery)
        });
        if (!response.ok) {
            throw new Error('Failed to add Grocery');
        }
    });
}
function addOrderDetails(Order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5136/api/Order', {
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
        const response = yield fetch(`http://localhost:5136/api/User/${id}`, {
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
function updateGroceryDetails(id, Grocery) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5136/api/Grocery/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Grocery)
        });
        if (!response.ok) {
            throw new Error('Failed to update Grocery');
        }
    });
}
function updateOrderDetails(id, Order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5136/api/Order/${id}`, {
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
function deleteGroceryDetails(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5136/api/Grocery/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
    });
}
