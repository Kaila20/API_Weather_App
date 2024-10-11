
//API key: 2504edd9ee40d9b298b082a6c859b8b9

// Select necessary DOM elements
const container = document.querySelector('.Container');
const searchButton = document.querySelector('.Search-Box button');
const weatherBox = document.querySelector('.Wather-Box');
const weatherDetails = document.querySelector('.Weather-Information');
const error404 = document.querySelector('.Item-Not-Found');

// Event listener for the search button click
searchButton.addEventListener('click', () => {
    const APIKey = '2504edd9ee40d9b298b082a6c859b8b9'; // Insert OpenWeatherMap API key here
    const cityInput = document.querySelector('.Search-Box input').value; // Get city name from input field

    if (cityInput === '') return; // Exit if no city is entered

    // Fetch weather data from the API using the city name
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            // Handle invalid city input (404 error)
            if (data.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            // Remove error message if the city is found
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');


            // Update weather details based on the API response
            const weatherImage = document.querySelector('.Wather-Box img');
            const tempElement = document.querySelector('.Wather-Box .Temperature');
            const descriptionElement = document.querySelector('.Wather-Box .Description');
            const humidityElement = document.querySelector('.Weather-Information .humidity span');
            const windElement = document.querySelector('.Weather-Information .Wind span');


            // Set weather image based on condition
            const weatherCondition = data.weather[0].main;
            const weatherImages = {
                'Clear': 'Images/Clear_Sky.jpg',
                'Rain': 'Images/Rain_Sky.jpg',
                'Snow': 'Images/Snow_Sky.jpg',
                'Clouds': 'Images/Cloud_Sky.jpg',
                'Foggy': 'Images/Foggy_Sky.jpg'
            };
            weatherImage.src = weatherImages[weatherCondition] || ''; // Updates the src attribute of the selected image element based on the weatherCondition. Default to empty if condition not found


            // Set temperature, description, humidity, and wind details
            tempElement.innerHTML = `${Math.round(data.main.temp)}°C`; //Update tem element from the temp value from api (data.main.temp). Rounds too nearest whole. Make C Celsius
            descriptionElement.innerHTML = `${data.weather[0].description}`; //Set the weather description (ex: clesr sky) from API data
            humidityElement.innerHTML = `${data.main.humidity}%`; //Displays humidity percentage from the API
            windElement.innerHTML = `${Math.round(data.wind.speed)} Km/h`; //Displays wind speed, rounds said speed (data.wind-speed) to nearest integer. km/h for kilometers per hours


            // Show weather box and details with fade-in animation
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px'; // Adjust container height based on content
        })
        
        .catch(err => console.error('Error fetching weather data:', err)); // Handle potential errors if issue with API
});
