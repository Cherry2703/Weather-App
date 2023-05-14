

let searchInputEl = document.getElementById("searchInput")
let timerEl = document.getElementById("time")
let dateEl = document.getElementById("date")
let searchInputDisplayValueEl = document.getElementById("searchInputValue")

const api_key = "0fb85b2c43fc5413773e913231864dc0"

const weather_pressure_El = document.getElementById("weather_pressure")
const windEl = document.getElementById("wind_speed")
const humidity = document.getElementById("humidity")
const realfeellike = document.getElementById("realfeellike")
const minimum_temp = document.getElementById("minimum_temp")
const maximum_temp = document.getElementById("maximum_temp")
const weather_condition = document.getElementById("weather_condition")
const weather_temparature = document.getElementById("weather_temparature")
const weather_icons = document.getElementById("weather_icons")


let currentPlace = "Hyderabad"
let units = "metric"

const days = ["Sunday", "MOnday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function locationData(data) {
    weather_pressure_El.textContent = data.main.pressure
    windEl.textContent = data.wind.speed
    humidity.textContent = data.main.humidity
    realfeellike.textContent = data.main.feels_like
    minimum_temp.textContent = data.main.temp_min
    maximum_temp.textContent = data.main.temp_max
    searchInputDisplayValueEl.textContent = data.name
    weather_condition.textContent = data.weather[0].description
    weather_temparature.textContent = data.main.temp

    let image = document.createElement("img");
    image.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
    weather_icons.appendChild(image)

    setInterval(() => {
        const time = new Date();
        const year = time.getYear()
        const month = time.getMonth();
        const date = time.getDate();
        const day = time.getDay();
        const hour = time.getHours();
        const hoursInTwelveHourFormat = hour >= 13 ? hour % 12 : hour
        const minutes = time.getMinutes();
        const ampm = hour >= 12 ? "PM" : "AM"

        timerEl.innerHTML = hoursInTwelveHourFormat + ":" + minutes + `<span class="am-pm" id="am-pm">${ampm}</span>`

        dateEl.innerHTML = days[day] + ", " + date + " " + months[month]
    }, 1000)
}

function getWeather(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        let currentPlace = searchInputEl.value
        console.log(currentPlace)
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentPlace}&appid=${api_key}&units=${units}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                locationData(data)
            })
    }
}

function liveLocation() {
    navigator.geolocation.getCurrentPosition((sucess) => {
        console.log(sucess)
        let {
            latitude,
            longitude
        } = sucess.coords;
        let city = "Hyderabad"
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=${units}`).then(res => res.json()).then(data => {
            console.log(data)
            locationData(data)
        })
    })
}
liveLocation()
searchInputEl.addEventListener("keydown", getWeather)