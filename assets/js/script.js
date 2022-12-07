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

console.log(cityNameValue);
console.log(cityObj);
console.log(saveCity);

function saveCityName (cityNameValue) {
    let cityObj = {
        name: cityNameValue
    }
    console.log(cityObj);

    let saveCity = JSON.parse(window.localStorage.getItem ("location") || "[]");
    saveCity.push(cityObj);
    console.log(saveCity);

    window.localStorage.setItem("location", JSON.stringify(saveCity));
}

//click on search button

searchBTn.addEventListener("click", () => {
    let cityNameValue = cityName.value.trim();
    console.log(cityNameValue);
    saveCityName(cityNameValue);
})

