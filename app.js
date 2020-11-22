window.addEventListener('load', () => {
    //longitude e latitude
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let locationIcon = document.querySelector(".location-icon");
    const temperatureSection = document.querySelector(".degree-section");
    const temperatureSpan = document.querySelector(".degree-section span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            //definindo as coordenadas
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //const proxy = 'http://cors-anywhere.herokuapp.com/';
            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&lang=pt&units=metric&appid={API KEY}`; // preferences from https://openweathermap.org/

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temp } = data.current;
                    const descitption = data.current.weather[0].description;
                    const tempicon = data.current.weather[0].icon;

                    //formula to farenheirt
                    let fanh = (temp * 9 / 5) + 32;

                    //set dom elements from api
                    temperatureDegree.textContent = Math.floor(temp);
                    temperatureDescription.textContent = descitption.toUpperCase();
                    locationTimezone.textContent = data.timezone;
                    locationIcon.src = `http://openweathermap.org/img/wn/${tempicon}@2x.png`;

                    //change temperature to celsius/farenheirt
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "C") {
                            temperatureSpan.textContent = "F"
                            temperatureDegree.textContent = Math.floor(fanh);
                        } else {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(temp);
                        }
                    });
                });
        });
    }

});
