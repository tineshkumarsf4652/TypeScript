let CurrentUserID: number;
let EditMedicineID: number;
let CurrentUser:UserInfo;
let CurrentMedicineID: number;
//let CurrentMedicine: MedicineInfo;
//let CurrentOrder: OrderInfo;

interface UserInfo {

    userID: number;
    userName: string;
    userMail: string;
    userPassword:string;
    userPhoneNumber: string;
    userBalance: number;
}

interface MedicineInfo {

    medicineID: number;
    medicineName: string;
    medicineCount: number;
    medicinePrice: number;
    medicineDate: string;
}


interface OrderInfo {

    orderID: number;
    medicineID: number;
    userID: number;
    medicineName: string;
    medicineCount: number;
    totalPrice: number;
    orderStatus: string;

}

var signIn=document.getElementById('signin') as HTMLDivElement;
var signUp=document.getElementById('signup') as HTMLDivElement;
var navbar=document.getElementById('nav') as HTMLDivElement;
let home=document.getElementById("welcome")as HTMLDivElement;
let balance=document.getElementById("balance1") as HTMLDivElement;
let medicine=document.getElementById("medicine") as HTMLDivElement;
let topp=document.getElementById("deposit")as HTMLDivElement;
let purchase=document.getElementById("purchase") as HTMLDivElement;
let edit=document.getElementById("edit") as HTMLDivElement;
let add=document.getElementById("add") as HTMLDivElement;
let quantitybox=document.getElementById("quantity-block") as HTMLDivElement;
let cancel=document.getElementById("cancel") as HTMLDivElement;
let orderhistory=document.getElementById("order") as HTMLDivElement;

function displayNone()
{
    home.style.display="none";
    balance.style.display="none";
    medicine.style.display="none";
    topp.style.display="none";
    purchase.style.display="none";
    edit.style.display="none";
    add.style.display="none";
    quantitybox.style.display="none";
    cancel.style.display="none";
    orderhistory.style.display="none";
}
function SignIn()
{
    signIn.style.display="block";
    signUp.style.display="none";
}
function SignUp()
{
    signUp.style.display="block";
    signIn.style.display="none";
}
async function SubSignUp()
{
    let flag:Boolean=true;
    var name=document.getElementById("name1") as HTMLInputElement;
    var mail=document.getElementById("mail") as HTMLInputElement;
    var pass=document.getElementById("pass") as HTMLInputElement;
    var mobile=document.getElementById("mobile") as HTMLInputElement;
    let signupinput=await fetchUserDetails();
    for (var i=0; i<signupinput.length; i++)
    {
        if(signupinput[i].userMail==mail.value)
            {
                flag=false;
                alert("This mail already exists");
                break;
            }
    }
    if(flag)
        {
            var user:UserInfo={
                userID: 0,
                userName: name.value,
                userMail: mail.value,
                userPassword: pass.value,
                userPhoneNumber: mobile.value,
                userBalance: 0
            }
            addUserDetails(user);
            CurrentUser=user;
            alert("SignUp Successfully Completed");
            SignIn();
        }
}

async function SubSignIn()
{
    var flag:boolean=true;
    var mail2=document.getElementById("mail2") as HTMLInputElement;
    var pass2=document.getElementById("pass2") as HTMLInputElement;
    var container=document.getElementById("container") as HTMLDivElement;
    let sigininput=await fetchUserDetails();
    for(var i=0; i<sigininput.length; i++)
    {
        if((sigininput[i].userMail==mail2.value)&&(sigininput[i].userPassword==pass2.value))
            {
                flag=false;
                container.style.display="none";
                CurrentUser = sigininput[i];
                alert("SigIn Successfully Completed");
                navbar.style.display="block";
            }
    }
    if(flag)
        {
            alert("Invalid Email and Password");
        }
}

function Home()
{
    displayNone();
    home.style.display="block";
    home.innerHTML="Welcome "+CurrentUser.userName;
}

