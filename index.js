// DOM ELEMENTS
let result=document.querySelector('#result');
let length=document.querySelector('#length');
let uppercase=document.querySelector('#uppercase');
let lowercase=document.querySelector('#lowercase');
let numbers=document.querySelector('#numbers');
let symbol=document.querySelector('#symbols');
let generate=document.querySelector('#generate');
let clipboard=document.querySelector('#clipboard');
// list of the variables
const randomFunc ={
    lower:getRandomLower,
    upper:getRandomUpper,
    number:getRandomNumber,
    symbol:getRandomSymbol
};
// generate events
clipboard.addEventListener('click',()=>{
    const textarea=document.createElement('textarea');
    const password=result.innerText;
    if(!password){return;
    }
    textarea.value=password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('password copied');
});

generate.addEventListener('click',()=>{
    const lengthD=+length.value;
    const lowerD=lowercase.checked;
    const upperD=uppercase.checked;
    const numberD=numbers.checked;
    const symbolD=symbol.checked;
    result.innerText=generatePassword(
    lowerD,upperD,numberD,symbolD,lengthD);
});
// generate password function
function generatePassword(lower,upper,number,symbol,length){
 let generatepw='';
 const typeCount =lower+upper+number+symbol;
//  console.log('typecount:',typeCount);
 const typeArr=[{lower},{upper},{number},{symbol}].filter(
     item=>Object.values(item)[0]
     );
//  console.log(typeArr)
 if(typeCount===0){
     return '';
 }
 for (let i=0;i<length; i+= typeCount){
  typeArr.forEach(type =>{
    const funcName = Object.keys(type)[0];
    // console.log('funcName:',funcName)
    generatepw += randomFunc[funcName]()
  });   
 }
 const finalPassword=generatepw.slice(0,length)
 return finalPassword;
}
//generator function
function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random()*26 +97));
}
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()*26 +65));
}
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10+48));
}
function getRandomSymbol(){
    const symbols='!@#$%^&*(){}[]=<>?/'
    return symbols[Math.floor(Math.random()*symbols.length)];
}