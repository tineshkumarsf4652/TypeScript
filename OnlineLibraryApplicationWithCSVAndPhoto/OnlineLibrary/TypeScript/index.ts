let CurrentUser:UserInfo;
let CurrentBookID:number;
let CurrentUserID:number;
let CurrentBook:BookInfo;

let fineamount:number=0;

interface UserInfo{
    userID:any;
    userName:string;
    mailID:string;
    password:string
    gender:string;
    department:string;
    mobileNumber:string;
    balance:number;
    photo:string[];
}

interface BookInfo{
    bookID:any;
    bookName:string;
    authorName:string;
    bookCount:number;
}

interface BorrowInfo{
    borrowID:any;
    bookID:number;
    userID:number;
    borrowedDate:any;
    borrowBookCount:number;
    status:string;
    paidFineAmount:number;
}

var signin=document.getElementById('signin') as HTMLDivElement;
var signup=document.getElementById('signup') as HTMLDivElement;
var navbar=document.getElementById("nav") as HTMLDivElement;
let home=document.getElementById("home") as HTMLDivElement;
let borrow=document.getElementById("borrow") as HTMLDivElement;
let topup=document.getElementById("deposit") as HTMLDivElement;
let balance1=document.getElementById("balance1") as HTMLDivElement;
let quantitybox=document.getElementById("quantity-block") as HTMLDivElement;
let borrowhistory=document.getElementById("history") as HTMLDivElement;
let returnbook=document.getElementById("return") as HTMLDivElement;

/*let editingId:number;
let photoInput=document.getElementById("fileInput") as HTMLInputElement;
let form=document.getElementById("fileInput") as HTMLInputElement;
let nameInput=document.getElementById("fileInput") as HTMLInputElement;
let emailID=document.getElementById("fileInput") as HTMLInputElement;
let pass=document.getElementById("fileInput") as HTMLInputElement;
let gender=document.getElementById("fileInput") as HTMLInputElement;
let depart=document.getElementById("fileInput") as HTMLInputElement;
let mobileNumber=document.getElementById("fileInput") as HTMLInputElement;
let walletBalance=document.getElementById("fileInput") as HTMLInputElement;*/

//const selectElement=document.getElementById("multiSelect") as HTMLSelectElement;

/*form.addEventListener("submit",(event)=>{
  event.preventDefault();
  const name=nameInput.value.trim();
  const email=emailID.value.trim();
  const file=photoInput.files?.[0];
  const passwd=pass.value.trim();
  const gender1=gender.value.trim();
  const depart1=depart.value.trim();
  const mobile=mobileNumber.value.trim();
  const wallet=walletBalance.value.trim();
  const reader=new FileReader();

  reader.onload=function(event){
    const base64String =event.target?.result as string;

    if(editingId!==0)
      {
          const user1:UserInfo={
            userID: editingId,
            userName: name,
            mailID: email,
            password: passwd,
            gender: gender1,
            department: depart1,
            mobileNumber: mobile,
            balance: Number(wallet),
            photo: [base64String]
          }
          addUserDetails(user1);
      }
  }
}
);*/

function ClickSignIn()
{
    signin.style.display="block";
    signup.style.display="none";
}

function ClickSignUp()
{
    signup.style.display="block";
    signin.style.display="none";
}

async function SignUp()
{
    let flag:boolean=true;
    let editingId:number=0;
    let photoInput=document.getElementById("fileInput") as HTMLInputElement;
    //let form=document.getElementById("fileInput") as HTMLInputElement;
    var name=document.getElementById("name") as HTMLInputElement;
    var mail=document.getElementById("mail") as HTMLInputElement;
    var pass=document.getElementById("pass") as HTMLInputElement;
    var gender=document.getElementById("gender") as HTMLInputElement;
    var department=document.getElementById("depart") as HTMLInputElement;
    var mobile=document.getElementById("mobile") as HTMLInputElement;
    let signupinput=await fetchUserDetails();


      const name1=name.value.trim();
      const email=mail.value.trim();
      const file=photoInput.files?.[0];
      const passwd=pass.value.trim();
      const gender1=gender.value.trim();
      const depart=department.value.trim();
      const phone=mobile.value.trim();
    
        if(file)
          {
              const reader=new FileReader();
              reader.onload=function(event){
              const base64String =event.target?.result as string;
              const user1:UserInfo={
                userID: editingId,
                userName: name1,
                mailID: email,
                password: passwd,
                gender: gender1,
                department: depart,
                mobileNumber: phone,
                balance: 0,
                photo: [base64String]
              }
              addUserDetails(user1);
              ClickSignIn();
          }
          reader.readAsDataURL(file);
      }

      for(var i=0; i<signupinput.length; i++)
        {
            if(signupinput[i].mailID==mail.value)
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
                mailID: mail.value,
                password: pass.value,
                gender: gender.value,
                department: department.value,
                mobileNumber: mobile.value,
                balance: 0,
                photo:[],
            }
            addUserDetails(user);
            CurrentUser=user;
            alert("SignUp Successsfully Completed");
            ClickSignIn();
        }

    }