async function MedicineDetails()
{
    displayNone();
    medicine.style.display="block";
    var table=document.getElementById("table") as HTMLTableElement;
    table.innerHTML="";
    var row=document.createElement("tr");
    row.innerHTML = `<th>MedicineID</th>
    <th>Medicine Name</th>
    <th>Medicine Count</th>
    <th>Medicine Price</th>
    <th>Expiry Date</th>
    <th>Modify</th>`
    table.appendChild(row);
    let medicineinput=await fetchMedicineDetails();
    for(var i=0;i<medicineinput.length;i++)
        {
            if(medicineinput[i].medicineCount>0)
            {
                var row1=document.createElement("tr");
                row1.innerHTML=`<td>${medicineinput[i].medicineID}</td>
                <td>${medicineinput[i].medicineName}</td>
                <td>${medicineinput[i].medicineCount}</td>
                <td>${medicineinput[i].medicinePrice}</td>
                <td>${medicineinput[i].medicineDate.split("T")[0].split("-").reverse().join("/")}</td>
                <td><button onclick="EditMedicine(${medicineinput[i].medicineID})">Edit</button><button onclick="Delete(${medicineinput[i].medicineID})">Delete</button></td>`
                table.appendChild(row1);
                //CurrentMedicine=medicineinput[i];
            }
        }
}

//Edit Input Medicine Details
var mname=document.getElementById("mname") as HTMLInputElement;
var mquantity=document.getElementById("mquantity") as HTMLInputElement;
var mprice=document.getElementById("mprice") as HTMLInputElement;
var mexpiry=document.getElementById("mexpiry") as HTMLInputElement;

//Add Input Medicine Details
var mname1=document.getElementById("mname1") as HTMLInputElement;
var mquantity1=document.getElementById("mquantity1") as HTMLInputElement;
var mprice1=document.getElementById("mprice1") as HTMLInputElement;
var mexpiry1=document.getElementById("mexpiry1") as HTMLInputElement;

function AddMedicine()
{
    edit.style.display="none";
    add.style.display="block";
}

function Add()
{
    var newmed:MedicineInfo ={
        medicineID: 0,
        medicineName: mname1.value,
        medicineCount: Number(mquantity1.value),
        medicinePrice: Number(mprice1.value),
        medicineDate: mexpiry1.value
    }
    addMedicineDetails(newmed);
    alert("Medicine Added Successfully");
    MedicineDetails();
}

async function EditMedicine(MedicineID:number)
{
    add.style.display="none";
    edit.style.display="block";
    EditMedicineID=MedicineID;
    let medicine2input=await fetchMedicineDetails();
    for(var i=0; i<medicine2input.length; i++)
        {
            if(medicine2input[i].medicineID==EditMedicineID)
                {
                    mname.value=medicine2input[i].medicineName;
                    mquantity.value=String(medicine2input[i].medicineCount);
                    mprice.value=String(medicine2input[i].medicinePrice);
                    mexpiry.value=medicine2input[i].medicineDate.split("T")[0].split("-").reverse().join("/");
                }
        }
}

function Edit()
{
    var medicine: MedicineInfo={
        medicineID: 0,
        medicineName: mname.value,
        medicineCount: Number(mquantity.value),
        medicinePrice: Number(mprice.value),
        medicineDate: mexpiry.value
    }
    updateMedicineDetails(EditMedicineID, medicine);
    alert("Updated Successfully");
    MedicineDetails();
}

function Delete(MedicineID:number)
{
   var ID=MedicineID;
   deleteMedicineDetails(ID);
   alert("Deleted Successfully");
   MedicineDetails();
}

async function Purchase()
{
    displayNone();
    purchase.style.display="block";
    var table1=document.getElementById("table-body") as HTMLTableElement;
    table1.innerHTML="";
    var row=document.createElement("tr");
    row.innerHTML=`<th>MedicineID</th>
    <th>Medicine Name</th>
    <th>Medicine Count</th>
    <th>Medicine Price</th>
    <th>Expiry Date</th>
    <th>Purchase</th>`;
    table1.appendChild(row);
    let purchaseinput=await fetchMedicineDetails();
    for(var i=0; i<purchaseinput.length; i++)
        {
            var row1=document.createElement("tr");
            row1.innerHTML=`<td>${purchaseinput[i].medicineID}</td>
            <td>${purchaseinput[i].medicineName}</td>
            <td>${purchaseinput[i].medicineCount}</td>
            <td>${purchaseinput[i].medicinePrice}</td>
            <td>${purchaseinput[i].medicineDate.split("T")[0].split("-").reverse().join("/")}</td>
            <td><button onclick="buy('${purchaseinput[i].medicineID}')">Select</button></td>`
            table1.appendChild(row1);
        }
}

