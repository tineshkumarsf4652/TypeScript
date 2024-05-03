var signIn=document.getElementById('signin') as HTMLDivElement;
var signUp=document.getElementById('signup') as HTMLDivElement;
var navbar=document.getElementById('nav') as HTMLDivElement;
let home=document.getElementById("welcome")as HTMLDivElement;
let balance=document.getElementById("balance1") as HTMLDivElement;
let medicine=document.getElementById("medicine") as HTMLDivElement;
let topp=document.getElementById("deposit")as HTMLDivElement;
let purchase=document.getElementById("purchase") as HTMLDivElement;
let quantitybox=document.getElementById("quantity-block") as HTMLDivElement;
let cancel=document.getElementById("cancel") as HTMLDivElement;
let orderhistory=document.getElementById("order") as HTMLDivElement;

let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;

let CurrentUserId: string;
let CurrentUser:User;
let CurrentMedicineID: string;

class User {

    UserId: string;
    UserName: string;
    UserMail: string;
    UserPassword:string;
    UserPhoneNumber: string;
    UserBalance: number;

    constructor(paramUserName: string, paramUserMail: string, paramUserPassword: string, paramUserPhoneNumber: string, paramUserBalance: number) {

        UserIdAutoIncrement++;

        this.UserId = "UI" + UserIdAutoIncrement.toString();

        this.UserName = paramUserName;
        this.UserMail = paramUserMail;
        this.UserPassword = paramUserPassword;
        this.UserPhoneNumber = paramUserPhoneNumber;
        this.UserBalance = paramUserBalance;
    }
}

class MedicineInfo {

    MedicineId: string;
    MedicineName: string;
    MedicineCount: number;
    MedicinePrice: number;
    MedicineDate: Date;

    constructor(paramMedicineName: string, paramMedicineCount: number, paramMedicinePrice: number, paramMedicineDate:Date) {
        MedicineIdAutoIncrement++;

        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.MedicineDate = paramMedicineDate;
    }
}

enum OrderStatus{Ordered=
    'Ordered', Cancelled="Cancelled"}

class Order {
    OrderId: string;
    MedicineId: string;
    UserId: string;
    MedicineName: string;
    MedicineCount: number;
    TotalPrice: number;
    OrderStatus: OrderStatus;

    constructor(paramMedicineId: string, paramUserId: string, paramMedicineName: string, paramMedicineCount: number, paramTotalPrice:number, paramOrderStatus:OrderStatus) {
        OrderIdAutoIncrement++;

        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.UserId = paramUserId;
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.TotalPrice = paramTotalPrice;
        this.OrderStatus = paramOrderStatus;
    }
}

let UserArrayList: Array<User> = new Array<User>();

UserArrayList.push(new User("Hemanth", "hemanth@gmail.com", "hemanth123" ,"9876543210",0));
UserArrayList.push(new User("Harish", "harish@gmail.com", "harish123","9873459874",0));

let MedicineList: Array<MedicineInfo> = new Array<MedicineInfo>();

MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date("2024,07,01")));
MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date("2024,08,07")));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date("2024,09,10")));
MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date("2024,11,12")));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date("2024,06,11")));

let OrderList: Array<Order> = new Array<Order>();


