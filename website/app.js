/* Global Variables */
let baseUrl = 'api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&APPID=c64a8ea0f974133b55edec5cbb83cb2f';
const btn = document.getElementById('generate');

const usrFeelings = document.getElementById('feelings');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//--------------------------------------------------------
const postData = async (url = '', data = {})=>{
    console.log(data);
    const res = await fetch(url,{
        method: 'Post',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    try{
        const newData = await res.json();
        console.log(newData);
        return newData;
    }catch(err){
        console.log("error",err);
    }
}
let zipCode = document.getElementById('zip');
btn.addEventListener('click',()=>{

    console.log(zipCode);
    postData("/all",{msg:"Hello form the client side",date:newDate});
});