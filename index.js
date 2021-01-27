let apiKey = "22390b7eb348128aa0ad1d3eb600e604";
// let WEATHER = `http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.latitude}&appid=22390b7eb348128aa0ad1d3eb600e604`;
let cityName = $('.location')
let temperatureValue = $('.temperature')
let weatherCondition =$('.weather')



async function getWeather(location) {
    try{
    const resp = await fetch(location);
    const respData = await resp.json();
    updateTemp(respData)
  }catch(error){
    console.log(error)
  }
  }

  showPosition()

    function showPosition() {
      if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            let WEATHER = `http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=22390b7eb348128aa0ad1d3eb600e604`
              getWeather(WEATHER)
          });
      } else {
          alert("Sorry, your browser does not support HTML5 geolocation.");
      }
  }


  function updateTemp(data){
    let temp =Math.round(data.list[0].main.temp - 273.15)
    if(temp <= 20){
      weatherCondition.text('Cold')
    }else if(temp<40){
      weatherCondition.text('Pleasant')
    }else{
      weatherCondition.text('Hot')
    }
    temperatureValue.text(`${temp}°c`)
    cityName.text(`${data.city.name},${data.city.country}`)
  }

  