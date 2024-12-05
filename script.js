const apiKey = "01caf6ab4db54c01c9f28fff6ab535e7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search_bar input");
const searchBtn = document.querySelector(".search_bar button");
const weatherIcon = document.querySelector(".weather_icon");
const videoElement = document.querySelector(".background-video"); // Select the video element

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherCondition = data.weather[0].main;

        // Update weather icon and background video
        if (weatherCondition == 'Clouds') {
            weatherIcon.src = './images/clouds.svg';
            videoElement.src = 'https://videos.pexels.com/video-files/855785/855785-hd_1920_1080_24fps.mp4'; // Clouds video
        } else if (weatherCondition == 'Clear') {
            weatherIcon.src = './images/clear.svg';
            videoElement.src = 'https://videos.pexels.com/video-files/4460020/4460020-hd_1920_1080_30fps.mp4'; // Clear weather video
        } else if (weatherCondition == 'Drizzle') {
            weatherIcon.src = './images/drizzle.svg';
            videoElement.src = 'https://videos.pexels.com/video-files/6527135/6527135-hd_1920_1080_25fps.mp4'; // Drizzle video
        } else if (weatherCondition == 'Rain') {
            weatherIcon.src = './images/rain.svg';
            videoElement.src = 'https://videos.pexels.com/video-files/4323285/4323285-hd_1920_1080_30fps.mp4'; // Rain video
        } else if (weatherCondition == 'Snow') {
            weatherIcon.src = './images/snow.svg';
            videoElement.src = 'https://videos.pexels.com/video-files/857032/857032-hd_1920_1080_30fps.mp4'; // Snow video
        } else {
            // Default weather condition
            weatherIcon.src = './images/default.svg';
            videoElement.src = './videos/default.mp4'; // Default video
        }

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});
