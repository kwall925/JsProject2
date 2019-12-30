const init = () => {
  let btn = document.querySelector("#weather-btn");
  btn.addEventListener("click", jsonEvent);
}

const jsonEvent = () => {
let xhr = new XMLHttpRequest();
let url = "http://api.geonames.org/postalCodeSearchJSON";
let params = "?username=kwall925&countryCode=US&postalcode=" + document.querySelector("#zip-input").value;
xhr.open("get", url + params);
xhr.onreadystatechange = () => {
  if(xhr.readyState == 4){
let jsObjectData = JSON.parse(xhr.responseText);
let lattitude = jsObjectData.postalCodes[0].lat;
let longitude = jsObjectData.postalCodes[0].lng;
let coords = {lattitude, longitude};
getWeather(coords);
let city = jsObjectData.postalCodes[0].placeName;
document.querySelector("#city").innerHTML = city + " current conditions:";
  }
}
xhr.send(null);
}

const getWeather = location => {
  let xhr = new XMLHttpRequest();
  let url = `http://api.geonames.org/findNearByWeatherJSON?lat=${location.lattitude}&lng=${location.longitude}&username=kwall925`;
  xhr.open("get", url);
  xhr.onreadystatechange = () => {
    if(xhr.readyState == 4){
      let results = JSON.parse(xhr.responseText);
     let temp = results.weatherObservation.temperature;
     printTemp(temp);
     let wind = results.weatherObservation.windSpeed;
     document.querySelector("#windResult").innerHTML = "Wind: " + wind + " mph";
     if(wind > 15){
       let windimg = document.createElement('img');
       windimg.src = "images/wind.jpg";
       windimg.height = 80;
       document.querySelector("#windy").appendChild(windimg);
     }
    }
  }
  xhr.send(null);
}

const printTemp = cels => {
  let farenheit = Math.round((cels * 9) / 5 + 32);
  document.querySelector("#weatherResult").innerHTML = farenheit + "°";
  document.querySelector("#hotncold").innerHTML = "";
  if (farenheit >= 83){
    let fireimg = document.createElement('img');
    fireimg.src = "images/fire.png";
    fireimg.height = 80;
    document.querySelector("#hotncold").appendChild(fireimg);
  } else if (farenheit <= 34){
    let coolimg = document.createElement('img');
    coolimg.height = 80;
    coolimg.src = "images/snow.jpg";
    document.querySelector("#hotncold").appendChild(coolimg);
  }
}

window.onload = init;
