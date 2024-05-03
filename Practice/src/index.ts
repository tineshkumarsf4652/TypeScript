//Basic Types
let id:number = 7;
let company:string='Code Typescript';
let isCompanyOpen: boolean =true;
let x:any;
let ids: number[] = [1,2,3,4,5];
ids.push(8);
let x1:any[] = [1,'d',true];

//Tuples
let employee:[number,string,boolean] = [1,"Vijay",true];

//Tuple array
let employees:[number,string,boolean][]=[
    [1,"Vijay",true],
    [2,"Ajith",true],
    [3,"Dhoni",false]
]

//Union
let eid:string | number |boolean;
eid=7;
eid="roll1";
eid=true;

//Enum
enum direction{
    up = 5,
    down,
    left,
    right
}
console.log(direction.left);
enum direction1{
    up = 'up',
    down='down',
    left='left',
    right='right'
}
console.log(direction1.left);

//Object 
type userType={
    id:number,
    name:string
}
let User: userType={
    id:7,
    name:"Ronaldo"
}

//type assert
let x3: any=7;
let compId = x3 as number;
// let compId=<number>x3;

//Function
//with return
function doMath(a:number,b:number):number
{
    return a+b;
}
console.log(doMath(4,3));
//without return
function logI(x:string|number):void
{
    if(typeof x=== 'number') console.log("Hi Number");
    if(typeof x=== 'string') console.log("Hi String");
}
logI("Hi");

//Interface
interface userType1{
    readonly id:number,
    name:string,
    //age:number;
    age?:number; //optional
}
let User1: userType1={
    id:7,
    name:"Ronaldo"
}
//User1.id=9; //doesn't assign because it is readonly

//Duobt
interface MathFunc{
    (x:number,y:number):number
}
const add:MathFunc=(x:number,y:number)=>x+y
const sub:MathFunc=(x:number,y:number)=>x-y

//Class
class Person{
    id:number;
    name: string;

    constructor(id:number,name:string)
    {
        this.id=id;
        this.name=name;
    }
}
const temp=new Person(7,"Ronaldo");
const temp2=new Person(10,"Messi");

console.log(temp,temp2);