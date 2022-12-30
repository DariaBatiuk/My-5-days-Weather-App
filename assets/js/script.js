
let cityName = document.querySelector('#cityName');
let searchBTn = document.querySelector('#search-btn');
let newCity = document.querySelector('#city-name');
let searchCity = document.querySelector('#search_city');
//let day = document.querySelector('#day');

// fetch(`http://api.openweathermap.org/data/2.5/forecast?q=' + cityName.value + '&cnt=5&appid=1151aaa47b533c1e5a2b281eebc6f2a6`)
// .then(function (resp) {return resp.json() }) //convert data to json
// .then(function(data) {
//     console.log(data);
// })
// .catch(function () {
//     //catch any errors
// });

function saveCityName (cityNameValue) {
    let cityObj = {
        name: cityNameValue
    }
    console.log(cityObj);

    let saveCity = JSON.parse(window.localStorage.getItem ("location") || "[]");
		
    saveCity.push(cityObj);		
		// saveCity.slice(0, 9);
		saveCity.splice(10);
    console.log(saveCity);

    window.localStorage.setItem("location", JSON.stringify(saveCity));

		searchCity.textContent = "";
		saveCity.forEach(name => {
			newCity.innerHTML = name.name;	
			let btnCityName = document.createElement("button");
			btnCityName.textContent = name.name;
			searchCity.appendChild(btnCityName);					
	});		
}

//click on search button
searchBTn.addEventListener("click", () => {
    let cityNameValue = cityName.value.trim();
    console.log(cityNameValue);
    saveCityName(cityNameValue);
		

		if (cityNameValue) {
			getDataByCityName(cityNameValue);
			getCurrentData (cityNameValue);
	
			//repoContainerEl.textContent = '';
			cityName.value = '';
		} else {
			alert('Please enter a city name');
		}
})

//let apiKey = api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=1151aaa47b533c1e5a2b281eebc6f2a6

var getDataByCityName = function (name) {
  var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + name + '&appid=1151aaa47b533c1e5a2b281eebc6f2a6&exclude=list';

  fetch(apiUrl)
		.then(function (response){
			if (response.ok) {
				console.log(response);
				response.json().then(function (data){
					console.log(data);
					for (i = 0; i < 5; i++){
						document.querySelector('#day' + (i+1)).innerHTML = data.list[i*8].dt_txt
						document.querySelector('#max' + (i+1)).innerHTML = 'Temp: ' + Number(data.list[i*8].main.temp - 273.15).toFixed(1) + ' °C'
						document.querySelector('#wind' + (i+1)).innerHTML = 'Wind: ' + Number(data.list[i*8].wind.speed ) + ' MPH'
						document.querySelector('#humidity' + (i+1)).innerHTML = 'Humidity: ' + Number(data.list[i*8].main.humidity).toFixed(1) + ' %'
						document.querySelector('#weather-img' + (i+1)).src="http://openweathermap.org/img/wn/" + data.list[i*8].weather[0].icon + ".png"
						
						
					}
				});
			} else {
				alert('Error:');
			}
		})
		// .then((data) =>{
			
		// })
		.catch(function (error) {
      //check this later
			//alert('Unable to connect to OpenWeather');
    });
};

var getCurrentData = function (name) {
	var apiCurrent = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&appid=1151aaa47b533c1e5a2b281eebc6f2a6&exclude=list';

	fetch(apiCurrent)
		.then(function (response){
			console.log(response);
			response.json().then(function (data){
				console.log(data);
				document.querySelector('#todays-date').innerHTML = data.dt_txt
				document.querySelector('#today-img').src="http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
				document.querySelector('#today-max').innerHTML = 'Temp: ' +  Number(data.main.temp - 273.15).toFixed(1) + ' °C'
				document.querySelector('#today-wind').innerHTML = 'Wind: ' + Number(data.wind.speed ) + ' MPH'
				document.querySelector('#today-humidity').innerHTML = 'Humidity: ' + Number(data.main.humidity).toFixed(1) + ' %'				
			})
		})
}
