"use strict";
//Basic Types
let id = 7;
let company = 'Code Typescript';
let isCompanyOpen = true;
let x;
let ids = [1, 2, 3, 4, 5];
ids.push(8);
let x1 = [1, 'd', true];
//Tuples
let employee = [1, "Vijay", true];
//Tuple array
let employees = [
    [1, "Vijay", true],
    [2, "Ajith", true],
    [3, "Dhoni", false]
];
//Union
let eid;
eid = 7;
eid = "roll1";
eid = true;
//Enum
var direction;
(function (direction) {
    direction[direction["up"] = 5] = "up";
    direction[direction["down"] = 6] = "down";
    direction[direction["left"] = 7] = "left";
    direction[direction["right"] = 8] = "right";
})(direction || (direction = {}));
console.log(direction.left);
var direction1;
(function (direction1) {
    direction1["up"] = "up";
    direction1["down"] = "down";
    direction1["left"] = "left";
    direction1["right"] = "right";
})(direction1 || (direction1 = {}));
console.log(direction1.left);
let User = {
    id: 7,
    name: "Ronaldo"
};
//type assert
let x3 = 7;
let compId = x3;
// let compId=<number>x3;
//Function
//with return
function doMath(a, b) {
    return a + b;
}
console.log(doMath(4, 3));
//without return
function logI(x) {
    if (typeof x === 'number')
        console.log("Hi Number");
    if (typeof x === 'string')
        console.log("Hi String");
}
logI("Hi");
let User1 = {
    id: 7,
    name: "Ronaldo"
};
const add = (x, y) => x + y;
const sub = (x, y) => x - y;
//Class
class Person {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
const temp = new Person(7, "Ronaldo");
const temp2 = new Person(10, "Messi");
console.log(temp, temp2);
