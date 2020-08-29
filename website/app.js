/* Global Variables */
let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&APPID=c64a8ea0f974133b55edec5cbb83cb2f';
const btn = document.getElementById('generate');
const usrFeelings = document.getElementById('feelings');
const zipCode = document.getElementById('zip');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//--------------------------------------------------------
const postData = async (url = '', data = {})=>{
    const res = await fetch(url,{
        method: 'Post',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    try{
        const newData = await res.json();
        console.log(`new Data : ${newData}`);
        return newData;
    }catch(err){
        console.log("error",err);
    }
}
//----------------------------------------------------------
btn.addEventListener("click",()=>{
    let newZip = zipCode.value;
    getWeather(baseUrl,newZip,apiKey)
    .then((data)=>{
        postData('/all',{date:newDate,temp: data.main.temp,usrFeel:usrFeelings.value});
    }).then(
        updateUi
    );
    
});

const getWeather = async(baseUrl,newZip,apiKey)=>{
    const res = await fetch(baseUrl+newZip+apiKey);
    try{
        const data = await res.json();
        return data;
    }catch(err){
        console.log('error',err);
    }
}

const updateUi = async()=>{
    const req = await fetch('/all');
    try{
        const allData = await req.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.usrFeel;
    }catch(err){
        console.log('error:' + err);
    }
}