function buy(MedicineID:number)
{
    CurrentMedicineID=MedicineID;
    let quantiyBlock=document.getElementById("quantity-block") as HTMLDivElement;
    quantiyBlock.style.display="block";
}

async function buyMedicine()
{
    var flag:boolean=true;
    let quantity:number=parseInt((document.getElementById("quantity") as HTMLInputElement).value)
    let medicineinput=await fetchMedicineDetails();
    for(var i=0; i<medicineinput.length; i++)
        {
            if(medicineinput[i].medicineID==CurrentMedicineID)
                {
                    flag=false;
                    if(medicineinput[i].medicineCount>=quantity)
                        {
                            if(new Date(medicineinput[i].medicineDate)>=new Date())
                                {
                                    if(medicineinput[i].medicinePrice<=CurrentUser.userBalance)
                                        {
                                            
                                            medicineinput[i].medicineCount-=quantity;
                                            updateMedicineDetails(medicineinput[i].medicineID,medicineinput[i]);
                                            var totalPrice=quantity*medicineinput[i].medicinePrice;
                                            var newOrder:OrderInfo={
                                                orderID: 0,
                                                medicineID: medicineinput[i].medicineID,
                                                userID: CurrentUser.userID,
                                                medicineName: medicineinput[i].medicineName,
                                                medicineCount: quantity,
                                                totalPrice: totalPrice,
                                                orderStatus: "Ordered"
                                            }
                                            addOrderDetails(newOrder);
                                            alert("Purchased Successfully");
                                            break;
                                        }
                                    else
                                    {
                                        alert("Balance Insufficient");
                                        break;
                                    }
                                }
                            else
                            {
                                alert("Medicine Date Expired");
                                break;
                            }
                        }
                    else
                    {
                        alert("Medicine quantity is not available");
                        break;
                    }
                }
        }
        if(flag)
            {
                alert("MedicineID is Invalid")
            }
}

async function Cancel()
{
    displayNone();
    cancel.style.display="block";
    var table2=document.getElementById("table2") as HTMLTableElement;
    table2.innerHTML="";
    var row=document.createElement("tr");
    row.innerHTML=`<th>OrderID</th>
    <th>MedicineID</th>
    <th>UserID</th>
    <th>Medicine Name</th>
    <th>Medicine Count</th>
    <th>Total Price</th>
    <th>Order Status</th>
    <th>Cancel</th>`;
    table2.appendChild(row);
    let cancelorderinput=await fetchOrderDetails();
    for(var i=0; i<cancelorderinput.length; i++)
        {
            if(cancelorderinput[i].orderStatus=="Ordered")
                {
                    var row1=document.createElement("tr");
                    row1.innerHTML=`<td>${cancelorderinput[i].orderID}</td>
                    <td>${cancelorderinput[i].medicineID}</td>
                    <td>${cancelorderinput[i].userID}</td>
                    <td>${cancelorderinput[i].medicineName}</td>
                    <td>${cancelorderinput[i].medicineCount}</td>
                    <td>${cancelorderinput[i].totalPrice}</td>
                    <td>${cancelorderinput[i].orderStatus}</td>
                    <td><button onclick="CancelFun('${cancelorderinput[i].orderID}')">Cancel</button></td>`
                    table2.appendChild(row1);
                    
                }
        }
}

async function CancelFun(OrderID:number)
{
    var flag:boolean=true;
    let orderinput=await fetchOrderDetails();
    let medicineinput=await fetchMedicineDetails();
    for(var i=0; i<orderinput.length; i++)
        {
            if(orderinput[i].orderID==OrderID)
                {
                    flag=false;
                    if(orderinput[i].orderStatus=="Ordered")
                        {
                            orderinput[i].orderStatus="Cancelled";
                            CurrentUser.userBalance += orderinput[i].totalPrice;
                            updateOrderDetails(OrderID,orderinput[i]);
                            updateUserDetails(CurrentUser.userID,CurrentUser);
                            for(var j=0; j<medicineinput.length; j++)
                                {
                                    if(orderinput[i].medicineID==medicineinput[j].medicineID)
                                        {
                                            medicineinput[j].medicineCount+=orderinput[i].medicineCount;
                                            updateMedicineDetails(medicineinput[j].medicineID,medicineinput[j]);
                                            alert("Order Cancelled");
                                            Cancel();
                                            break;
                                        }
                                }
                        }
                }
        }
}

