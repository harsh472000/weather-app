

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;

    messageOne.textContent='loading...';
    messageTwo.textContent=''
    
    fetch('/weather?address='+location)
    .then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error;
        }else{
           /* if(data.weather_descriptions === 'rain' || data.weather_descriptions === 'fog'){
                weatherIcon.className = "wi wi-day-"+data.weather_descriptions;
            }else{
                weatherIcon.className = "wi wi-day-cloudy";
            }*/
            //console.log(data.current.weather_descriptions[0]);
            messageOne.textContent = data.location
            messageTwo.textContent = data.forcast
        }
    })
})
})