async function SignIn()
{
    var flag:boolean=true;
    var mail1=document.getElementById("mail1") as HTMLInputElement;
    var pass1=document.getElementById("pass1") as HTMLInputElement;
    var container=document.getElementById("container") as HTMLDivElement;
    let sigininput=await fetchUserDetails();
    for(var i=0; i<sigininput.length; i++)
        {
            if((sigininput[i].mailID==mail1.value)&&(sigininput[i].password==pass1.value))
                {
                    flag=false;
                    container.style.display="none";
                    CurrentUser=sigininput[i];
                    alert("SignUp Successfully Completed");
                    navbar.style.display="block";
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
    borrow.style.display="none";
    quantitybox.style.display="none";
    borrowhistory.style.display="none";
    topup.style.display="none";
    balance1.style.display="none";
    returnbook.style.display="none";
}

function Home()
{
    DisplayNone();
    home.style.display="block";
    home.innerHTML="Welcome "+CurrentUser.userName;
    let img=document.getElementById("img") as HTMLImageElement;
    img.src=CurrentUser.photo[0];
}

async function BorrowBook()
{
    DisplayNone();
    borrow.style.display="block";
    var table=document.getElementById("table") as HTMLTableElement;
    table.innerHTML="";
    var row=document.createElement("tr");
    row.innerHTML=`<th>BookID</th>
    <th>BookName</th>
    <th>AuthorName</th>
    <th>BookCount</th>
    <th>Borrow</th>`
    table.appendChild(row);
    let bookinput=await fetchBookDetails();
    for(var i=0; i<bookinput.length; i++)
      {
          var row1=document.createElement("tr");
          row1.innerHTML=`<td>${bookinput[i].bookID}</td>
          <td>${bookinput[i].bookName}</td>
          <td>${bookinput[i].authorName}</td>
          <td>${bookinput[i].bookCount}</td>
          <td><button onclick="Taken('${bookinput[i].bookID}')">Select</button></td>`
          table.appendChild(row1);
      }
}

function Taken(BookID:number)
{
    CurrentBookID=BookID;
    quantitybox.style.display="block";
}

async function TakenBook()
{
    var flag:boolean=true;
    var bookcount=document.getElementById("quantity") as HTMLInputElement;
    let book2input = await fetchBookDetails();
    let borrowinput = await fetchBorrowDetails();
    for(var i=0; i<book2input.length; i++)
      {
          if(book2input[i].bookID==CurrentBookID)
            {
                CurrentBook=book2input[i];
                if(book2input[i].bookCount>=Number(bookcount.value))
                  {
                      for(var i=0; i<borrowinput.length; i++)
                        {
                            if(borrowinput[i].userID==CurrentUser.userID)
                              {
                                  if(borrowinput[i].borrowBookCount==3)
                                    {
                                        alert("You have borrowed 3 books already");
                                        flag=false;
                                    }
                                  else if(Number(bookcount.value)>3 && borrowinput[i].borrowBookCount>3)
                                    {
                                        alert(`You can have maximum of 3 borrowed books. Your already borrowed books count is ${borrowinput[i].borrowBookCount} and requested count ${bookcount.value}, which exceed 3`);
                                        flag=false;
                                    }
                              }
                        }
                      if(flag)
                        {
                            var newborrow: BorrowInfo={
                              borrowID: 0,
                              bookID: CurrentBookID,
                              userID: CurrentUser.userID,
                              borrowedDate: new Date(),
                              borrowBookCount: Number(bookcount.value),
                              status: "Borrowed",
                              paidFineAmount: 0
                            };
                            addBorrowDetails(newborrow);
                            book2input[i].bookCount -= Number(bookcount.value);
                            updateBookDetails(book2input[i].bookID,book2input[i]);
                            alert("Book Borrowed Successfully");
                            BorrowBook();
                        }
                  }
                else
                {
                    alert("Book are not available for selected count");
                    for(var i=0; i<borrowinput.length; i++)
                      {
                          if(borrowinput[i].bookID==CurrentBookID)
                            {
                                var result = new Date(borrowinput[i].borrowedDate);
                                result.setDate(result.getDate()+15);
                                var strDate = String(result);
                                var availabledate=strDate.split("T")[0].split("-").reverse().join("/");
                                alert(`The book will be available on ${availabledate}`);
                            }
                      }
                }
            }
      }
}

async function BorrowedHistory()
{
    DisplayNone();
    borrowhistory.style.display="block";
    var table2=document.getElementById("table2") as HTMLTableElement;
    table2.innerHTML="";
    var row=document.createElement("tr");
    row.innerHTML=`<th>BorrowID</th>
    <th>BookID</th>
    <th>UserID</th>
    <th>BorrowedDate</th>
    <th>BorrowBookCount</th>
    <th>Status</th>
    <th>PaidFineAmount</th>`
    table2.appendChild(row);
    let borrowlist=await fetchBorrowDetails();
    for(var i=0; i<borrowlist.length; i++)
      {
          var row1=document.createElement("tr");
          row1.innerHTML=`<td>${borrowlist[i].borrowID}</td>
          <td>${borrowlist[i].bookID}</td>
          <td>${borrowlist[i].userID}</td>
          <td>${borrowlist[i].borrowedDate.split("T")[0].split("-").reverse().join("/")}</td>
          <td>${borrowlist[i].borrowBookCount}</td>
          <td>${borrowlist[i].status}</td>
          <td>${borrowlist[i].paidFineAmount}</td>`
          table2.appendChild(row1);
      }
}

async function ReturnBook()
{
    DisplayNone();
    returnbook.style.display="block";
    var table3=document.getElementById("table3") as HTMLTableElement;
    table3.innerHTML="";
    var row=document.createElement("tr");
    row.innerHTML=`<th>BorrowID</th>
    <th>BookID</th>
    <th>UserID</th>
    <th>BorrowedDate</th>
    <th>BorrowBookCount</th>
    <th>Status</th>
    <th>PaidFineAmount</th>
    <th>ReturnDate</th>
    <th>FineAmount</th>
    <th>Return</th>`
    table3.appendChild(row);
    let borrowinput=await fetchBorrowDetails();
    for(var i=0; i<borrowinput.length; i++)
    {
        if(CurrentUser.userID==borrowinput[i].userID && (borrowinput[i].status=="Borrowed"))
          {
              var currentdate=new Date();
              var borrowdate=new Date(borrowinput[i].borrowedDate);
              var result=new Date(borrowinput[i].borrowedDate);
              result.setDate(result.getDate()+15);
              var diff=Math.abs(currentdate.getTime()-borrowdate.getTime());
              var diffdays=Math.ceil(diff/(1000*3600*24));
              if(diffdays>15)
                {
                    fineamount=(diffdays*1)-15;
                }
              var year=result.getFullYear();
              var month=result.getMonth()+1;
              var date=result.getDate();
              var returndate=`${date}/${month}/${year}`;
              console.log(returndate);
              var row1=document.createElement("tr");
              row1.innerHTML=`<td>${borrowinput[i].borrowID}</td>
              <td>${borrowinput[i].bookID}</td>
              <td>${borrowinput[i].userID}</td>
              <td>${borrowinput[i].borrowedDate.split("T")[0].split("-").reverse().join("/")}</td>
              <td>${borrowinput[i].borrowBookCount}</td>
              <td>${borrowinput[i].status}</td>
              <td>${borrowinput[i].paidFineAmount}</td>
              <td>${returndate}</td>
              <td>${fineamount}</td>
              <td><button onclick="ReturnBorrow(${borrowinput[i].borrowID})">Return</button></td>`
              table3.appendChild(row1);
          }
    }
}

async function ReturnBorrow(BorrowID:Number)
{
    var newdiffdays:number=0;
    let borrow2input=await fetchBorrowDetails();
    for(var i=0; i<borrow2input.length; i++)
      {
          if(CurrentUser.userID==borrow2input[i].userID && borrow2input[i].status=="Borrowed")
            {
                var currentdate=new Date();
                var borrowdate=new Date(borrow2input[i].borrowedDate);
                var result=new Date(borrow2input[i].borrowedDate);
                result.setDate(result.getDate()+15);
                var diff=Math.abs(currentdate.getTime()-borrowdate.getTime());
                newdiffdays=Math.ceil(diff/(1000*3600*24));
            }
      }
    if(newdiffdays>15)
      {
          if(CurrentUser.balance>=fineamount)
            {
                for(var i=0; i<borrow2input.length; i++)
                  {
                      if(borrow2input[i].borrowID==BorrowID)
                        {
                            var borrowadd:BorrowInfo={
                              borrowID: BorrowID,
                              bookID: borrow2input[i].bookID,
                              userID: CurrentUser.userID,
                              borrowedDate: borrow2input[i].borrowedDate,
                              borrowBookCount: borrow2input[i].borrowBookCount,
                              status: "Returned",
                              paidFineAmount: fineamount
                            };
                            addBorrowDetails(borrowadd);
                            alert("Book Returned successfully after paid fine amount");
                            ReturnBook();
                            CurrentUser.balance-=fineamount;
                            updateUserDetails(CurrentUser.userID,CurrentUser);
                            CurrentBook.bookCount+=borrow2input[i].borrowBookCount;
                            updateBookDetails(CurrentBookID,CurrentBook);
                        }
                  }
            }
          else
          {
              alert("Insufficient balance to pay amount");
          }
      }
    else
    {
        for(var i=0; i<borrow2input.length; i++)
          {
              if(borrow2input[i].borrowID==BorrowID)
                {
                    var borrowupdate:BorrowInfo={
                      borrowID: BorrowID,
                      bookID: borrow2input[i].bookID,
                      userID: CurrentUser.userID,
                      borrowedDate: borrow2input[i].borrowedDate,
                      borrowBookCount: borrow2input[i].borrowBookCount,
                      status: "Returned",
                      paidFineAmount: 0
                    }
                    addBorrowDetails(borrowupdate);
                    alert("Book Returned successfully");
                    ReturnBook();
                    CurrentBook.bookCount+=borrow2input[i].borrowBookCount;
                    updateBookDetails(CurrentBookID,CurrentBook);
                }
          }
    }
}

function TopUp()
{
    DisplayNone();
    topup.style.display="block";
}

async function Recharge()
{
    var recharge=document.getElementById("recharge") as HTMLInputElement;
    CurrentUser.balance+=Number(recharge.value);
    updateUserDetails(CurrentUser.balance,CurrentUser);
}

async function ShowBalance()
{
    DisplayNone();
    balance1.style.display="block";
    balance1.innerHTML="Balance: "+CurrentUser.balance;
}

function downloadborrowhistory()
{
    let csv_data:any =[];
    let rows=document.querySelectorAll("#table2 tr");
    for(let i=0; i<rows.length; i++)
      {
          let cols=rows[i].querySelectorAll('td,th');
          let csvrow:any=[];
          for(let j=0; j<cols.length; j++)
            {
                csvrow.push(cols[j].innerHTML)
            }
            csv_data+=(csvrow.join(",")+"\n");
      }
      downloadCSVFile(csv_data);
      alert("downloaded");
}

function downloadCSVFile(csvData:any)
{
    let CSVFile=new Blob([csvData], {type:"text//csv"});
    let temp_link=document.createElement('a');

    temp_link.download="BorrowHistory.csv";
    let url=window.URL.createObjectURL(CSVFile);

    temp_link.href=url;
    temp_link.style.display="none";
    document.body.appendChild(temp_link);

    temp_link.click();
    document.body.removeChild(temp_link);
}

async function fetchUserDetails(): Promise<UserInfo[]> {
    const apiUrl = 'http://localhost:5102/api/User';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return await response.json();
  }

async function fetchBookDetails(): Promise<BookInfo[]> {
    const apiUrl = 'http://localhost:5102/api/Book';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch Book');
    }
    return await response.json();
  }


async function fetchBorrowDetails(): Promise<BorrowInfo[]> {
    const apiUrl = 'http://localhost:5102/api/Borrow';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch Borrow');
    }
    return await response.json();
  }

