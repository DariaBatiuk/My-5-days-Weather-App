fetch('http://api.openweathermap.org/geo/1.0/direct?q=Atlanta&limit=5&appid=1151aaa47b533c1e5a2b281eebc6f2a6')
.then(function (resp) {return resp.json() }) //convert data to json
.then(function(data) {
    console.log(data);
})
.catch(function () {
    //catch any errors
});