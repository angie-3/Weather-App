function getWeather(){

    let apiKey = apiFetch();


    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    } 

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
    .catch(error => {
        console.error('Error fetching current weather data:', error);
        alert('Error fetching current weather data. Pleae try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });

        // function displayWeather(data){
        //     const tempDivInfo = document.getElementById('temp-div');
        //     const weatherInfoDiv = document.getElementById('weather-info');
        //     const weatherIcon = document.getElementById('weather-icon');
        //     const hourlyForecastDiv = document.getElementById('hourly-forecast');

        //     //Clear previous content
        //     weatherInfoDiv.innerHTML = '';
        //     hourlyForecastDiv.innerHTML = '';
        //     tempDivInfo.innerHTML = '';
        // }
        // copy and pasted the same variables into the other display weather function that was a duplicate of this

        function displayWeather(data){

            if(data.cod ==='404'){
                weatherInfoDiv.innerHTML = `<p>${data.message}<p>`;
            } else {

                const tempDivInfo = document.getElementById('temp-div');
                const weatherInfoDiv = document.getElementById('weather-info');
                const weatherIcon = document.getElementById('weather-icon');
               // see if we need this
                // const hourlyForecastDiv = document.getElementById('hourly-forecast');
                // not needed here 
    

                //Clear previous content
                weatherInfoDiv.innerHTML = '';
                tempDivInfo.innerHTML = '';
                const cityName = data.name;
                const temperature = Math.round(data.main.temp);
                const description = data.weather[0].description;
                const iconCode = data.weather[0].icon;
                // const iconUrl = `https://openweathermap.org/img/wn${iconCode}@4x.png`; forgot a slash
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

                const temperatureHTML =`
                    <p>${temperature}°F</p>
                    `;

                    const weatherHtml = `
                    <p>${cityName}</p>
                    <p>${description}</p>
                    `;
                weatherInfoDiv.innerHTML = weatherHtml;
                tempDivInfo.innerHTML = temperatureHTML;
                weatherIcon.src = iconUrl

                    // showImage(); got rid of the function as it wasnt needed
            }
                // function displayHourlyForecast(hourlyData){
                //     const hourlyForecastDiv = document.getElementById('hourly-forecast');
                //     const next24Hours = hourlyData.slice(0, 8);
                    
                //     next24Hours.forEach(item => {
                //         const dateTime = new Date(item.dt * 1000);
                //         const hour = dateTime.getHours();
                //         const temperature = Math.round(item.main.temp - 273.15);
                //         const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

                //         const hourlyItemHtml = `
                //         <div class="hourly-item"> 
                //             <span>${hour}:00</span>
                //             <img src="${iconUrl}" alt="Hourly Weather Icon">
                //             <span>${temperature}°C</span>
                //             </div>
                //             `;
                //             hourlyForecastDiv.innerHTML += hourlyItemHtml;
                //     });
                // function showImage(){
                //     const weatherIcon = document.getElementById('weather-icon');
                //     weatherIcon.style.display = `block`;
                // }
                // }
                // Nested function , and unnecessary show image call 
        }
        function displayHourlyForecast(hourlyData){
                const hourlyForecastDiv = document.getElementById('hourly-forecast');
                const next24Hours = hourlyData.slice(0, 8);
                
                next24Hours.forEach(item => {
                    const dateTime = new Date(item.dt * 1000);
                    const hour = dateTime.getHours();
                    const temperature = Math.round(item.main.temp);
                    console.log(hourlyData)
                    const iconCode = item.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

                    const hourlyItemHtml = `
                    <div class="hourly-item"> 
                        <span>${hour}:00</span>
                        <img src="${iconUrl}" alt="Hourly Weather Icon">
                        <span>${temperature}°F</span>
                        </div>
                        `;
                        hourlyForecastDiv.innerHTML += hourlyItemHtml;
                });
    
        }
    }
        