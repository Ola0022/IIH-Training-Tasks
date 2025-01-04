// بتفلتر الارري بناءا على شرط معين
let ages = [18, 25, 14, 30, 12];
let adults = ages.filter(age => age >= 18);
console.log(adults); 


//  بترجع العنصر اللي بحقق الشرط
let myFriuts = ['apple', 'banana', 'orange'];
let findFruit = myFriuts.find(item => item=='banana');
console.log(findFruit);  


// بترجع اندكس اول عنصر بحقق الشرط
let myNumbers = [50, 70, 90, 40];
let index = myNumbers.findIndex(score => score > 80);
console.log(index);  


//  بتشيك لو في ع الاقل عنصر واحد بحقق الشرط
let myNumbers2 = [1, 3, 5, 7];
let evenNum = myNumbers2.some(num => num % 2 === 0);
console.log(evenNum);


// بتشيك لو كل العناصر بحففوا الشرط او لا 
let numbers = [2, 4, 6, 8];
let areAllEven = numbers.every(num => num % 2 === 0);
console.log(areAllEven);


// بشيك لو الارري فيها عنصر معين او لا
let fruits = ['apple', 'banana', 'orange'];
console.log(fruits.includes('banana'));  // true
console.log(fruits.includes('grape'));   // false
