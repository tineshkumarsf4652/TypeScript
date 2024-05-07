var CurrentUser:User;
var CurrentTicketID:number;

interface User
{
    cardID:number;
    username:string;
    email:string;
    password:string
    phoneNumber:string;
    balance:number;
}

interface Travel
{
    travelID:number;
    cardID:number;
    fromLocation:string;
    toLocation:string;
    travelDate:any;
    travelCost:number; 
}

interface Ticket
{
    ticketID:number;
    fromLocation:string;
    toLocation:string;
    ticketPrice:number;
}

var container=document.getElementById("container") as HTMLDivElement;
var clickregister=document.getElementById("register") as HTMLDivElement;
var clicklogin=document.getElementById("login") as HTMLDivElement;
var navbar=document.getElementById("nav") as HTMLDivElement;
let home=document.getElementById("home") as HTMLDivElement;
let balance=document.getElementById("showbalance") as HTMLDivElement;
let recharge=document.getElementById("recharge") as HTMLDivElement;
let travelhistory=document.getElementById("travelhistory") as HTMLDivElement;
let travel=document.getElementById("travel") as HTMLDivElement;
let travellocation=document.getElementById("travellocation") as HTMLDivElement;
var fromlocation=document.getElementById("fromlocation") as HTMLInputElement;
var tolocation=document.getElementById("tolocation") as HTMLInputElement;

