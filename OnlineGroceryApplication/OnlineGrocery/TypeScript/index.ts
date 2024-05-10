let CurrentUser:UserInfo;
let CurrentUserId:any;
let EditGroceryID:any;
let CurrentGroceryID:any;

interface UserInfo
{
    userID:any;
    userName:string;
    email:string;
    password:string;
    address:string;
    phoneNumber:string;
    balance:number;
}
interface GroceryInfo
{
    materialID:any;
    materialName:string;
    quantity:number;
    materialPrice:number;
    manufactureDate:any;
    expiryDate:any;
    description:string;
    materialImage:string[];
}
interface OrderInfo
{
    orderID:any;
    materialID:number[];
    userID:number;
    materialName:string[];
    quantity:number[];
    materialPrice:number[];
    totalPrice:number;
    purchaseDate:any;
    orderStatus:string;
}
interface TempCartItem
{
    materialName:string;
    expiryDate:any;
    quantity:number;
    materialPrice:number;
    materialImage:string[];
}

let cartlist:TempCartItem[]=[];

var signup=document.getElementById("signup") as HTMLDivElement;
var signin=document.getElementById("signin") as HTMLDivElement;
var navbar=document.getElementById("navbar") as HTMLDivElement;
var home=document.getElementById("home") as HTMLDivElement;
var grocery=document.getElementById("grocery") as HTMLDivElement;
var edit=document.getElementById("edit") as HTMLDivElement;
var add=document.getElementById("add") as HTMLDivElement;
var purchase=document.getElementById("purchase") as HTMLDivElement;
let cart=document.getElementById("cart") as HTMLDivElement;
var quantitybox=document.getElementById("quantity-block") as HTMLDivElement;
var orderhistory=document.getElementById("history") as HTMLDivElement;
var recharge=document.getElementById("deposit") as HTMLDivElement;
var balance1=document.getElementById("balance") as HTMLDivElement;


function ClickSignUp()
{
    signup.style.display="block";
    signin.style.display="none"
}

function ClickSignIn()
{
    signin.style.display="block";
    signup.style.display="none";
}

function DisplayNone()
{
    home.style.display="none";
    grocery.style.display="none";
    cart.style.display="none";
    quantitybox.style.display="none";
    edit.style.display="none";
    add.style.display="none";
    purchase.style.display="none";
    recharge.style.display="none";
    balance1.style.display="none";
    orderhistory.style.display="none"
}

async function SignUp()
{
    var flag:boolean=true;
    var name=document.getElementById("name") as HTMLInputElement;
    var mail=document.getElementById("mail") as HTMLInputElement;
    var pass=document.getElementById("pass") as HTMLInputElement;
    var address=document.getElementById("address") as HTMLInputElement;
    var phone=document.getElementById("phone") as HTMLInputElement;
    let userupinput=await fetchUserDetails()
    for(var i=0; i<userupinput.length; i++)
        {
            if(userupinput[i].email==mail.value)
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
                email: mail.value,
                password: pass.value,
                address: address.value,
                phoneNumber: phone.value,
                balance: 0
            }
            addUserDetails(user);
            CurrentUser=user;
            alert("SignUp Completed")
            ClickSignIn();
        }
}