async function addUserDetails(User: UserInfo): Promise<void> {
    const response = await fetch('http://localhost:5102/api/User', {
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

async function addBookDetails(Book: BookInfo): Promise<void> {
    const response = await fetch('http://localhost:5102/api/Book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Book)
    });
    if (!response.ok) {
      throw new Error('Failed to add Book');
    }
  }

async function addBorrowDetails(Borrow: BorrowInfo): Promise<void> {
    const response = await fetch('http://localhost:5102/api/Borrow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Borrow)
    });
    if (!response.ok) {
      throw new Error('Failed to add Borrow');
    }
  }

async function updateUserDetails(id: number, User: UserInfo): Promise<void> {
    const response = await fetch(`http://localhost:5102/api/User/${id}`, {
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

async function updateBookDetails(id: number, Book: BookInfo): Promise<void> {
    const response = await fetch(`http://localhost:5102/api/Book/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Book)
    });
    if (!response.ok) {
      throw new Error('Failed to update Book');
    }
  }
  
async function updateBorrowDetails(id: number, Borrow: BorrowInfo): Promise<void> {
    const response = await fetch(`http://localhost:5102/api/Order/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Borrow)
    });
    if (!response.ok) {
      throw new Error('Failed to update Borrow');
    }
  }

async function deleteBookDetails(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5102/api/Medicine/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete Book');
    }
  }