function ClickRegister()
{
    clickregister.style.display="block";
    clicklogin.style.display="none";
}
function ClickLogIn()
{
    clicklogin.style.display="block";
    clickregister.style.display="none";
}
async function SubRegister()
{
    var flag:boolean=true;
    var name=document.getElementById("name") as HTMLInputElement;
    var pass=document.getElementById("pass") as HTMLInputElement;
    var mail=document.getElementById("mail") as HTMLInputElement;
    var mobile=document.getElementById("mobile") as HTMLInputElement;
    let registerinput=await fetchUserDetails();
    for(var i=0; i<registerinput.length; i++)
        {
            if(registerinput[i].email==mail.value)
                {
                    flag=false;
                    alert("This mail is already exists");
                    break;
                }
        }
    if(flag)
        {
            var user:User={
                cardID: 0,
                username: name.value,
                email: mail.value,
                password: pass.value,
                phoneNumber: mobile.value,
                balance: 0
            }
            addUserDetails(user);
            CurrentUser=user;
            alert("Registered Successfully");
            ClickLogIn();
        }
}
async function SubLogIn()
{
    var flag:boolean=true;
    var mail2=document.getElementById("mail2") as HTMLInputElement;
    var pass2=document.getElementById("pass2") as HTMLInputElement;
    let logininput=await fetchUserDetails();
    for(var i=0; i<logininput.length; i++)
        {
            if((logininput[i].email==mail2.value)&&(logininput[i].password==pass2.value))
                {
                    flag=false;
                    navbar.style.display="block";
                    alert("Logged Successfully");
                    container.style.display="none";
                    CurrentUser=logininput[i];
                }
        }
    if(flag)
        {
            alert("Invalid Email and Password");
        }
}
function DisplayNone()
{
    home.style.display="none";
    balance.style.display="none"
    recharge.style.display="none";
    travelhistory.style.display="none";
    travel.style.display="none";
    travellocation.style.display="none";
}
function Home()
{
    DisplayNone();
    home.style.display="block";
    home.innerHTML="Welcome "+CurrentUser.username;
}
async function ShowBalance()
{
    DisplayNone();
    balance.style.display="block";
    let userinput=await fetchUserDetails();
    for(var i=0; i<userinput.length; i++)
        {
            if(userinput[i].email==CurrentUser.email)
                {
                    balance.innerHTML="Balance: "+CurrentUser.balance;
                }
        }
}
function Recharge()
{
    DisplayNone();
    recharge.style.display="block";
}
async function TopUp()
{
    var amount=document.getElementById("amount") as HTMLInputElement;
    let userinput=await fetchUserDetails();
    for(var i=0; i<userinput.length; i++)
        {
            if(userinput[i].email==CurrentUser.email)
                {
                    balance.innerHTML="Balance: "+CurrentUser.balance;
                    CurrentUser.balance+=Number(amount.value);
                    updateUser(userinput[i].cardID,CurrentUser);
                    alert("Recharged Successfully");
                }
        }
    
}
async function TravelHistory()
{
    DisplayNone();
    travelhistory.style.display="block";
    var table=document.getElementById("table") as HTMLTableElement;
    table.innerHTML="";
    var row=document.createElement("tr");
    row.innerHTML=`<th>TravelID</th>
    <th>CardNumber</th>
    <th>FromLocation</th>
    <th>ToLocation</th>
    <th>Date</th>
    <th>TravelCost</th>`
    table.appendChild(row);
    
    let travelinput=await fetchTravelDetails();
    for(var i=0; i<travelinput.length; i++)
        {
            if(travelinput[i].cardID==CurrentUser.cardID)
                {
                    var row1=document.createElement("tr");
                    row1.innerHTML=`<td>${travelinput[i].travelID}</td>
                    <td>${travelinput[i].cardID}</td>
                    <td>${travelinput[i].fromLocation}</td>
                    <td>${travelinput[i].toLocation}</td>
                    <td>${travelinput[i].travelDate.split("T")[0].split("-").reverse().join("/")}</td>
                    <td>${travelinput[i].travelCost}</td>`
                    table.appendChild(row1);
                }
        }
    
}
async function Travelling()
{
    DisplayNone()
    travel.style.display="block";
    var table=document.getElementById("table1") as HTMLTableElement
    table.innerHTML="";
    var row=document.createElement("tr");
    row.innerHTML=`<th>TicketID</th>
    <th>FromLocation</th>
    <th>ToLocation</th>
    <th>Fair</th>
    <th>Book</th>`
    table.appendChild(row);
    let bookinginput=await fetchTicketDetails();
    for(var i=0; i<bookinginput.length; i++)
        {
            var row1=document.createElement("tr");
            row1.innerHTML=`<td>${bookinginput[i].ticketID}</td>
            <td>${bookinginput[i].fromLocation}</td>
            <td>${bookinginput[i].toLocation}</td>
            <td>${bookinginput[i].ticketPrice}</td>
            <td><button onclick="Booking(${bookinginput[i].ticketID})">Select</button></td>`
            table.appendChild(row1)
        }
}
function Booking(TicketID:number)
{
    travellocation.style.display="block";
    CurrentTicketID=TicketID;
}
async function Book()
{
    var flag:boolean=true;
    let bookinginput=await fetchTicketDetails();
    for(var i=0; i<bookinginput.length; i++)
        {
            if((bookinginput[i].ticketID==CurrentTicketID)&&(bookinginput[i].fromLocation==fromlocation.value)&&(bookinginput[i].toLocation==tolocation.value))
                {
                    flag=false;
                    if(bookinginput[i].ticketPrice<=CurrentUser.balance)
                        {
                            CurrentUser.balance-=bookinginput[i].ticketPrice;
                            var book:Travel={
                                travelID: 0,
                                cardID: CurrentUser.cardID,
                                fromLocation: bookinginput[i].fromLocation,
                                toLocation: bookinginput[i].toLocation,
                                travelDate: new Date(),
                                travelCost: bookinginput[i].ticketPrice
                            };
                            addTravelDetails(book);
                            alert("Ticket Booked Successfully");
                        }
                    else
                        {
                            alert("Balance is insufficient");
                        }
                }
            
        }
    if(flag)
        {
            alert("Location doesn't exists");
        }

}
async function fetchUserDetails(): Promise<User[]> {
    const apiUrl = 'http://localhost:5084/api/user';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return await response.json();
  }
async function fetchTravelDetails(): Promise<Travel[]> {
    const apiUrl = 'http://localhost:5084/api/travel';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch travel');
    }
    return await response.json();
  }
async function fetchTicketDetails(): Promise<Ticket[]> {
    const apiUrl = 'http://localhost:5084/api/ticket';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch ticket');
    }
    return await response.json();
  }
async function addUserDetails(User: User): Promise<void> {
    const response = await fetch('http://localhost:5084/api/User', {
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

  async function addTravelDetails(Travel: Travel): Promise<void> {
    const response = await fetch('http://localhost:5084/api/Travel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Travel)
    });
    if (!response.ok) {
      throw new Error('Failed to add Travel');
    }
  }

  async function addTicketDetails(Ticket: Ticket): Promise<void> {
    const response = await fetch('http://localhost:5084/api/Ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Ticket)
    });
    if (!response.ok) {
      throw new Error('Failed to add Ticket');
    }
  }

  async function updateUser(id: number, User: User): Promise<void> {
    const response = await fetch(`http://localhost:5084/api/User/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(User)
    });
    if (!response.ok) {
      throw new Error('Failed to update contact');
    }
  }