async function SignIn()
{
    var flag:boolean=true;
    var mail2=document.getElementById("mail2") as HTMLInputElement;
    var pass2=document.getElementById("pass2") as HTMLInputElement;
    var container=document.getElementById("container") as HTMLDivElement;
    let userininput=await fetchUserDetails()
    for(var i=0; i<userininput.length; i++)
    {
        if((userininput[i].email==mail2.value)&&(userininput[i].password==pass2.value))
            {
                flag=false;
                container.style.display="none";
                CurrentUser = userininput[i];
                alert("SigIn Completed");
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
    DisplayNone();
    home.style.display="block";
    home.innerHTML="Welcome "+CurrentUser.userName;
}

async function GroceryDetails()
{
    DisplayNone();
    grocery.style.display="block";
    var table=document.getElementById("tablebody") as HTMLTableElement;
    table.innerHTML="";
    var row=document.createElement("tr");
    row.innerHTML = `<th>MaterialID</th>
    <th>Material Name</th>
    <th>Material Count</th>
    <th>Material Price</th>
    <th>Manufacture Date</th>
    <th>Expiry Date</th>
    <th>Description</th>
    <th>Material Image</th>
    <th>Modify</th>`
    table.appendChild(row);
    let groceryinput=await fetchGroceryDetails();
    for(var i=0;i<groceryinput.length;i++)
        {
            if(groceryinput[i].quantity>0)
            {
                var row1=document.createElement("tr");
                row1.innerHTML=`<td>${groceryinput[i].materialID}</td>
                <td>${groceryinput[i].materialName}</td>
                <td>${groceryinput[i].quantity}</td>
                <td>${groceryinput[i].materialPrice}</td>
                <td>${groceryinput[i].manufactureDate.split("T")[0].split("-").reverse().join("/")}</td>
                <td>${groceryinput[i].expiryDate.split("T")[0].split("-").reverse().join("/")}</td>
                <td>${groceryinput[i].description}</td>
                <td><img class="img" src="${groceryinput[i].materialImage}"></td>
                <td><button onclick="EditGrocery(${groceryinput[i].materialID})">Edit</button><button onclick="Delete(${groceryinput[i].materialID})">Delete</button></td>`
                table.appendChild(row1);
            }
        }
}

    var mname=document.getElementById("mname") as HTMLInputElement;
    var mquan=document.getElementById("mquan") as HTMLInputElement;
    var mprice=document.getElementById("mprice") as HTMLInputElement;
    var mdate=document.getElementById("mdate") as HTMLInputElement;
    var exdate=document.getElementById("exdate") as HTMLInputElement;
    var desc=document.getElementById("desc") as HTMLInputElement;
    

function AddGrocery()
{
    DisplayNone()
    add.style.display="block";
}

function Add()
{
    var mname1=document.getElementById("mname1") as HTMLInputElement;
    var mquan1=document.getElementById("mquan1") as HTMLInputElement;
    var mprice1=document.getElementById("mprice1") as HTMLInputElement;
    var mdate1=document.getElementById("mdate1") as HTMLInputElement;
    var exdate1=document.getElementById("exdate1") as HTMLInputElement;
    var desc1=document.getElementById("desc1") as HTMLInputElement;
    var materialphoto=document.getElementById("groceryphoto") as HTMLInputElement;

    const mname3=mname1.value.trim();
    const mquan3=mquan1.value.trim();
    const mprice3=mprice1.value.trim();
    const mdate3=mdate1.value.trim();
    const exdate3=exdate1.value.trim();
    const desc3=desc1.value.trim();
    const photo=materialphoto.files?.[0];

    if(photo)
      {
          const reader=new  FileReader();
          reader.onload=function(event){
            const base64String=event.target?.result as string;
            var newgro:GroceryInfo={
              materialID: 0,
              materialName: mname3,
              quantity: Number(mquan3),
              materialPrice: Number(mprice3),
              manufactureDate: mdate3,
              expiryDate: exdate3,
              description: desc3,
              materialImage: [base64String]
            }
            addGroceryDetails(newgro);
            alert("Grocery Added Successfully");
            GroceryDetails();
          }
          reader.readAsDataURL(photo);
      }
}

async function EditGrocery(MaterialID:any)
{
    add.style.display="none";
    edit.style.display="block";
    EditGroceryID=MaterialID;
    let grocery2input=await fetchGroceryDetails();
    for(var i=0; i<grocery2input.length; i++)
      {
          if(grocery2input[i].materialID==EditGroceryID)
              {
                  mname.value=grocery2input[i].materialName;
                  mquan.value=String(grocery2input[i].quantity);
                  mprice.value=String(grocery2input[i].materialPrice);
                  mdate.value=grocery2input[i].manufactureDate.split("T")[0].split("-").reverse().join("/");
                  exdate.value=grocery2input[i].expiryDate.split("T")[0].split("-").reverse().join("/");
                  desc.value=grocery2input[i].description;
              }
      }
}

function Edit()
{
    var grocery:GroceryInfo={
      materialID: 0,
      materialName: mname.value,
      quantity: Number(mquan.value),
      materialPrice: Number(mprice.value),
      manufactureDate: mdate.value,
      expiryDate: exdate.value,
      description: desc.value,
      materialImage:[]
    }
    updateGroceryDetails(EditGroceryID, grocery);
    alert("Updated Successfully");
    GroceryDetails();
}

function Delete(MaterialID:any)
{
    DisplayNone();
    grocery.style.display="block";
    var ID=MaterialID;
    deleteGroceryDetails(ID);
    alert("Deleted Successfully");
    GroceryDetails();
}

async function Purchase()
{
    DisplayNone();
    purchase.style.display="block";
    var table=document.getElementById("table") as HTMLTableElement;
    table.innerHTML="";
    var row=document.createElement("tr");
    row.innerHTML=`<th>MaterialID</th>
    <th>Material Name</th>
    <th>Material Count</th>
    <th>Material Price</th>
    <th>Manufacture Date</th>
    <th>Expiry Date</th>
    <th>Description</th>
    <th>Material Image</th>
    <th>Purchase</th>`
    table.appendChild(row);
    let purchaseinput=await fetchGroceryDetails();
    for(var i=0; i<purchaseinput.length; i++)
      {
          var row1=document.createElement("tr");
          row1.innerHTML=`<td>${purchaseinput[i].materialID}</td>
          <td>${purchaseinput[i].materialName}</td>
          <td>${purchaseinput[i].quantity}</td>
          <td>${purchaseinput[i].materialPrice}</td>
          <td>${purchaseinput[i].manufactureDate.split("T")[0].split("-").reverse().join("/")}</td>
          <td>${purchaseinput[i].expiryDate.split("T")[0].split("-").reverse().join("/")}</td>
          <td>${purchaseinput[i].description}</td>
          <td><img class="img" src="${purchaseinput[i].materialImage[0]}"></td>
          <td><button onclick="DisplayQuantity(${purchaseinput[i].materialID})">AddtoCart</button></td>`
          table.appendChild(row1);
      }
}

function DisplayQuantity(MaterialID:any)
{
    CurrentGroceryID=MaterialID;
    quantitybox.style.display="block";
}

async function AddCart()
{
  let quantity1=parseInt((document.getElementById("cartquantity") as HTMLInputElement).value);
    let cartinput=await fetchGroceryDetails();
    for(var i=0; i<cartinput.length; i++)
      {
          if(CurrentGroceryID==cartinput[i].materialID)
            {
                var cartitem:TempCartItem={
                  materialName: cartinput[i].materialName,
                  expiryDate:cartinput[i].expiryDate,
                  quantity: quantity1,
                  materialPrice: cartinput[i].materialPrice,
                  materialImage: cartinput[i].materialImage,
                }
                cartlist.push(cartitem);
            }
      }
      alert("Product Added to Cart")
}

function MyCart()
{
    DisplayNone()
    cart.style.display="block"
    var tablecart=document.getElementById("cart1") as HTMLTableElement;
    tablecart.innerHTML="";
    var row=document.createElement("tr");
    row.innerHTML=`<th>List No</th>
    <th>MaterialName</th>
    <th>Expiry Date</th>
    <th>Quantity</th>
    <th>Material Price</th>
    <th>Material Image</th>`
    tablecart.appendChild(row);
    var count=1;
    for(var i=0; i<cartlist.length; i++)
      {
          var row1=document.createElement("tr");
          row1.innerHTML=`<td>${count}</td>
          <td>${cartlist[i].materialName}</td>
          <td>${cartlist[i].expiryDate.split("T")[0].split("-").reverse().join("/")}</td>
          <td>${cartlist[i].quantity}</td>
          <td>${cartlist[i].materialPrice}</td>
          <td><img class="img" src="${cartlist[i].materialImage}"></td>`
          tablecart.appendChild(row1);
          count++;
      }
}

async function BuyProduct()
{
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
  
    var totalcartprice:number=0;
    for(var i=0; i<cartlist.length; i++)
      {
          totalcartprice+=cartlist[i].quantity*cartlist[i].materialPrice;
      }
    
}

async function OrderHistory()
{
    DisplayNone();
    orderhistory.style.display="block";
    var table3=document.getElementById("table3") as HTMLTableElement;
    table3.innerHTML="";
    var row=document.createElement("tr");
    row.innerHTML=`<th>OrderID</th>
    <th>MaterialID</th>
    <th>UserID</th>
    <th>Material Name</th>
    <th>Purchase Date</th>
    <th>Quantity</th>
    <th>Total Price</th>
    <th>Order Status</th>`
    table3.appendChild(row);
    let orderlist=await fetchOrderDetails();
    for(var i=0; i<orderlist.length; i++)
        {
              var row1=document.createElement("tr");
              row1.innerHTML=`<td>${orderlist[i].orderID}</td>
              <td>${orderlist[i].materialID}</td>
              <td>${orderlist[i].userID}</td>
              <td>${orderlist[i].materialName}</td>
              <td>${orderlist[i].purchaseDate.split("T")[0].split("-").reverse().join("/")}</td>
              <td>${orderlist[i].quantity}</td>
              <td>${orderlist[i].totalPrice}</td>
              <td>${orderlist[i].orderStatus}</td>`
              table3.appendChild(row1);
        }
}

function Recharge()
{
    DisplayNone();
    recharge.style.display="block";
}

async function Deposit()
{
    var deposit=document.getElementById("recharge") as HTMLInputElement;
    let useramountinput=await fetchUserDetails();
    for(let i=0; i<useramountinput.length; i++)
        {
            if(useramountinput[i].email==CurrentUser.email)
                {
                    balance1.innerHTML="Balance: "+CurrentUser.balance;
                    CurrentUser.balance+=Number(deposit.value);
                    updateUserDetails(useramountinput[i].userID,CurrentUser);
                    alert("Recharged Successfully");
                }
        }

}

async function ShowBalance()
{
    DisplayNone();
    balance1.style.display="block";
    let usershow=await fetchUserDetails();
    for(var i=0; i<usershow.length; i++)
        {
            if(usershow[i].email==CurrentUser.email)
                {
                    balance1.innerHTML="Balance: "+CurrentUser.balance+"";
                }
        }
}

async function fetchUserDetails(): Promise<UserInfo[]> {
    const apiUrl = 'http://localhost:5136/api/User';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return await response.json();
  }
async function fetchGroceryDetails(): Promise<GroceryInfo[]> {
    const apiUrl = 'http://localhost:5136/api/Grocery';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch grocery');
    }
    return await response.json();
  }
async function fetchOrderDetails(): Promise<OrderInfo[]> {
    const apiUrl = 'http://localhost:5136/api/Order';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    return await response.json();
  }

async function addUserDetails(User: UserInfo): Promise<void> {
    const response = await fetch('http://localhost:5136/api/User', {
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
async function addGroceryDetails(Grocery: GroceryInfo): Promise<void> {
    const response = await fetch('http://localhost:5136/api/Grocery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Grocery)
    });
    if (!response.ok) {
      throw new Error('Failed to add Grocery');
    }
  }
async function addOrderDetails(Order: OrderInfo): Promise<void> {
    const response = await fetch('http://localhost:5136/api/Order', {
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
    const response = await fetch(`http://localhost:5136/api/User/${id}`, {
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
async function updateGroceryDetails(id: number, Grocery: GroceryInfo): Promise<void> {
    const response = await fetch(`http://localhost:5136/api/Grocery/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Grocery)
    });
    if (!response.ok) {
      throw new Error('Failed to update Grocery');
    }
  }
async function updateOrderDetails(id: number, Order: OrderInfo): Promise<void> {
    const response = await fetch(`http://localhost:5136/api/Order/${id}`, {
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

async function deleteGroceryDetails(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5136/api/Grocery/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
  }