function displayNone()
{
    home.style.display="none";
    balance.style.display="none";
    medicine.style.display="none";
    topp.style.display="none";
    purchase.style.display="none";
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
function SubSignUp()
{
    let flag:Boolean=true;
    var username=document.getElementById("name1") as HTMLInputElement;
    var mail=document.getElementById("mail") as HTMLInputElement;
    var pass=document.getElementById("pass") as HTMLInputElement;
    var mobile=document.getElementById("mobile") as HTMLInputElement;
    for (let i = 0; i < UserArrayList.length; i++)
    {
        if(UserArrayList[i].UserMail==mail.value)
            {
                flag=false;
                break;
            }
    }
    if(flag)
        {
            var user:User=new User(username.value,mail.value,pass.value,mobile.value,0);
            CurrentUser=user;
            UserArrayList.push(user);
            SignIn();
        }
}
function SubSignIn()
{
    var mail2=document.getElementById("mail2") as HTMLInputElement;
    var pass2=document.getElementById("pass2") as HTMLInputElement;
    var container=document.getElementById("container") as HTMLDivElement;
    for(let i=0; i<UserArrayList.length; i++)
    {
        if((UserArrayList[i].UserMail==mail2.value)&&(UserArrayList[i].UserPassword==pass2.value))
            {
                container.style.display="none";
                var navbar=document.getElementById('nav') as HTMLDivElement;
                CurrentUser= UserArrayList[i];
                navbar.style.display="block";
            }
    }
}

function Home()
{
    displayNone();
    home.style.display="block";
    home.innerHTML="Welcome"+CurrentUser.UserName;
}

function MedicineDetails()
{
    displayNone();
    medicine.style.display="block";
    var table=document.getElementById("table") as HTMLTableElement;
    table.innerHTML="";
    var row=document.createElement("tr");
    row.innerHTML = `<th>Sl.NO</th>
    <th>Medicine Name</th>
    <th>Medicine Price</th>
    <th>Quantity</th>
    <th>Expiry Date</th>
    <th>Modify</th>`
    var count:number=1;
    table.appendChild(row);
    for(var i=0;i<MedicineList.length;i++)
        {
            var row1=document.createElement("tr");
            row1.innerHTML=`<td>${count}</td>
            <td>${MedicineList[i].MedicineName}</td>
            <td>${MedicineList[i].MedicinePrice}</td>
            <td>${MedicineList[i].MedicineCount}</td>
            <td>${MedicineList[i].MedicineDate}</td>
            <td><button onclick="Edit()">Edit</button><button onclick="Delete()">Delete</button></td>`
            table.appendChild(row1);
            count++;
        }
}
function Edit()
{

}
function Delete()
{

}
function Purchase()
{
    displayNone();
    purchase.style.display="block";
    var table1=document.getElementById("table-body") as HTMLTableElement;
    table1.innerHTML="";
    var row=document.createElement("tr");
    row.innerHTML=`<th>Sl.NO</th>
    <th>Medicine Name</th>
    <th>Medicine Price</th>
    <th>Quantity</th>
    <th>Expiry Date</th>
    <th>Modify</th>`;
    var count:number=1;
    table1.appendChild(row);
    for(var i=0; i<MedicineList.length; i++)
        {
            var row1=document.createElement("tr");
            row1.innerHTML=`<td>${count}</td>
            <td>${MedicineList[i].MedicineName}</td>
            <td>${MedicineList[i].MedicinePrice}</td>
            <td>${MedicineList[i].MedicineCount}</td>
            <td>${MedicineList[i].MedicineDate}</td>
            <td><button onclick="buy('${MedicineList[i].MedicineId}')">buy</button></td>`
            table1.appendChild(row1);
            count++;
        }
}
function buy(MedicineId:string)
{
    CurrentMedicineID=MedicineId;
    let quantiyBlock=document.getElementById("quantity-block") as HTMLDivElement;
    quantiyBlock.style.display="block";
}
function buyMedicine()
{
    var flag:boolean=true;
    let quantity:number=parseInt((document.getElementById("quantity") as HTMLInputElement).value)
    for(var i=0; i<MedicineList.length; i++)
        {
            if(MedicineList[i].MedicineId==CurrentMedicineID)
                {
                    flag=false;
                    if(MedicineList[i].MedicineCount>=quantity)
                        {
                            if(MedicineList[i].MedicineDate>new Date())
                                {
                                    if(MedicineList[i].MedicinePrice<=CurrentUser.UserBalance)
                                        {
                                            
                                            MedicineList[i].MedicineCount-=quantity;
                                            var totalPrice=quantity*MedicineList[i].MedicinePrice;
                                            var newOrder:Order=new Order(MedicineList[i].MedicineId,CurrentUserId,MedicineList[i].MedicineName,quantity,totalPrice,OrderStatus.Ordered)
                                            OrderList.push(newOrder);
                                            alert("Purchase Successful");
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
function Cancel()
{
    displayNone();
    cancel.style.display="block";
    var table2=document.getElementById("table2") as HTMLTableElement;
    table2.innerHTML="";
    var row=document.createElement("tr");
    row.innerHTML=`<th>Sl.NO</th>
    <th>Medicine Name</th>
    <th>Medicine Count</th>
    <th>Total Price</th>
    <th>Order Status</th>
    <th>Cancel</th>`;
    var count:number=1;
    table2.appendChild(row);
    for(var i=0; i<OrderList.length; i++)
        {
            if(OrderList[i].OrderStatus==OrderStatus.Ordered)
                {
                    var row1=document.createElement("tr");
                    row1.innerHTML=`<td>${count}</td>
                    <td>${OrderList[i].MedicineName}</td>
                    <td>${OrderList[i].MedicineCount}</td>
                    <td>${OrderList[i].TotalPrice}</td>
                    <td>${OrderList[i].OrderStatus}</td>
                    <td><button onclick="CancelFun('${OrderList[i].OrderId}')">Cancel</button></td>`
                    table2.appendChild(row1);
                    count++;
                }
        }
}
function CancelFun(OrderId:string)
{

    for(var i=0; i<OrderList.length; i++)
        {
            if(OrderList[i].OrderId==OrderId)
                {
                    OrderList[i].OrderStatus=OrderStatus.Cancelled;
                    for(var j=0; j<MedicineList.length; j++)
                        {
                            if(OrderList[i].MedicineId===MedicineList[j].MedicineId)
                                {
                                    MedicineList[j].MedicineCount+=OrderList[i].MedicineCount;
                                    CurrentUser.UserBalance+=OrderList[i].TotalPrice;
                                }
                        }
                    
                }
                else
                {
                    alert("OrderID is Invalid");
                }
        }
}
function OrderHistory()
{
    displayNone();
    orderhistory.style.display="block";
    var table3=document.getElementById("table3") as HTMLTableElement;
    table3.innerHTML="";
    var row=document.createElement("tr");
    row.innerHTML=`<th>Sl.NO</th>
    <th>Medicine Name</th>
    <th>Medicine Count</th>
    <th>Total Price</th>
    <th>Order Status</th>`
    var count:number=1;
    table3.appendChild(row);
    for(var i=0; i<OrderList.length; i++)
        {
                    var row1=document.createElement("tr");
                    row1.innerHTML=`<td>${count}</td>
                    <td>${OrderList[i].MedicineName}</td>
                    <td>${OrderList[i].MedicineCount}</td>
                    <td>${OrderList[i].TotalPrice}</td>
                    <td>${OrderList[i].OrderStatus}</td>`
                    table3.appendChild(row1);
                    count++;
        }
}
function ShowBalance()
{
    displayNone();
    balance.style.display="block";
    for(let i=0; i<UserArrayList.length; i++)
        {
            if(UserArrayList[i].UserMail==CurrentUser.UserMail)
                {
                    balance.innerHTML="Balance: "+UserArrayList[i].UserBalance+"";
                }
        }
}
function TopUp()
{
    displayNone();
    topp.style.display="block";
}
function Deposit()
{
    var amount1=document.getElementById("recharge") as HTMLInputElement;
    for(let i=0; i<UserArrayList.length; i++)
        {
            if(UserArrayList[i].UserMail==CurrentUser.UserMail)
                {
                    CurrentUser.UserBalance+=Number(amount1.value);
                }
        }
}

