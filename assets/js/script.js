// fetch('http://api.openweathermap.org/geo/1.0/direct?q=Atlanta&limit=5&appid=1151aaa47b533c1e5a2b281eebc6f2a6')
// .then(function (resp) {return resp.json() }) //convert data to json
// .then(function(data) {
//     console.log(data);
// })
// .catch(function () {
//     //catch any errors
// });

let cityName = document.querySelector('#cityName');
let searchBTn = document.querySelector('#search-btn');
let newCity = document.querySelector('#city-name');


function saveCityName (cityNameValue) {
    let cityObj = {
        name: cityNameValue
    }
    console.log(cityObj);

    let saveCity = JSON.parse(window.localStorage.getItem ("location") || "[]");
    saveCity.push(cityObj);
    console.log(saveCity);

    window.localStorage.setItem("location", JSON.stringify(saveCity));

    //newCity.innerHTML = saveCityName.name.value;
    // let divCityName = document.createElement("div");
    // divCityName.textContent = saveCity.name.value;
    // newCity.appendChild(divCityName);

    // function addCityName (saveCity) {
    //     let divCityName = document.createElement("li");
    //     divCityName.textContent = saveCity.name;
    //     newCity.appendChild(divCityName);
    // };
    // addCityName()

    // saveCity.forEach(name => {
    //     let divCityName = document.createElement("li");
    //     divCityName.textContent = name.name;
    //     newCity.appendChild(divCityName)
    // });

		saveCity.forEach(name => {
			// newCity.innerHTML = "";
			// let divCityName = document.createElement("div");
			// divCityName.textContent = name.name;
			// newCity.appendChild(divCityName)

			newCity.innerHTML = name.name;

			// let divCityName = document.createElement("div");
			// divCityName.textContent = name.name;
			// newCity.appendChild(divCityName)
	});
}

//click on search button

searchBTn.addEventListener("click", () => {
    let cityNameValue = cityName.value.trim();
    console.log(cityNameValue);
    saveCityName(cityNameValue);
})

