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
        if(data){
        postData('/all',{date:newDate,temp: data.main.temp,usrFeel:usrFeelings.value});
        updateUi();
        }else{
            alert("No Data to be returned");
        }
    })
});

const getWeather = async(baseUrl,newZip,apiKey)=>{
    if(zipCode.value){
    const res = await fetch(baseUrl+newZip+apiKey);
    try{
        const data = await res.json();
        return data;
    }catch(err){
        console.log('error',err);
    }
    }else{
        alert("Please Enter Your ZipCode");
    }
}

const updateUi = async()=>{
    const req = await fetch('/all');
    const allData = await req.json();
    console.log(allData);
    try{
        document.getElementById('date').innerHTML = `<p>Date: ${allData.date}</p>`;
        document.getElementById('temp').innerHTML = `<p>Temp: ${allData.temp}</p>`;
        document.getElementById('content').innerHTML = `<p>Your Feeling: ${allData.usrFeel}</p>`;
    }catch(err){
        console.log('error:' + err);
    }
}