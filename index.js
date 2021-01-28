let apiKey = "22390b7eb348128aa0ad1d3eb600e604";
let cityName = $('.location')
let celsius = $('.celsius')
let weatherCondition =$('.weather')
let fahrenheit =$('.fahrenheit')
let temperature =$('.temperature')
let iconValue = $('.icon')


temperature.click(function(){
  celsius.toggleClass('hidden')
  fahrenheit.toggleClass('hidden')
})



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
            let WEATHER = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=22390b7eb348128aa0ad1d3eb600e604`
              getWeather(WEATHER)
          });
      } else {
          alert("Sorry, your browser does not support HTML5 geolocation.");
      }
  }


  function updateTemp(data){
    let temp =Math.round(data.list[0].main.temp - 273.15)
    updateSeason(temp)
    showCelsius(temp)
    showfahrenheit(temp)
    showIcon(data)
    cityName.text(`${data.city.name},${data.city.country}`)
  }
   

  function showIcon(icon){
    const icons = `https://openweathermap.org/img/wn/${icon.list[0].weather[0].icon}@2x.png`;
    iconValue.attr('src',icons)
  }
  function showfahrenheit(inFahrenheit){
    let tempInFahrenheit = (inFahrenheit * 9 / 5) + 32
    fahrenheit.text(`${tempInFahrenheit}°F`)
  }

  function showCelsius(inCelsius){
    celsius.text(`${inCelsius}°C`)
  }

  function updateSeason(season){
    if(season <= 20){
      weatherCondition.text('Cold')
    }else if(season<40){
      weatherCondition.text('Pleasant')
    }else{
      weatherCondition.text('Hot')
    }
  }

  