async function OrderHistory()
{
    displayNone();
    orderhistory.style.display="block";
    var table3=document.getElementById("table3") as HTMLTableElement;
    table3.innerHTML="";
    var row=document.createElement("tr");
    row.innerHTML=`<th>OrderID</th>
    <th>MedicineID</th>
    <th>UserID</th>
    <th>Medicine Name</th>
    <th>Medicine Count</th>
    <th>Total Price</th>
    <th>Order Status</th>`
    table3.appendChild(row);
    let orderlist=await fetchOrderDetails();
    for(var i=0; i<orderlist.length; i++)
        {
                    var row1=document.createElement("tr");
                    row1.innerHTML=`<td>${orderlist[i].orderID}</td>
                    <td>${orderlist[i].medicineID}</td>
                    <td>${orderlist[i].userID}</td>
                    <td>${orderlist[i].medicineName}</td>
                    <td>${orderlist[i].medicineCount}</td>
                    <td>${orderlist[i].totalPrice}</td>
                    <td>${orderlist[i].orderStatus}</td>`
                    table3.appendChild(row1);
        }
}

async function ShowBalance()
{
    displayNone();
    balance.style.display="block";
    let userinput=await fetchUserDetails();
    for(var i=0; i<userinput.length; i++)
        {
            if(userinput[i].userMail==CurrentUser.userMail)
                {
                    balance.innerHTML="Balance: "+CurrentUser.userBalance+"";
                }
        }
}

function TopUp()
{
    displayNone();
    topp.style.display="block";
}

async function Deposit()
{
    var amount1=document.getElementById("recharge") as HTMLInputElement;
    let userinput=await fetchUserDetails();
    for(let i=0; i<userinput.length; i++)
        {
            if(userinput[i].userMail==CurrentUser.userMail)
                {
                    CurrentUser.userBalance+=Number(amount1.value);
                    updateUserDetails(userinput[i].userID,userinput[i]);
                }
        }
}

async function fetchUserDetails(): Promise<UserInfo[]> {
    const apiUrl = 'http://localhost:5054/api/User';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return await response.json();
  }

async function fetchMedicineDetails(): Promise<MedicineInfo[]> {
    const apiUrl = 'http://localhost:5054/api/Medicine';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch medicine');
    }
    return await response.json();
  }


async function fetchOrderDetails(): Promise<OrderInfo[]> {
    const apiUrl = 'http://localhost:5054/api/Order';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    return await response.json();
  }

async function addUserDetails(User: UserInfo): Promise<void> {
    const response = await fetch('http://localhost:5054/api/User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(User)
    });
    if (!response.ok) {
      throw new Error('Failed to add User');
    }
  }

async function addMedicineDetails(Medicine: MedicineInfo): Promise<void> {
    const response = await fetch('http://localhost:5054/api/Medicine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Medicine)
    });
    if (!response.ok) {
      throw new Error('Failed to add Medicine');
    }
  }

async function addOrderDetails(Order: OrderInfo): Promise<void> {
    const response = await fetch('http://localhost:5054/api/Order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Order)
    });
    if (!response.ok) {
      throw new Error('Failed to add Order');
    }
  }

async function updateUserDetails(id: number, User: UserInfo): Promise<void> {
    const response = await fetch(`http://localhost:5054/api/User/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(User)
    });
    if (!response.ok) {
      throw new Error('Failed to update User');
    }
  }

async function updateMedicineDetails(id: number, Medicine: MedicineInfo): Promise<void> {
    const response = await fetch(`http://localhost:5054/api/Medicine/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Medicine)
    });
    if (!response.ok) {
      throw new Error('Failed to update Medicine');
    }
  }
  
async function updateOrderDetails(id: number, Order: OrderInfo): Promise<void> {
    const response = await fetch(`http://localhost:5054/api/Order/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Order)
    });
    if (!response.ok) {
      throw new Error('Failed to update Order');
    }
  }

async function deleteMedicineDetails(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5054/api/Medicine/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
  }
