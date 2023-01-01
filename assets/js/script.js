
let cityName = document.querySelector('#cityName');
let searchBTn = document.querySelector('#search-btn');
let newCity = document.querySelector('#city-name');
let searchCity = document.querySelector('#search_city');
let city_btn = document.querySelector('#city_btn');
let apiKey = '1151aaa47b533c1e5a2b281eebc6f2a6';


function saveCityName (cityNameValue) {
	let alreadyExist = false;
    let cityObj = {
        name: cityNameValue
    }
    console.log(cityObj);
    let saveCity = JSON.parse(window.localStorage.getItem ("location") || "[]");

		//check if the city is already in the list
		for (let i=0; i< saveCity.length; i++){
			if (cityNameValue == saveCity[i].name){
				alreadyExist = true;
			}
		} 
		if (!alreadyExist){
			saveCity.push(cityObj);	
			saveCity.splice(10);
		}
	
    console.log(saveCity);
    window.localStorage.setItem("location", JSON.stringify(saveCity));

		searchCity.textContent = "";
		saveCity.forEach(name => {
			let btnCityName = document.createElement("button");
			btnCityName. setAttribute('id','city_btn')
			btnCityName.textContent = name.name;
			searchCity.appendChild(btnCityName);	
			newCity.innerHTML = cityNameValue;
			
			//click on buttons with city names
			btnCityName.addEventListener("click", () => {
				let cityNameValue = btnCityName.innerText;
				console.log(btnCityName.innerText);
				console.log(cityNameValue);
				if (cityNameValue) {
					getDataByCityName(cityNameValue);
					getCurrentData (cityNameValue);
					cityName.value = '';
					newCity.innerHTML = cityNameValue;
				} else {
					alert('Please enter a city name');
				}
			});
	});		
}

//click on search button
searchBTn.addEventListener("click", () => {
	let cityNameValue = cityName.value.trim().toLowerCase();
    console.log(cityNameValue);
		
		if (cityNameValue) {
			getDataByCityName(cityNameValue);
			getCurrentData (cityNameValue);
			saveCityName(cityNameValue);
			cityName.value = '';
		} else {
			alert('Please enter a city name');
		}
})

var getDataByCityName = function (name) {
  var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + name + '&appid=1151aaa47b533c1e5a2b281eebc6f2a6';

  fetch(apiUrl)
		.then(function (response){
			if (response.ok) {
				console.log(response);
				response.json().then(function (data){
					console.log(data);
					for (i = 0; i < 5; i++){
						document.querySelector('#day' + (i+1)).innerHTML = dayjs(data.list[i*8].dt_txt).format("MM-DD-YYYY");
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
		.catch(function (error) {      
			alert('Unable to connect to OpenWeather');
    });
};

var getCurrentData = function (name) {
	var apiCurrent = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&appid=1151aaa47b533c1e5a2b281eebc6f2a6&exclude=list';

	fetch(apiCurrent)
		.then(function (response){
			console.log(response);
			response.json().then(function (data){
				console.log(data);
				document.querySelector('#todays-date').innerHTML = dayjs.unix(data.dt).format('MM-DD-YYYY');
				document.querySelector('#today-img').src="http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
				document.querySelector('#today-max').innerHTML = 'Temp: ' +  Number(data.main.temp - 273.15).toFixed(1) + ' °C'
				document.querySelector('#today-wind').innerHTML = 'Wind: ' + Number(data.wind.speed ) + ' MPH'
				document.querySelector('#today-humidity').innerHTML = 'Humidity: ' + Number(data.main.humidity).toFixed(1) + ' %'				
			})
		})
}
